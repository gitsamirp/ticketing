import request from 'supertest';
import { app } from '../../app';

it('clears coookie upon signing out', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const signoutRes = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);

    expect(signoutRes.get('Set-Cookie')).toBeDefined();
});
