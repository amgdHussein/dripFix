/**
 * Represents a user address entity.
 *
 * @param {string} city - City/District/Suburb/Town/Village.
 * @param {string} country - The 2-letter country code.
 * @param {string} line1 - Address line 1 (Street address/PO Box/Company name).
 * @param {string | null} line2 - Address line 2 (Apartment/Suite/Unit/Building) (optional).
 * @param {string | null} postalCode - The zip/postal code of the address (optional).
 * @param {string} state - The State/County/Province/Region of the address.
 */
export interface Address {
  city: string;
  country: string;
  line1: string;
  line2: string | null;
  postalCode: string | null;
  state: string;
}
