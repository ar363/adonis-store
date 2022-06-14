import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async signup({ auth, request, response }: HttpContextContract) {
    await auth.use('api').authenticate()
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

    return { token: token.toJSON(), created: newUser }
  }

  public async login({ auth, request, response }) {
    await auth.use('api').authenticate()
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
      return { token: token.toJSON() }
    } catch {
      return response.badRequest({ err: 'Invalid credentials' })
    }
  }

  public async currentUser({ auth, response }: HttpContextContract) {
    await auth.use('api').authenticate()
    if (!auth.isLoggedIn) {
      return response.unauthorized({ err: "Not logged in" })
    }

    return auth.user
  }
}
