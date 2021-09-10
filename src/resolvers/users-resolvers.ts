import { database } from '../server';
import { User, UserIdRequest } from '../model/user-model';

export class UserResolver {
  static async getUsers() {
    const sql = `
      SELECT * FROM users;
    `;
    const params = [];
    try {
      const result = await database.query(sql, params);
      if (result !== null && result.rowCount !== 0) {
        return result.rows;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async getUser(request: UserIdRequest) {
    const { id } = request;
    const sql = `
      SELECT * FROM users WHERE id = $1;
  `;
    const params = [id];
    try {
      const result = await database.query(sql, params);
      if (result !== null && result.rowCount !== 0) {
        return result.rows[0];
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async createUser(request: User) {
    const { username, email } = request;
    const sql = `
      INSERT INTO users (username, email)
      VALUES ($1, $2);
  `;
    const params = [username, email];
    try {
      const result = await database.query(sql, params);
      if (result !== null && result.rowCount !== 0) {
        return request;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async updateUser(request: User) {
    const { id, username, email } = request;
    const sql = `
      UPDATE users
      SET username = $1, email = $2
      WHERE id = $3;
  `;
    const params = [username, email, id];
    try {
      const result = await database.query(sql, params);
      if (result !== null && result.rowCount !== 0) {
        return request;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteUser(request: UserIdRequest) {
    const { id } = request;
    const sql = `
      DELETE FROM users WHERE id = $1;
    `;
    const params = [id];
    try {
      const result = await database.query(sql, params);
      if (result !== null && result.rowCount !== 0) {
        return request;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
