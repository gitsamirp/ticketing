import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global {
  var getAuthCookie: () => string[];
}

let mongo: any;
beforeAll(async () => { //runs before all tests
  process.env.JWT_KEY = "sdfsdfs";
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.getAuthCookie = () => {

  // create the jwt with payload
  const jwtToken = jwt.sign(
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: "example@example.com",
    },
    process.env.JWT_KEY!,
  );

  // turn session into json
  const sessionJSON = JSON.stringify({ jwt: jwtToken });

  // base 64 the json
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return string as the cookie with encoded data
  return [`express:sess=${base64}`];
}
