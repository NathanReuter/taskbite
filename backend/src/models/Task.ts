import db from '../config/database';
import { tasks } from '../schema';
import { eq } from 'drizzle-orm';
import { DateTime } from 'luxon';

export const taskStatusEnum = ['todo', 'in-progress', 'done'] as const;
export type TaskStatus = (typeof taskStatusEnum)[number];
export const DEFAULT_TASK_STATUS: TaskStatus = 'todo';

export interface Task {
  id: number;
  createdAt: Date;
  creatorUserId: number;
  title: string;
  description: string;
  dueDate: Date;
  assigneeUserId?: number;
  status: TaskStatus;
  listId: number;
}

export type NewTaskPayload = Omit<Task, 'id' | 'createdAt'> & {
  status?: TaskStatus;
};

const validateTaskStatus = (status: unknown): status is TaskStatus => {
  return (taskStatusEnum as readonly string[]).includes(status as TaskStatus);
};

export const createNewTask = async (
  newTask: NewTaskPayload,
): Promise<number> => {
  try {
    const status: TaskStatus =
      newTask.status && validateTaskStatus(newTask.status)
        ? newTask.status
        : DEFAULT_TASK_STATUS;

    let formattedDate: string;
    if (typeof newTask.dueDate === 'string') {
      formattedDate = DateTime.fromISO(newTask.dueDate).toFormat('yyyy-MM-dd');
    } else {
      formattedDate = DateTime.fromJSDate(newTask.dueDate).toFormat(
        'yyyy-MM-dd',
      );
    }
    const [result] = await db.insert(tasks).values({
      title: newTask.title,
      creatorUserId: newTask.creatorUserId,
      assigneeUserId: newTask.assigneeUserId,
      description: newTask.description,
      dueDate: formattedDate,
      listId: newTask.listId,
      status,
    });

    return result.insertId;
  } catch (error) {
    console.error('Error creating new task:', error);
    throw error;
  }
};

const mapTaskDates = (tasks: any[]): Task[] => {
  return tasks.map((task) => ({
    ...task,
    dueDate: DateTime.fromSQL(task.dueDate).toJSDate(),
  })) as Task[];
};

export const findTaskById = async (
  taskId: number,
): Promise<Task | undefined> => {
  const taskResult = await db.query.tasks.findFirst({
    where: eq(tasks.id, taskId),
  });
  if (taskResult) {
    return mapTaskDates([taskResult])[0];
  }
  return undefined;
};

export const findTasksByListId = async (listId: number): Promise<Task[]> => {
  const tasksResult = await db.query.tasks.findMany({
    where: eq(tasks.listId, listId),
  });
  return mapTaskDates(tasksResult);
};

export const updateTaskModel = async (
  tasksId: number,
  updates: Partial<NewTaskPayload>,
): Promise<number> => {
  const status: TaskStatus | undefined = updates.status;
  if (status && !validateTaskStatus(status)) {
    throw new Error('Invalid task status');
  }

  const taskUpdates: Partial<Omit<NewTaskPayload, 'dueDate'>> & {
    dueDate?: string;
  } = {
    title: updates.title,
    description: updates.description,
    dueDate: updates.dueDate
      ? DateTime.fromJSDate(updates.dueDate).toFormat('yyyy-MM-dd')
      : undefined,
    assigneeUserId: updates.assigneeUserId,
    status: status || DEFAULT_TASK_STATUS,
  };

  const [result] = await db
    .update(tasks)
    .set(taskUpdates)
    .where(eq(tasks.id, tasksId));
  return result.insertId;
};

export const updateTaskStatus = async (
  taskId: number,
  status: TaskStatus,
): Promise<void> => {
  await db.update(tasks).set({ status }).where(eq(tasks.id, taskId));
};

export const updateTaskAssignee = async (
  taskId: number,
  assigneeUserId: number,
): Promise<void> => {
  await db.update(tasks).set({ assigneeUserId }).where(eq(tasks.id, taskId));
};

export const removeTask = async (taskId: number): Promise<void> => {
  await db.delete(tasks).where(eq(tasks.id, taskId));
};
