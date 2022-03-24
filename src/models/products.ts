import client from '../database'

export type Product = {
  id: number
  name: string
  price: number
}

export class ProductStore {
  static async index(): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  static async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  static async create(b: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *'
      const conn = await client.connect()

      const result = await conn.query(sql, [])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not add new product ${b.name}. Error: ${err}`)
    }
  }

  static async delete(id: string): Promise<Product> {
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
