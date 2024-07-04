import request from 'supertest';
import { db } from '../config/database';
import { NewUserPayload } from '../models/User';
import { config } from '../config/config';
import { eq, sql } from 'drizzle-orm';
import { app, newUserPayload, token } from './setup';
import { users } from '../schema';

describe('Auth Controller', () => {
  afterAll(async () => {
    await db.execute(sql`DELETE FROM users`);
  });
  describe('Signup', () => {
    it('should create a new user and return a token', async () => {
      const otherUser: NewUserPayload = {
        name: 'test2',
        email: 'test@test10.com',
        password: 'password123',
      };
      await db.delete(users).where(eq(users.email, otherUser.email));
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send(otherUser)
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });

    it('should not allow duplicate email signup', async () => {
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send(newUserPayload)
        .expect(400);

      expect(response.body.message).toBe('User already exist');
    });

    it('should return 400 for missing fields', async () => {
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'incompleteuser@test.com',
        })
        .expect(400);

      expect(response.body.message).toBe('Wrong new user payload');
    });
  });

  describe('Login', () => {
    it('should login an existing user and return a token', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: newUserPayload.email,
          password: newUserPayload.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });

    it('should return 404 for non-existing user', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistinguser@test.com',
          password: 'password123',
        })
        .expect(404);

      expect(response.body.message).toBe('User not found');
    });

    it('should return 401 for wrong password', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: newUserPayload.email,
          password: 'wrongpassword',
        })
        .expect(401);

      expect(response.body.message).toBe('Invalid password');
    });

    it('should return 400 for missing fields', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: newUserPayload.email,
        })
        .expect(400);

      expect(response.body.message).toBe('Missing email or password');
    });
  });

  describe('Delete User', () => {
    it('should delete an existing user', async () => {
      const response = await request(app)
        .delete(`/api/v1/auth`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.message).toBe(
        `User deleted ${newUserPayload.email}`,
      );
    });

    it('should return 401 when the user is not authenticated', async () => {
      await request(app).delete('/api/v1/auth').expect(401);
    });
  });
});
