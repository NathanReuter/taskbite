import request from 'supertest';
import { token, app } from './setup';
import db from '../config/database';
import { lists } from '../schema';

describe('Lists API Creation', () => {
  it('should not create a new list if not authorized', async () => {
    await request(app)
      .post('/api/v1/lists')
      .send({
        name: 'New List',
        boardId: 1,
      })
      .expect(401);
  }, 30000);

  // Create a new list
  it('should create a new list', async () => {
    try {
      const response = await request(app)
        .post('/api/v1/lists')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'New List',
          boardId: 1,
        })
        .expect(201);

      expect(response.body).toHaveProperty('message');
    } finally {
      // Clean up the created list
      await db.delete(lists);
    }
  });
});

describe('Lists API Creation', () => {
  let createdListIds: number[] = [];
  beforeAll(async () => {
    // Create a new list
    const res = await request(app)
      .post('/api/v1/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New List',
        boardId: 1,
      })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdListIds.push(res.body.id);
    await request(app)
      .post('/api/v1/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New List 2',
        boardId: 1,
      })
      .expect(201);
    createdListIds.push(res.body.id);
  });
  afterAll(async () => {
    createdListIds = [];
    // Clean up the created lists
    await db.delete(lists);
  });
  // Get all lists
  it('should get all lists', async () => {
    const response = await request(app)
      .get('/api/v1/lists/board/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveLength(createdListIds.length);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('boardId');
  });

  // Get a list by ID
  it('should get a list by ID', async () => {
    const response = await request(app)
      .get(`/api/v1/lists/${createdListIds[0]}`)
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('id');
  });

  // Update a list
  it('should update a list', async () => {
    const response = await request(app)
      .put(`/api/v1/lists/${createdListIds[0]}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated List Name',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('message');
  });

  // Delete a list
  it('should delete a list', async () => {
    await request(app)
      .delete(`/api/v1/lists/${createdListIds[0]}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});
