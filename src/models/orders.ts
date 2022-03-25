import client from '../database'

export type Order = {
  id?: number
  quantity: number
  user_id: number
  product_id: number
}

export class OrderStore {
  static async index(): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  static async show(id: number): Promise<Order> {
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

  // static async create(p: Order): Promise<Order> {
  //   try {
  //     const sql =
  //       'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
  //     const conn = await client.connect()

  //     const result = await conn.query(sql, [p.name, p.price])

  //     const product = result.rows[0]

  //     conn.release()

  //     return product
  //   } catch (err) {
  //     throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
  //   }
  // }
}
