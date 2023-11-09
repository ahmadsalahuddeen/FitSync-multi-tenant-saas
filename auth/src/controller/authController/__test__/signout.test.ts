import request from 'supertest'
import { app } from '../../../app';

it('clears the cookie after  signing out', async () => {
  await request(app)
    .post('/api/auth/tenant/signup')
    .send({
      email : 'test@test.com',
      password : 'password',
      businessName : 'testValue',
      firstName : 'testValue',
      lastName : 'testValue',
      phoneNumber : 'testValue',
      confirmPassword : 'password'
    })
    .expect(201)

  const response = await request(app)
    .post('/api/auth/users/signout')
    .send()
    .expect(200)

  expect(response.get('Set-Cookie')[0]).toEqual( 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')

}) 