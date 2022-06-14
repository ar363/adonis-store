/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.resource('products', 'ProductsController')

Route.post('login', async ({ auth, request, response }) => {
  if (auth.isLoggedIn) {
    return response.unauthorized({ err: "Already logged in" })
  }

  const loginSchema = schema.create({
    email: schema.string([rules.email()]),
    password: schema.string()
  })

  const { email, password } = await request.validate({ schema: loginSchema })

  try {
    const token = await auth.use('api').attempt(email, password)
    return token
  } catch {
    return response.badRequest({ err: 'Invalid credentials' })
  }
})

Route.post('signup', async ({ auth, request, response }) => {
  if (auth.isLoggedIn) {
    return response.unauthorized({ err: "Already logged in" })
  }

  const signupSchema = schema.create({
    name: schema.string([rules.maxLength(150)]),
    email: schema.string([rules.email()]),
    password: schema.string()
  })

  const { name, email, password } = await request.validate({ schema: signupSchema })

  const newUser = await User.create({ name, email, password })
  const token = await auth.use('api').generate(newUser)

  return { token, created: newUser }
})
