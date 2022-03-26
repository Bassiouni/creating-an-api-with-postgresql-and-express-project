import { Request, Response } from 'express'
import { OrderStore } from '../../models/orders'
import jwt from 'jsonwebtoken'
import { User } from '../../models/users'
import * as dotenv from 'dotenv'

dotenv.config()

export async function createOrder(req: Request, res: Response) {
  const { quantity, product_id, token } = req.body
  try {
    const { id: user_id } = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as User

    const data = await OrderStore.create({
      product_id: parseInt(product_id),
      quantity: parseInt(quantity),
      user_id: user_id as number,
    })

    res.status(200).json(data)
  } catch {
    res
      .status(400)
      .send('please provide a proper order JSON object to create an order')
  }
}
