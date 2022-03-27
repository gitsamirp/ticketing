import request from 'supertest';
import { app } from '../../app';

it('returns a 400 user does not exist', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password' 
        })
        .expect(400);
});

it('returns a 400 password incorrect', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'wrongpassword' 
        })
        .expect(400);
});


it('check set cookie to be defined', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const res = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password' 
        })
        .expect(201);

    expect(res.get('Set-Cookie')).toBeDefined();
});
