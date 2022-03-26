import client from '../database'

export type Order = {
  id?: number
  quantity: number
  user_id: number
  product_id: number
}

export class OrderStore {
  static async show(userId: number): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1)'
      const conn = await client.connect()

      const result = await conn.query(sql, [userId])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not find order ${userId}. Error: ${err}`)
    }
  }

  static async create(o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (quantity, user_id, product_id) VALUES($1, $2, $3) RETURNING *'
      const conn = await client.connect()

      const result = await conn.query(sql, [
        o.quantity,
        o.user_id,
        o.product_id,
      ])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add new product ${o}. Error: ${err}`)
    }
  }
}
