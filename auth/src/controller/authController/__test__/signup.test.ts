import request from "supertest";
import { app } from '../../../app'



it('returns 201 on succefull request', async () => {
  return request(app)
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
});



it('returns 400 on invalid email and password', async () => {
  // invalid email
  await request(app)
    .post('/api/auth/tenant/signup')
    .send({
      email: "invalid@test",
      password: "password",
      businessName : "testValue",
      firstName : "testValue ",
      lastName : "testValue",
      phoneNumber : "testValue",
      confirmPassword: 'password'
    })
    .expect(400)


  // invalid pasword
  await request(app)
    .post('/api/auth/tenant/signup')
    .send({
      email: "test@test.com",
      password: "",
      businessName : "testValue",
      firstName : "testValue ",
      lastName : "testValue",
      phoneNumber : "testValue",
      confirmPassword: ''
    })
    .expect(400)
})

it('dissallows duplicate email', async () => {
  // invalid email
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


  // invalid pasword
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
    .expect(400)
})


it('sets a cookie after succesfull signup', async () => {
  const response = await request(app)
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
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined()

});
