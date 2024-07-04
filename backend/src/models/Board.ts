import { boards } from '../schema';
import db from '../config/database';
import { eq } from 'drizzle-orm';

export interface Board {
  id: number;
  createdAt: Date;
  name: string;
}

export type NewBoard = Omit<Board, 'id' | 'createdAt'>;

export const createNewBoard = async (newBoard: NewBoard): Promise<number> => {
  try {
    const [result] = await db.insert(boards).values(newBoard);
    return result.insertId;
  } catch (error) {
    console.error('Error on creating a new board:', error);
    throw new Error('Error on creating a new board');
  }
};

export const updateBoard = async (
  boardId: number,
  updates: Partial<NewBoard>,
): Promise<void> => {
  try {
    await db.update(boards).set(updates).where(eq(boards.id, boardId));
  } catch (error) {
    console.error('Error on updating board:', error);
    throw new Error('Error on updating board');
  }
};

export const findBoardById = async (id: number): Promise<Board | undefined> => {
  try {
    return await db.query.boards.findFirst({
      where: eq(boards.id, id),
    });
  } catch (error) {
    console.error('Error on finding board:', error);
    throw new Error('Error on finding board');
  }
};

export const removeBoard = async (id: number): Promise<void> => {
  try {
    await db.delete(boards).where(eq(boards.id, id));
  } catch (error) {
    console.error('Error on removing a board:', error);
    throw new Error('Error on removing a board');
  }
};
