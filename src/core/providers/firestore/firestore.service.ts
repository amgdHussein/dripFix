import { Injectable } from '@nestjs/common';

import {
  CollectionReference,
  Query,
  QueryDocumentSnapshot,
  FieldValue,
  FirestoreDataConverter,
  WithFieldValue,
  PartialWithFieldValue,
} from '@google-cloud/firestore';

import { ObjectUtils } from '../../utils';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '../../exceptions';

import { QueryFilter, QueryOrder, QueryResponse } from './entities';

@Injectable()
export class FirestoreService<T extends { id: string }> {
  // Convert collection name into capitalized singular name (ex. users => user)
  private readonly collectionName: string = this.collection.id.slice(0, -1);

  private readonly firestoreConverter: FirestoreDataConverter<T> = {
    /**
     * Drop id and undefined fields if exists
     * @param {WithFieldValue<T>} entity Entity to set/ update
     * @return {T} The data provided to firestore
     */
    toFirestore(entity: WithFieldValue<T>): PartialWithFieldValue<T> {
      delete entity.id;
      return ObjectUtils.dropUndefined(entity);
    },

    /**
     * Converts a Firestore document snapshot to a custom type.
     * @param {QueryDocumentSnapshot<T>} snapshot - The Firestore document snapshot to convert
     * @return {T & { id: string }} The converted custom type
     */
    fromFirestore(snapshot: QueryDocumentSnapshot<T>): T & { id: string } {
      const data = snapshot.data();
      return { ...data, id: snapshot.id };
    },
  };

  constructor(private readonly collection: CollectionReference<T>) {}

  /**
   * Retrieves a document with the specified id from the collection.
   * @param {string} id - The id of the document to retrieve
   * @return {Promise<T>} The retrieved document
   */
  public async getDoc(id: string): Promise<T> {
    const docRef = this.collection.doc(id).withConverter<T>(this.firestoreConverter);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`The ${this.collectionName} with specified id(${id}) does not exist!`);
    }

    return doc.data();
  }

  /**
   * A description of the entire function.
   * @return {Promise<T[]>} description of return value
   */
  public async getDocs(): Promise<T[]> {
    const query = this.collection.withConverter<T>(this.firestoreConverter);
    return await query
      .get()
      .then(snapshot => snapshot.docs.map(doc => doc.data()))
      .catch(error => {
        console.log('🚀 ~ getDocs ~ error:', error);
        throw new InternalServerErrorException('Something went wrong while fetching the documents!');
      });
  }

  /**
   * Adds a new document to the collection.
   * @param {T} entity - the entity to be added
   * @return {Promise<T>} a promise that resolves with the added entity
   */
  public async addDoc(entity: T): Promise<T> {
    const docRef = this.collection.doc().withConverter<T>(this.firestoreConverter);

    return await docRef
      .set(entity)
      .then(() => ({ ...entity, id: docRef.id }))
      .catch(error => {
        console.log('🚀 ~ addDoc ~ error:', error);
        throw new InternalServerErrorException(`An error occurred while adding new ${this.collectionName} document!`);
      });
  }

  /**
   * Add a new document to specified CollectionReference with the given data, assigning it a document ID automatically.
   * @param {T} entity Document data to be added (Id not required)
   * @return {Promise<T>} The new document data
   */
  public async setDoc(entity: T): Promise<T> {
    const docRef = this.collection.doc(entity.id).withConverter<T>(this.firestoreConverter);

    return await docRef
      .set(entity)
      .then(() => entity)
      .catch(error => {
        console.log('🚀 ~ setDoc ~ error:', error);
        throw new InternalServerErrorException(`An error occurred while replacing ${this.collectionName} document!`);
      });
  }

  /**
   * Updates fields in the document referred to by the specified DocumentReference.
   * The update will fail if applied to a document that does not exist.
   * @param {T} entity Document data to be updated (Id must be specified)
   * @return {Promise<T>} The updated document data
   */
  public async updateDoc(entity: Partial<T> & { id: string }): Promise<T> {
    const flatEntity = ObjectUtils.flatten(entity);

    const docRef = this.collection.doc(entity.id).withConverter<T>(this.firestoreConverter);
    return await docRef
      .update(flatEntity)
      .then(async () => await this.getDoc(docRef.id))
      .catch(error => {
        console.log('🚀 ~ updateDoc ~ error:', error);
        throw new InternalServerErrorException(`An error occurred while updating ${this.collectionName} document!`);
      });
  }

  /**
   * Deletes the document referred to by the specified DocumentReference.
   * @param {string} id The ID of the document to be deleted
   * @return {Promise<T>} The deleted document data
   */
  public async deleteDoc(id: string): Promise<T> {
    const entity = await this.getDoc(id); // Throw error if the id not exist

    const docRef = this.collection.doc(id);
    return await docRef
      .delete()
      .then(() => entity)
      .catch(error => {
        console.log('🚀 ~ deleteDoc ~ error:', error);
        throw new InternalServerErrorException(`An error occurred while deleting ${this.collectionName} document!`);
      });
  }

  /**
   * Executes the query and returns the results as a QuerySnapshot.
   * @param {number} page Pagination to prevent data overload
   * @param {number} limit Number of entities per page
   * @param {Array<QueryFilter>} filters - List of QueryFilter each filter has its own {field, operator, value}
   * @param {QueryOrder} orderBy - Order object that contains {field, direction} to sort by field in specified direction
   * @return {Promise<QueryResponse<T>>} The query documents data and meta data
   */
  public async query(page: number = 1, limit: number = 30, filters?: QueryFilter[], orderBy?: QueryOrder): Promise<QueryResponse<T>> {
    let queries: Query<T> = this.buildQuery(filters).withConverter<T>(this.firestoreConverter);

    if (orderBy) queries = queries.orderBy(orderBy.field, orderBy.direction);
    if (page > 0 && limit > 0) queries = queries.offset(limit * (page - 1));
    if (limit > 0) queries = queries.limit(limit);

    const data: T[] = await queries
      .get()
      .then(snapshot => snapshot.docs.map(doc => doc.data()))
      .catch(error => {
        console.log('🚀 ~ getQueries ~ error:', error);
        throw new InternalServerErrorException('An error occurred while querying data!');
      });

    const entities: number = (await queries.count().get()).data().count;

    return {
      data: data, // items
      page: page, // current page
      pages: Math.ceil(entities / limit), // number of pages
      per_page: limit, // number of items per page
      total: entities, // total number of items exists
    };
  }

  /**
   * Create queries by applying filters
   * @param {Array<QueryFilter>} filters List of filters to be applied
   * @return {Query<T>} Query object that meets filters
   */
  private buildQuery(filters?: QueryFilter[]): Query<T> {
    let query: Query<T> = this.collection;

    if (filters && filters.length > 0) {
      for (const filter of filters) {
        query = query.where(filter.field, filter.operator, filter.value);
      }
    }

    return query;
  }

  /**
   * Increment a specific field of a document by a certain value.
   * @param {string} id - The ID of the document to be updated
   * @param {string} field - The name of the field to be incremented
   * @param {number} incrementValue - The value by which the field should be incremented
   * @return {Promise<T>} A promise that resolves to the updated document
   */
  public async incrementField(id: string, field: string, incrementValue: number): Promise<T> {
    const docRef = this.collection.doc(id);

    const entity: T = await this.getDoc(id); // Throw error if the id not exist

    if (!entity[field]) {
      throw new BadRequestException(`Field ${field} does not exist!`);
    }

    if (incrementValue <= 0) {
      throw new BadRequestException('Increment value must be greater than 0!');
    }

    return await docRef
      .update(field, FieldValue.increment(incrementValue))
      .then(() => {
        return { ...entity, [field]: entity[field] + incrementValue };
      })
      .catch(error => {
        console.log('🚀 ~ incrementField ~ error:', error);
        throw new InternalServerErrorException(`An error occurred while incrementing ${field}!`);
      });
  }

  /**
   * A function that creates a nested Firestore collection service based on the given path.
   * @param {string} path - the path of the nested collection
   * @return {FirestoreService<T & { id: string }>} a Firestore collection service for the nested collection
   */
  public nestedCollection<T>(path: string): FirestoreService<T & { id: string }> {
    const parts = path.split('/');

    if (parts.length === 0 || parts.length % 2 !== 0) {
      throw new BadRequestException('Invalid path!');
    }

    const docPath: string = parts.shift() as string;
    const collectionPath: string = parts.join('/');

    const docRef = this.collection.doc(docPath);
    const collection = docRef.collection(collectionPath) as CollectionReference<T & { id: string }>;

    return new FirestoreService<T & { id: string }>(collection);
  }
}
