import request from 'supertest';
import { token } from './setup';
import app from '../server';
import db from '../config/database';
import { DateTime } from 'luxon';
import { NewTaskPayload } from '../models/Task';
import { NewListPayload } from '../models/List';
import { NewBoard } from '../models/Board';
import { sql } from 'drizzle-orm';

const newBoard: NewBoard = {
  name: 'Test Board',
};

const newList: NewListPayload = {
  name: 'Test List',
  boardId: 1, // This will be dynamically set
};

const newTask: NewTaskPayload = {
  status: 'in-progress',
  description: 'Test Task',
  listId: 1, // This will be dynamically set
  assigneeUserId: 1,
  creatorUserId: 1,
  dueDate: new Date(), // Use Date type here
  title: 'Test Task',
};

describe('Integration Tests: Board, List, Task', () => {
  let createdBoardId: number;
  let createdListId: number;
  let createdTaskId: number;

  afterAll(async () => {
    // Clean up all tasks, lists, and boards from the database
    await db.execute(sql`DELETE FROM tasks`);
    await db.execute(sql`DELETE FROM lists`);
    await db.execute(sql`DELETE FROM boards`);
  });

  it('should create a new board', async () => {
    const res = await request(app)
      .post('/api/v1/boards')
      .set('Authorization', `Bearer ${token}`)
      .send(newBoard)
      .expect(201);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('id');
    createdBoardId = res.body.id;

    // Update newList with the created boardId
    newList.boardId = createdBoardId;
  });

  it('should create a new list within the board', async () => {
    const res = await request(app)
      .post('/api/v1/lists')
      .set('Authorization', `Bearer ${token}`)
      .send(newList)
      .expect(201);

    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('id');
    createdListId = res.body.id;

    // Update newTask with the created listId
    newTask.listId = createdListId;
  });

  it('should create a new task within the list', async () => {
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

  it('should fetch lists by board ID', async () => {
    const res = await request(app)
      .get(`/api/v1/lists/board/${createdBoardId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fetch tasks by list ID', async () => {
    const res = await request(app)
      .get(`/api/v1/tasks/list/${createdListId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
