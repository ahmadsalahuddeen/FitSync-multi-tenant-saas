import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'


declare global {
  var signup: ()=> Promise<string[]>
}

let mongo: any;

// hook function that's going to run before all of the test
beforeAll(async()=>{
  process.env.JWT_KEY = 'asdfadf'
  mongo = await MongoMemoryServer.create();

  const mongoUri =  await mongo.getUri();

  await mongoose.connect(mongoUri)
});

// hook that run before each of the test
beforeEach( async ()=> {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections){
    await collection.deleteMany({})
  }
});

// hook that run after all the tests are complete
afterAll( async ()=>{
  await mongo.stop();
  await mongoose.connection.close();
})


global.signup = async ()=>{
  const email = 'test@test.com';
  const password = 'password'

  const response = await request(app)
  .post('/api/auth/users/signup') 
  .send({
    email, password
  })
  .expect(201)

  const cookie = response.get('Set-Cookie');

  return cookie;
}