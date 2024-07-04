import request from 'supertest';
import { token } from './setup';
import app from '../server';
import { NewTaskPayload } from '../models/Task';
import db from '../config/database';
import { sql } from 'drizzle-orm';

const newTask: NewTaskPayload = {
  status: 'in-progress',
  description: 'New Task',
  listId: 1,
  assigneeUserId: 1,
  creatorUserId: 1,
  dueDate: new Date(),
  title: 'New Task',
};

describe('Tasks API', () => {
  let createdTaskId: number;

  afterAll(async () => {
    await db.execute(sql`DELETE FROM tasks`);
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(newTask)
      .expect(201);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('id');
    createdTaskId = res.body.id;
  });

  it('should fetch the created task by ID', async () => {
    const res = await request(app)
      .get(`/api/v1/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdTaskId);
    expect(res.body).toHaveProperty('title', newTask.title);
  });

  it('should fetch tasks by list ID', async () => {
    const res = await request(app)
      .get(`/api/v1/tasks/list/${newTask.listId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update the task status', async () => {
    const updatedStatus = { status: 'done' };
    const res = await request(app)
      .put(`/api/v1/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedStatus)
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Task updated successfully');

    const updatedTask = await request(app)
      .get(`/api/v1/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(updatedTask.body).toHaveProperty('status', updatedStatus.status);
  });

  it('should delete the task', async () => {
    const res = await request(app)
      .delete(`/api/v1/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Task removed successfully');

    await request(app)
      .get(`/api/v1/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });
});
