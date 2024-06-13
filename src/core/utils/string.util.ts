/**
 * Capitalize a string
 * @param { string } str string to capitalize
 * @return { string } capitalized string
 * @example
 *  const name = capitalize('amgad');
 *    name => 'Amgad'
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
