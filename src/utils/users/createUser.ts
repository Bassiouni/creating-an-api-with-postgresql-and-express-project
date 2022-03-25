import { Request, Response } from 'express'
import { UserStore } from '../../models/users'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const {
  SALT_ROUNDS: saltRounds,
  BCRYPT_PASSWORD: pepper,
  TOKEN_SECRET,
} = process.env

export async function createUser(req: Request, res: Response) {
  const { firstName, lastName, password: pwd } = req.body
  const salt = await bcrypt.genSalt(parseInt(saltRounds as string))
  const password = await bcrypt.hash(pwd + pepper, salt)
  const createdUser = await UserStore.create({ firstName, lastName, password })

  const data = jwt.sign(createdUser, TOKEN_SECRET as string)
  res.status(200).json(data)
}
