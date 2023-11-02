const request = require('supertest')
const express = require('../../util/express')
const { apiRoot, apiRootTestEnv } = require('../../config')
const routes = require('.')

const app = () => express(apiRoot, routes)

let userId // Declare a variable to store the user ID.

test('POST /users 201', async () => {
  const userData = {
    firstName: 'John Michael',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    delivery: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    role: 'Employee'
  }

  const { status, body } = await request(app())
    .post(apiRootTestEnv)
    .send(userData)

  expect(status).toBe(201)
  expect(typeof body).toBe('object')

  expect(body.firstName).toBe(userData.firstName)
  expect(body.lastName).toBe(userData.lastName)
  expect(body.email).toBe(userData.email)
  expect(body.role).toBe(userData.role)

  expect(body.address.street).toBe(userData.address.street)
  expect(body.address.city).toBe(userData.address.city)
  expect(body.address.zipCode).toBe(userData.address.zipCode)
  expect(body.address.state).toBe(userData.address.state)
  expect(body.address.country).toBe(userData.address.country)

  expect(body.delivery.street).toBe(userData.delivery.street)
  expect(body.delivery.city).toBe(userData.delivery.city)
  expect(body.delivery.zipCode).toBe(userData.delivery.zipCode)
  expect(body.delivery.state).toBe(userData.delivery.state)
  expect(body.delivery.country).toBe(userData.delivery.country)

  userId = body.id // Store the user ID for later use.
})

test('PUT /users/:id 200', async () => {
  const updatedUserData = {
    email: 'updated-email@d.com',
    address: {
      street: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'United States'
    },
    role: 'Support'
  }

  const { status, body } = await request(app())
    .put(`${apiRootTestEnv}/${userId}`)
    .send(updatedUserData)

  expect(status).toBe(200)
  expect(typeof body).toBe('object')

  expect(body.email).toBe(updatedUserData.email)
  expect(body.role).toBe(updatedUserData.role)

  expect(body.address.street).toBe(updatedUserData.address.street)
  expect(body.address.city).toBe(updatedUserData.address.city)
  expect(body.address.zipCode).toBe(updatedUserData.address.zipCode)
  expect(body.address.state).toBe(updatedUserData.address.state)
  expect(body.address.country).toBe(updatedUserData.address.country)
})

test('PUT /users/:id 200 - change delivery address', async () => {
  const updatedUserData = {
    delivery: {
      street: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'United States'
    }
  }

  const { status, body } = await request(app())
    .put(`${apiRootTestEnv}/${userId}`)
    .send(updatedUserData)

  expect(status).toBe(200)
  expect(typeof body).toBe('object')

  expect(body.delivery.street).toBe(updatedUserData.delivery.street)
  expect(body.delivery.city).toBe(updatedUserData.delivery.city)
  expect(body.delivery.zipCode).toBe(updatedUserData.delivery.zipCode)
  expect(body.delivery.state).toBe(updatedUserData.delivery.state)
  expect(body.delivery.country).toBe(updatedUserData.delivery.country)
})

test('GET /users 200', async () => {
  const { status, body } = await request(app())
    .get(apiRootTestEnv)
    .query({})

  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)

  expect(body.length).toBeGreaterThan(0)
  expect(typeof body[0]).toBe('object')
  expect(typeof body[0].id).toBe('string')
  expect(typeof body[0].firstName).toBe('string')
  expect(typeof body[0].lastName).toBe('string')
  expect(typeof body[0].email).toBe('string')
  expect(typeof body[0].address).toBe('object')
  expect(typeof body[0].role).toBe('string')
})

test('GET /users?firstName=Michael 200', async () => {
  const { status, body } = await request(app())
    .get(apiRootTestEnv)
    .query({ firstName: 'Michael' })

  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(body.length).toBeGreaterThan(0)
  expect(typeof body[0]).toBe('object')
  expect(typeof body[0].id).toBe('string')
  expect(typeof body[0].firstName).toBe('string')
  expect(typeof body[0].lastName).toBe('string')
  expect(typeof body[0].email).toBe('string')
  expect(typeof body[0].address).toBe('object')
  expect(typeof body[0].role).toBe('string')
  expect(body[0].firstName).toBe('John Michael')
})

test('GET /users/:id/orders 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRootTestEnv}/${userId}/orders`)
    .query({})

  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(typeof body.id).toBe('string')
  expect(typeof body.firstName).toBe('string')
  expect(typeof body.lastName).toBe('string')
  expect(body.firstName).toBe('John Michael')

  const orders = body.orders
  expect(Array.isArray(orders)).toBe(true)
  expect(orders.length).toBeGreaterThan(0)
  expect(typeof orders[0]).toBe('object')
  expect(typeof orders[0].orderId).toBe('number')
  expect(typeof orders[0].orderDate).toBe('string')
  expect(typeof orders[0].orderStatus).toBe('string')
  expect(typeof orders[0].products).toBe('object')
})

test('GET /users?firstName=Alice 200', async () => {
  const { status, body } = await request(app())
    .get(apiRootTestEnv)
    .query({ firstName: 'Alice' })

  expect(status).toBe(200)

  expect(Array.isArray(body)).toBe(true)
  expect(body.length).toBe(0)
})

test('DELETE /users/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRootTestEnv}/${userId}`)
    .send({})

  expect(status).toBe(204)
})
