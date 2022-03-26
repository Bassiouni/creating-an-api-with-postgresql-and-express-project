import { Request, Response } from 'express'
import { OrderStore } from '../../models/orders'

export async function getCurrentOrderByUserId(req: Request, res: Response) {
  const user_id = parseInt(req.params.user_id)

  const data = await OrderStore.show(user_id)

  res.status(200).json(data)
}
