import { Request, Response } from 'express';
import { TypedRequest } from '../types/TypedRequest';

import {
  createNewTask,
  findTaskById,
  findTasksByListId,
  NewTaskPayload,
  updateTaskModel as updateTaskModel,
  removeTask as removeTaskModel,
} from '../models/Task';

export const createTask = async (
  req: TypedRequest<unknown, NewTaskPayload>,
  res: Response,
) => {
  const newTask = req.body;
  try {
    const taskId = await createNewTask(newTask);
    res.status(201).json({ message: 'Task created successfully', id: taskId });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (
  req: TypedRequest<{ id: number }, Partial<NewTaskPayload>>,
  res: Response,
) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    await updateTaskModel(id, updates);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const getTaskById = async (
  req: TypedRequest<{ id: number }, never>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    const task = await findTaskById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

export const getTasksByListId = async (
  req: TypedRequest<{ listId: number }, never>,
  res: Response,
) => {
  const { listId } = req.params;
  try {
    const tasks = await findTasksByListId(listId);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const removeTask = async (
  req: TypedRequest<{ id: number }, never>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    await removeTaskModel(id);
    res.status(200).json({ message: 'Task removed successfully' });
  } catch (error) {
    console.error('Error removing task:', error);
    res.status(500).json({ error: 'Failed to remove task' });
  }
};
