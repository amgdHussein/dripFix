import { Role } from '../../../../core/constants';

/**
 * Represents a user entity.
 *
 * @member {string} id - The unique identifier of the user.
 * @member {string} name - The name of the user.
 * @member {string} email - The email address of the user.
 * @member {boolean} active - Indicates whether the user is active or not.
 * @member {Role} role - The role of the user.
 * @member {Date} createdAt - The date and time when the user was created.
 * @member {Date} updatedAt - The date and time when the user was last updated, or 'createdAt' if never updated.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
