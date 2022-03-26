import { OrderStore } from '../models/orders'

export function OrderSpec() {
  describe('Order Model', () => {
    it('should have a show method', () => {
      expect(OrderStore.show).toBeDefined()
    })

    it('should have a create method', () => {
      expect(OrderStore.create).toBeDefined()
    })

    it('create method should add an order', async () => {
      const result = await OrderStore.create({
        product_id: 1,
        quantity: 2,
        user_id: 1,
      })

      expect(result).toEqual({
        id: 1,
        product_id: 1,
        quantity: 2,
        user_id: 1,
      })
    })

    it('show method should return the correct order', async () => {
      const result = await OrderStore.show(1)
      expect(result).toEqual([
        {
          id: 1,
          product_id: 1,
          quantity: 2,
          user_id: 1,
        },
      ])
    })
  })
}
