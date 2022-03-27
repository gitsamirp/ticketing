import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on correct signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password' 
        })
        .expect(201);
});

it('returns 400 with invalid email', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'testtestcom',
        password: 'password' 
    })
    .expect(400);
});

it('returns 400 with invalid password', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 's' 
    })
    .expect(400);
});

it('returns 400 with missing request values', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com' })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({})
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('sets a cookie upon signup', async () => {
    const res = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(res.get('Set-Cookie')).toBeDefined();
});
