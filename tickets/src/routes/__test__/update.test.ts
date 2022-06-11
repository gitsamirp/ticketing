import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

it('returns 404 if id does not exists', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
  .put(`/api/tickets/${id}`)
  .set('Cookie', global.getAuthCookie())
  .send({
    title: 'sdfsdf',
    price: 20,
  })
  .expect(404)
});

it('returns 401 if user not logged in', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
  .put(`/api/tickets/${id}`)
  .send({
    title: 'sdfsdf',
    price: 20,
  })
  .expect(401)
});

it('returns 401 if user doesnt own the ticket', async () => {

});

it('returns 400 user provides incorrect price or title', async () => {

});

it('updates the tickets if valid', async () => {

});
