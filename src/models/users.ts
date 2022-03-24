import client from '../database'

export type User = {
  id: number
  firstName: string
  lastName: string
  password: string
}

export class UserStore {
  static async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  static async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  static async create(b: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *'
      const conn = await client.connect()

      const result = await conn.query(sql, [])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not add new product ${b.name}. Error: ${err}`)
    }
  }

  static async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM product WHERE id=($1)'
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`)
    }
  }
}
