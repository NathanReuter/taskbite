import { db, pool } from '../config/database';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import request from 'supertest';
import app from '../server';
import { NewUserPayload } from '../models/User';
import { users } from '../schema';
import { eq } from 'drizzle-orm';
import * as http from 'node:http';

let token: string;
let server: http.Server;
export const newUserPayload: NewUserPayload = {
  name: 'test',
  email: 'test5@test.com',
  password: 'password123',
};

beforeAll(async () => {
  try {
    // Run migrations before starting tests
    await migrate(db, { migrationsFolder: './drizzle' });

    server = app.listen(4001);
    // Create a test user and get the token from the signup response
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send(newUserPayload)
      .expect(200);

    token = response.body?.token;
    expect(token).toBeTruthy();
  } catch (error) {
    console.error('Setup failed', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await db.delete(users).where(eq(users.email, newUserPayload.email));
    // Close database connection after tests
    await pool.end();
  } catch (error) {
    console.error('Cleanup failed', error);
    throw error;
  } finally {
    server.close();
  }
});

export { token, app };
