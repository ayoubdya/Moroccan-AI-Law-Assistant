declare module 'bcrypt' {
  /**
   * Generate a hash for the plain text password
   * @param {string} password - The plain text password to hash
   * @param {number} saltRounds - The number of rounds to use when generating a salt
   * @returns {Promise<string>} - The hashed password
   */
  export function hash(password: string, saltRounds: number): Promise<string>;

  /**
   * Compare a plain text password with a hash
   * @param {string} password - The plain text password to compare
   * @param {string} hash - The hash to compare against
   * @returns {Promise<boolean>} - Whether the password matches the hash
   */
  export function compare(password: string, hash: string): Promise<boolean>;

  /**
   * Generate a salt
   * @param {number} rounds - The number of rounds to use (default: 10)
   * @returns {Promise<string>} - The generated salt
   */
  export function genSalt(rounds?: number): Promise<string>;
}
