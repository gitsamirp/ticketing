import request from 'supertest';
import { app } from '../../app';

it('route handler exists going to post request /api/tickets', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});


    expect(response.status).not.toEqual(404);
});

it('can only be accessed if signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});

  expect(response.status).toEqual(401);
});

it('returns a non 401 status if signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns error if title is invalid', async () => {

});

it('error if invalid prices is detected', async () => {

});

it('creates a ticket if valid data', async () => {

});
