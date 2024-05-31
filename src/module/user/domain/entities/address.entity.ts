/**
 * User address entity.
 */
export class Address {
  /**
   * Creates a new instance of the Address.
   *
   * @param {string} city - City/District/Suburb/Town/Village.
   * @param {string} country - The 2-letter country code.
   * @param {string} line1 - Address line 1 (Street address/PO Box/Company name).
   * @param {string | null} line2 - Address line 2 (Apartment/Suite/Unit/Building) (optional).
   * @param {string | null} postalCode - The zip/postal code of the address (optional).
   * @param {string} state - The State/County/Province/Region of the address.
   */
  constructor(
    public city: string,
    public country: string,
    public line1: string,
    public line2: string | null,
    public postalCode: string | null,
    public state: string,
  ) {}
}
