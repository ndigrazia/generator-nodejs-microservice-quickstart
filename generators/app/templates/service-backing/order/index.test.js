const { getAllOrders } = require('./repository')

test('GET All Orders 200', async () => {
  const orders = await getAllOrders()

  expect(Array.isArray(orders)).toBe(true)
  expect(orders.length).toBeGreaterThan(0)
  expect(typeof orders[0]).toBe('object')
  expect(typeof orders[0].orderId).toBe('number')
  expect(typeof orders[0].orderDate).toBe('string')
  expect(typeof orders[0].orderStatus).toBe('string')
  expect(typeof orders[0].products).toBe('object')
})
