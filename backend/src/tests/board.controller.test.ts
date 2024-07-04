import request from 'supertest';
import { token, app } from './setup';

describe('Board Routes', () => {
  let createdBoardId: number;
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/v1/boards')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'New Board' })
      .expect(201)
      .expect('Content-Type', /json/);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('message', 'Board created successfully');
    createdBoardId = res.body.id;
  });

  it('should get a board by ID', async () => {
    const res = await request(app)
      .get(`/api/v1/boards/${createdBoardId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
  });

  it('should update a board', async () => {
    const res = await request(app)
      .put(`/api/v1/boards/${createdBoardId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Board Name' })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('message', 'Board updated successfully');
  });

  it('should delete a board', async () => {
    const res = await request(app)
      .delete(`/api/v1/boards/${createdBoardId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toHaveProperty('message', 'Board removed successfully');
  });
});
