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

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('store', async () => {
  return [
    {
      "slug": "ncert-12th-math-textbook-pt1",
      "name": "Mathematics: Textbook for Class XII - Part 1",
      "description": "This is the Part 1 of a 12th standard math textbook that is read in almost every PU college in India",
      "image": "/book-imgs/lemh1cc.jpg",
      "author": "NCERT",
      "subject": "Mathematics",
      "class": "12",
      "price": 120
    },
    {
      "slug": "ncert-12th-math-textbook-pt2",
      "name": "Mathematics: Textbook for Class XII - Part 2",
      "description": "This is the Part 2 of a 12th standard math textbook that is read in almost every PU college in India",
      "image": "/book-imgs/lemh2cc.jpg",
      "author": "NCERT",
      "subject": "Mathematics",
      "class": "12",
      "price": 140
    },
    {
      "slug": "ncert-11th-math-textbook",
      "name": "Mathematics: Textbook for Class XI",
      "description": "This is the a 11th standard math textbook that is read in almost every PU college in India",
      "image": "/book-imgs/kemh1cc.jpg",
      "author": "NCERT",
      "subject": "Mathematics",
      "class": "11",
      "price": 180
    },
    {
      "slug": "ncert-12th-physics-textbook-pt1",
      "name": "Physics: Textbook for Class XII - Part 1",
      "description": "This is the Part 1 of a 12th standard physics textbook that is read in almost every PU college in India",
      "image": "/book-imgs/leph1cc.jpg",
      "author": "NCERT",
      "subject": "Physics",
      "class": "12",
      "price": 135
    },
    {
      "slug": "ncert-12th-physics-textbook-pt2",
      "name": "Physics: Textbook for Class XII - Part 2",
      "description": "This is the Part 2 of a 12th standard physics textbook that is read in almost every PU college in India",
      "image": "/book-imgs/leph2cc.jpg",
      "author": "NCERT",
      "subject": "Physics",
      "class": "12",
      "price": 150
    },
    {
      "slug": "ncert-11th-physics-textbook-pt1",
      "name": "Physics: Textbook for Class XI - Part 1",
      "description": "This is the Part 1 of a 11th standard physics textbook that is read in almost every PU college in India",
      "image": "/book-imgs/keph1cc.jpg",
      "author": "NCERT",
      "subject": "Physics",
      "class": "11",
      "price": 135
    },
    {
      "slug": "ncert-11th-physics-textbook-pt2",
      "name": "Physics: Textbook for Class XI - Part 2",
      "description": "This is the Part 2 of a 11th standard physics textbook that is read in almost every PU college in India",
      "image": "/book-imgs/keph2cc.jpg",
      "author": "NCERT",
      "subject": "Physics",
      "class": "11",
      "price": 120
    },
    {
      "slug": "ncert-12th-chemistry-textbook-pt1",
      "name": "Chemistry: Textbook for Class XII - Part 1",
      "description": "This is the Part 1 of a 12th standard chemistry textbook that is read in almost every PU college in India",
      "image": "/book-imgs/lech1cc.jpg",
      "author": "NCERT",
      "subject": "Chemistry",
      "class": "12",
      "price": 150
    },
    {
      "slug": "ncert-12th-chemistry-textbook-pt2",
      "name": "Chemistry: Textbook for Class XII - Part 2",
      "description": "This is the Part 2 of a 12th standard chemistry textbook that is read in almost every PU college in India",
      "image": "/book-imgs/lech2cc.jpg",
      "author": "NCERT",
      "subject": "Chemistry",
      "class": "12",
      "price": 135
    },
    {
      "slug": "ncert-11th-chemistry-textbook-pt1",
      "name": "Chemistry: Textbook for Class XI - Part 1",
      "description": "This is the Part 1 of a 11th standard chemistry textbook that is read in almost every PU college in India",
      "image": "/book-imgs/kech1cc.jpg",
      "author": "NCERT",
      "subject": "Chemistry",
      "class": "11",
      "price": 115
    },
    {
      "slug": "ncert-11th-chemistry-textbook-pt2",
      "name": "Chemistry: Textbook for Class XI - Part 2",
      "description": "This is the Part 2 of a 11th standard chemistry textbook that is read in almost every PU college in India",
      "image": "/book-imgs/kech2cc.jpg",
      "author": "NCERT",
      "subject": "Chemistry",
      "class": "11",
      "price": 140
    }
  ]

})

Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    const token = await auth.use('api').attempt(email, password)
    return token
  } catch {
    return response.badRequest({err: 'Invalid credentials'})
  }
})
