// Infrastructure Layer

const { logger } = require('../../util/logger')

const ordersData = [
  {
    orderId: 1,
    orderDate: '2023-10-30',
    orderStatus: 'In Progress',
    products: ['Product A', 'Product B']
  },
  {
    orderId: 2,
    orderDate: '2023-10-29',
    orderStatus: 'Shipped',
    products: ['Product C', 'Product D']
  },
  {
    orderId: 3,
    orderDate: '2023-10-28',
    orderStatus: 'Delivered',
    products: ['Product A', 'Product E']
  },
  {
    orderId: 4,
    orderDate: '2023-10-27',
    orderStatus: 'Completed',
    products: ['Product F', 'Product G']
  }
]

// Logic to retrieve orders from the database by userId.
// Import Fetch or Axios library.
// Make a GET request using the fetch  or Axios API.
const getOrdersByUserId = (userId) => {
  logger.info('Retrieve orders by user: %s', userId)
  return getAllOrders()
}

const getAllOrders = () => {
  logger.info('Feching all orders!!!')
  return ordersData
}
module.exports = {
  getOrdersByUserId,
  getAllOrders
}
