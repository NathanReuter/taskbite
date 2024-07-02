import { db } from '../config/database';
import {
  createNewTask,
  findTaskById,
  updateTaskModel,
  removeTask,
  Task,
  NewTaskPayload,
} from '../models/Task';
import { DateTime } from 'luxon';
import { sql } from 'drizzle-orm';

describe('Task Model', () => {
  let createdTaskId: number;

  const newTask: NewTaskPayload = {
    status: 'in-progress',
    description: 'Test Task',
    listId: 1,
    assigneeUserId: 1,
    creatorUserId: 1,
    dueDate: new Date(), // Use Date type here
    title: 'Test Task',
  };

  afterAll(async () => {
    // Clean up all tasks from the database
    await db.execute(sql`DELETE FROM tasks`);
  });

  it('should create a new task', async () => {
    createdTaskId = await createNewTask(newTask);

    const insertedTask = await findTaskById(createdTaskId);

    expect(insertedTask).toBeDefined();
    expect(insertedTask?.title).toBe(newTask.title);
  });

  it('should fetch the created task by ID', async () => {
    const fetchedTask = await findTaskById(createdTaskId);

    expect(fetchedTask).toBeDefined();
    expect(fetchedTask?.id).toBe(createdTaskId);
    expect(fetchedTask?.title).toBe(newTask.title);
  });

  it('should update the task status', async () => {
    const updatedStatus = 'done';

    await updateTaskModel(createdTaskId, { status: updatedStatus });

    const updatedTask = await findTaskById(createdTaskId);

    expect(updatedTask).toBeDefined();
    expect(updatedTask?.status).toBe(updatedStatus);
  });

  it('should delete the task', async () => {
    await removeTask(createdTaskId);

    const deletedTask = await findTaskById(createdTaskId);

    expect(deletedTask).toBeUndefined();
  });
});
