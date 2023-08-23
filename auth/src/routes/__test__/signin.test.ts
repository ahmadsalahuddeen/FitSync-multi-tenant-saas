import request from "supertest"

import { app } from '../../app'


it('Fails when an invalid email is given', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(400)
})


it('Fails when an wrong password is given', async () => {
  //registering
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "password"
    })
    .expect(201)

  //login
  await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      //providing a wrong password
      password: "wrongPassword"
    })
    .expect(400)
})

it('responds with a cookies when given a valid credentials ', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: "password"
    })
    .expect(201)


  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();

})