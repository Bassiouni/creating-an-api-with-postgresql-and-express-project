import { Request, Response } from 'express'
import { UserStore, User } from '../models/users'
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export async function authUser(req: Request, res: Response, next: () => void) {
  const token = req.body.token
  try {
    const { id, firstName, lastName, password } = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as User

    const user = await UserStore.show(id as number)

    if (
      user.id === id &&
      user.firstName === firstName &&
      user.lastName === lastName &&
      user.password === password
    ) {
      next()
    } else {
      res.status(401).json('Access denied, invalid token')
    }
  } catch (error) {
    res.status(401).json('Access denied, invalid token')
    return new Error(`${error}`)
  }
}
