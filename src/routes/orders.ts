import express from 'express'
import { authUser } from '../auth'
import { getCurrentOrderByUserId } from '../utils/orders'

export const ordersApi = express.Router()

ordersApi.get('/:id', authUser, getCurrentOrderByUserId)
