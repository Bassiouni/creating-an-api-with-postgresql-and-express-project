import express from 'express'

export const productsApi = express.Router()

productsApi.get('/')
productsApi.get('/:id')
productsApi.post('/' /*, auth, fn*/)
