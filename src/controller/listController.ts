import { Request, Response } from 'express';
import { TypedRequest } from '../types/TypedRequest';
import {
  createNewList,
  findListById,
  findListsByBoardId,
  NewListPayload,
  updateList as updateListModel,
  removeList as removeListModel,
} from '../models/List';

export const createList = async (
  req: TypedRequest<unknown, NewListPayload>,
  res: Response,
) => {
  const newList = req.body;
  try {
    const newListId = await createNewList(newList);
    res.status(201).json({
      id: newListId,
      message: 'List created successfully',
    });
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ error: 'Failed to create list' });
  }
};

export const updateList = async (
  req: TypedRequest<{ id: number }, Partial<NewListPayload>>,
  res: Response,
) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    await updateListModel(id, updates);
    res.status(200).json({ message: 'List updated successfully' });
  } catch (error) {
    console.error('Error updating list:', error);
    res.status(500).json({ error: 'Failed to update list' });
  }
};

export const getListById = async (
  req: TypedRequest<{ id: number }, never>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    const list = await findListById(id);
    if (list) {
      res.status(200).json(list);
    } else {
      res.status(404).json({ error: 'List not found' });
    }
  } catch (error) {
    console.error('Error fetching list:', error);
    res.status(500).json({ error: 'Failed to fetch list' });
  }
};

export const getListsByBoardId = async (
  req: TypedRequest<{ boardId: number }, never>,
  res: Response,
) => {
  const { boardId } = req.params;
  try {
    const lists = await findListsByBoardId(boardId);
    res.status(200).json(lists);
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(500).json({ error: 'Failed to fetch lists' });
  }
};

export const removeList = async (
  req: TypedRequest<{ id: number }, never>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    await removeListModel(id);
    res.status(204).json({ message: 'List removed successfully' });
  } catch (error) {
    console.error('Error removing list:', error);
    res.status(500).json({ error: 'Failed to remove list' });
  }
};
