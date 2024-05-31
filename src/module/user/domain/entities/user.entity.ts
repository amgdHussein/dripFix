import { Role } from '../../../../core/constants';

/**
 * Represents a user entity.
 */
export class User {
  /**
   * Creates an instance of User.
   *
   * @param {string} id - The unique identifier of the user.
   * @param {string} name - The name of the user.
   * @param {string} email - The email address of the user.
   * @param {boolean} active - Indicates whether the user is active or not.
   * @param {Role} role - The role of the user.
   * @param {Date} createdAt - The date and time when the user was created.
   * @param {Date | null} updatedAt - The date and time when the user was last updated, or null if never updated.
   */
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public active: boolean,
    public role: Role,
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}
}
