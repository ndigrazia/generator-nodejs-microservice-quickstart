const request = require('supertest')
const express = require('../../util/express')
const { apiRoot, apiRootTestEnv } = require('../../config')
const properties = require('../../package.json')
const routes = require('.')

const app = () => express(apiRoot, routes)

test('GET /about 200', async () => {
  const { status, body } = await request(app())
    .get(apiRootTestEnv)
    .query({})

  expect(status).toBe(200)
  expect(body).toBeDefined()
  expect(typeof body).toBe('object')
  expect(body.name).toBe(properties.name)
  expect(body.description).toBe(properties.description)
  expect(body.author.name).toBe(properties.author.name)
  expect(body.author.email).toBe(properties.author.email)
})
