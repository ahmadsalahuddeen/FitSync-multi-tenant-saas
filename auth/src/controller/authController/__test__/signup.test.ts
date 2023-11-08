import request from "supertest";
import { app } from '../../../app'



it('returns 201 on succefull request', async () => {
  return request(app)
    .post('/api/auth/users/signup')
    .send({
      email: "test@test.test",
      password: "password"
    })
    .expect(201)
});



it('returns 400 on invalid email and password', async () => {
  // invalid email
  await request(app)
    .post('/api/auth/users/signup')
    .send({
      email: "invalid@test",
      password: "password"
    })
    .expect(400)


  // invalid pasword
  await request(app)
    .post('/api/auth/users/signup')
    .send({
      email: "test@test.com",
      password: ""
    })
    .expect(400)
})

it('dissallows duplicate email', async () => {
  // invalid email
  await request(app)
    .post('/api/auth/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201)


  // invalid pasword
  await request(app)
    .post('/api/auth/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(400)
})


it('sets a cookie after succesfull signup', async () => {
  const response = await request(app)
    .post('/api/auth/users/signup')
    .send({
      email: "test@test.test",
      password: "password"
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined()

});
