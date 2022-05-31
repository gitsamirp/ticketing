import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

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
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({
      price: 10,
    }).expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({
      title: '',
      price: 10,
    }).expect(400);
});

it('error if invalid prices is detected', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'test',
    }).expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'test',
      price: -5,
    }).expect(400);
});

it('creates a ticket if valid data', async () => {

  // add mongoose check if ticket was saved
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'test',
      price: 10,
    }).expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
});
