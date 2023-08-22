import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'


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