/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Flatten the object and convert the nested properties into dot notation keys.
 * @param { object } obj Object to convert it into dot notation keys
 * @return { object } The flatten object
 * @example
 *  const initialData = {
 *    name: 'Frank',
 *    age: 12,
 *    favorites: {
 *      food: 'Pizza',
 *      color: 'Blue',
 *      subject: 'recess'
 *    }
 *  };
 *
 *  const flattenedData = flattenObject(initialData);
 *    flattenedData => {
 *      name: 'Frank',
 *      age: 12,
 *      'favorites.food': 'Pizza',
 *      'favorites.color': 'Blue',
 *      'favorites.subject': 'recess'
 *    }
 */
export function flat(obj: any, parentKey = ''): any {
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flat(obj[key], prefixedKey));
    } else {
      acc[prefixedKey] = obj[key];
    }
    return acc;
  }, {});
}

/**
 * Drop the undefined fields from an object.
 * @param { object } obj Object to drop undefined sub-fields
 * @return { object } The valid object
 * @example
 *  const obj = {
 *    name: 'Frank',
 *    age: 12,
 *    favorites: {
 *      food: 'Pizza',
 *      colors: [undefined, 'Blue'],
 *      subject: undefined
 *    }
 *  };
 *
 *  const validObj = dropUndefined(obj);
 *    validObj => {
 *      name: 'Frank',
 *      age: 12,
 *      favorites: { food: 'Pizza', colors: [ 'Blue' ] }
 *    }
 */
export function dropUndefined(obj: any): any {
  if (obj === null || obj === undefined) {
    return undefined;
  }

  if (Array.isArray(obj)) {
    const newArray = obj.map(item => dropUndefined(item)).filter(item => item !== undefined);
    return newArray.length > 0 ? newArray : undefined;
  }

  if (typeof obj === 'object') {
    const targetObj: Record<string, any> = {};

    for (const key in obj) {
      const value = dropUndefined(obj[key]);
      if (value !== undefined) {
        targetObj[key] = value;
      }
    }

    return Object.keys(targetObj).length > 0 ? targetObj : undefined;
  }

  if (typeof obj === 'string' && obj.trim() === '') {
    return undefined;
  }

  return obj;
}
