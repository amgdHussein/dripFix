/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@nestjs/common';
import { CollectionReference, DocumentSnapshot, Query, WithFieldValue } from '@google-cloud/firestore';

import { ObjectUtils } from '../../utils';
import { InternalServerErrorException, NotFoundException } from '../../exceptions';

import { QueryFilter, QueryOrder, QueryResponse } from './entities';

const MAX_QUERY_LIMIT: number = 100;

@Injectable()
export class FirestoreCollectionService<T extends { id: string }> {
  // Convert collection name into capitalized singular name (ex. users => user)
  private collectionName: string = this.collection.id.slice(0, -1);

  private readonly firestoreConverter = {
    /**
     * Drop id and undefined fields if exists
     * Convert object notation to dot notation
     * @param {T} entity Entity to set/ update
     * @return {T} The data provided to firestore
     */
    toFirestore(entity: T): WithFieldValue<T> {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...entityWithoutId } = entity;

      return ObjectUtils.dropUndefined(entityWithoutId);
    },

    /**
     * Converts a Firestore document snapshot to a custom type.
     * @param {DocumentSnapshot<T>} doc - The Firestore document snapshot to convert
     * @return {T} The converted custom type
     */
    fromFirestore(doc: DocumentSnapshot<T>): T {
      const data = doc.data() as T;
      return { ...data, id: doc.id };
    },
  };

  constructor(private readonly collection: CollectionReference<T>) {}

  /**
   * Retrieves a document with the specified id from the collection.
   * @param {string} id - The id of the document to retrieve
   * @return {Promise<T>} The retrieved document
   */
  public async getDoc(id: string): Promise<T> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`The ${this.collectionName} with specified id(${id}) does not exist!`);
    }

    return this.firestoreConverter.fromFirestore(doc);
  }

  /**
   * A description of the entire function.
   * @return {Promise<T[]>} description of return value
   */
  public async getDocs(): Promise<T[]> {
    return await this.collection
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => this.firestoreConverter.fromFirestore(doc));
      })
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
    const docRef = this.collection.doc();

    return await docRef
      .set(this.firestoreConverter.toFirestore(entity))
      .then(async () => await this.getDoc(docRef.id))
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
    const docRef = this.collection.doc(entity.id);

    return await docRef
      .set(this.firestoreConverter.toFirestore(entity))
      .then(async () => await this.getDoc(docRef.id))
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

    const docRef = this.collection.doc(entity.id);
    return await docRef
      .update(this.firestoreConverter.toFirestore(flatEntity))
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
    const entity: T = await this.getDoc(id); // throw error if the id not exist

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
    limit = Math.min(limit, MAX_QUERY_LIMIT);

    const query: Query<T> = this.initiateQueries(filters);
    const data: T[] = await this.getQueries(page, limit, query, orderBy);
    const entities: number = (await query.count().get()).data().count;

    return {
      data: data, // items
      page: page, // current page
      pages: Math.ceil(entities / limit), // number of pages
      per_page: limit, // number of items per page
      total: entities, // total number of items exists
    };
  }

  /**
   * Executes the query and returns the results as a list of entities.
   * @param {number} page Pagination to prevent data overload
   * @param {number} limit Number of entities per page
   * @param {Query} query Firestore query object used to fetch documents
   * @param {QueryOrder} orderBy Order object that contains {field, direction} to sort by field in specified direction
   * @return {Array<T>} The query documents data
   */
  private async getQueries(page: number, limit: number, query: Query<T>, orderBy?: QueryOrder): Promise<T[]> {
    if (orderBy) query = query.orderBy(orderBy.field, orderBy.direction);

    query = query.offset(limit * (page - 1));
    query = query.limit(limit);

    return await query
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => this.firestoreConverter.fromFirestore(doc));
      })
      .catch(error => {
        console.log('🚀 ~ getQueries ~ error:', error);
        throw new InternalServerErrorException('An error occurred while querying data!');
      });
  }

  /**
   * Create queries by applying filters
   * @param {Array<QueryFilter>} filters List of filters to be applied
   * @return {Query<T>} Query object that meets filters
   */
  private initiateQueries(filters?: QueryFilter[]): Query<T> {
    let query: Query<T> = this.collection;

    if (filters && filters.length > 0) {
      for (const filter of filters) {
        query = query.where(filter.field, filter.operator, filter.value);
      }
    }

    return query;
  }
}
