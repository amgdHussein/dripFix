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
export class Profile {
  /**
   * Creates an instance of User Profile.
   *
   * @param {string} id - The unique identifier of the profile.
   * @param {string} userId - The unique identifier of the user associated with the profile.
   * @param {string | null} bio - The biography of the user associated with the profile, or null if not available.
   * @param {string | null} avatar - The URL of the profile photo of the user associated with the profile, or null if not available.
   * @param {Date} createdAt - The date and time when the profile was created.
   * @param {Date} updatedAt - The date and time when the profile was last updated.
   */
  constructor(
    public id: string,
    public userId: string,
    public bio: string | null,
    public avatar: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
