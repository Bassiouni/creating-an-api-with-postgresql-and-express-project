import express from 'express'
import { authUser } from '../auth'
import { createOrder, getCurrentOrderByUserId } from '../utils/orders'

export const ordersApi = express.Router()

ordersApi.get('/:user_id', authUser, getCurrentOrderByUserId)
ordersApi.post('/', authUser, createOrder)
