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
  .expect(404);
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
  const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'sdfsdf',
      price: 20,
    });

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'sdjfhjskfhue',
      price: 10,
    })
    .expect(401)

});

it('returns 400 user provides incorrect price or title', async () => {
  const cookie = global.getAuthCookie();
  const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', cookie)
    .send({
      title: 'sdfsdf',
      price: 20,
    });

  await request(app)
  .put(`/api/tickets/${response.body.id}`)
  .set('Cookie', cookie)
  .send({
    title: '',
    price: 20,
  })
  .expect(400);
});

it('updates the tickets if valid', async () => {
  const cookie = global.getAuthCookie();
  const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', cookie)
    .send({
      title: 'sdfsdf',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'updated',
      price: 15,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual('updated');
  expect(ticketResponse.body.price).toEqual(15);

});
