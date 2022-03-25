import { Request, Response } from 'express'
import { ProductStore } from '../../models/products'

export async function createProduct(req: Request, res: Response) {
  const name = req.body.name
  const price = parseInt(req.body.price)

  const data = await ProductStore.create({ name, price })

  res.status(200).json(data)
}
