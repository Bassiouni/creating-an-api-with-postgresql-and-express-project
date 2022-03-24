// import { Response } from 'superagent'
// import supertest from 'supertest'

// import app from '../index'

// const request = supertest(app)

// let response: Response

import { ProductStore } from '../models/products'

describe('Book Model', () => {
  it('should have an index method', () => {
    expect(ProductStore.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(ProductStore.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(ProductStore.create).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(ProductStore.delete).toBeDefined()
  })

  it('create method should add a book', async () => {
    const result = await ProductStore.create({
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
    })

    expect(result).toEqual({
      id: '1',
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
    })
  })

  it('index method should return a list of books', async () => {
    const result = await ProductStore.index()
    expect(result).toEqual([
      {
        id: '1',
        title: 'Bridge to Terabithia',
        total_pages: 250,
        author: 'Katherine Paterson',
        type: 'Childrens',
      },
    ])
  })

  it('show method should return the correct book', async () => {
    const result = await ProductStore.show('1')
    expect(result).toEqual({
      id: '1',
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
    })
  })

  it('delete method should remove the book', async () => {
    ProductStore.delete('1')
    const result = await ProductStore.index()

    expect(result).toEqual([])
  })
})
