/**
 * User phone entity.
 */
export class Phone {
  /**
   * Initializes a new instance of the `Phone` class with the specified country, code, and value.
   *
   * @param {string} country - The 2-letter country code.
   * @param {string} code - The phone code.
   * @param {string} value - The phone number value.
   */
  constructor(
    public country: string,
    public code: string,
    public value: string,
  ) {}
}
