/**
 * User profile entity.
 */
export class Profile {
  /**
   * Creates an instance of User Profile.
   *
   * @param {string} id - The unique identifier of the profile.
   * @param {string} userId - The unique identifier of the user associated with the profile.
   * @param {string | null} bio - The biography of the user associated with the profile, or null if not available.
   * @param {string | null} photoUrl - The URL of the profile photo of the user associated with the profile, or null if not available.
   */
  constructor(
    public id: string,
    public userId: string,
    public bio: string | null,
    public photoUrl: string | null,
  ) {}
}
