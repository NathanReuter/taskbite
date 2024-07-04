import { Request, Response } from 'express';
import { TypedRequest } from '../types/TypedRequest';
import {
  createNewBoard,
  findBoardById,
  NewBoard,
  updateBoard as updateBoardModel,
  removeBoard as removeBoardModel,
} from '../models/Board';

export const createBoard = async (
  req: TypedRequest<unknown, NewBoard>,
  res: Response,
) => {
  const newBoard = req.body;
  try {
    const newBoardId = await createNewBoard(newBoard);
    res.status(201).json({
      message: 'Board created successfully',
      id: newBoardId,
    });
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(500).json({ error: 'Failed to create board' });
  }
};

export const updateBoard = async (
  req: TypedRequest<{ id: number }, Partial<NewBoard>>,
  res: Response,
) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    await updateBoardModel(id, updates);
    res.status(200).json({ message: 'Board updated successfully' });
  } catch (error) {
    console.error('Error updating board:', error);
    res.status(500).json({ error: 'Failed to update board' });
  }
};

export const getBoardById = async (
  req: TypedRequest<{ id: number }, never>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    const board = await findBoardById(id);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).json({ error: 'Board not found' });
    }
  } catch (error) {
    console.error('Error fetching board:', error);
    res.status(500).json({ error: 'Failed to fetch board' });
  }
};

export const removeBoard = async (
  req: TypedRequest<{ id: number }, never>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    await removeBoardModel(id);
    res.status(200).json({ message: 'Board removed successfully' });
  } catch (error) {
    console.error('Error removing board:', error);
    res.status(500).json({ error: 'Failed to remove board' });
  }
};
