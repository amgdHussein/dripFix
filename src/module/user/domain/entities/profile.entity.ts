/**
 * User profile entity.
 *
 * @member {string} id - The unique identifier of the profile.
 * @member {string} userId - The unique identifier of the user associated with the profile.
 * @member {string | null} bio - The biography of the user associated with the profile, or null if not available.
 * @member {string | null} avatar - The URL of the profile photo of the user associated with the profile, or null if not available.
 * @member {Date} createdAt - The date and time when the profile was created.
 * @member {Date} updatedAt - The date and time when the profile was last updated.
 */
export interface Profile {
  id: string;
  userId: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}
