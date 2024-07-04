import db from '../config/database';
import { lists } from '../schema';
import { eq } from 'drizzle-orm';

export interface List {
  id: number;
  createdAt: Date;
  name: string;
  boardId: number;
}

export type NewListPayload = Omit<List, 'id' | 'createdAt'>;

export const createNewList = async (
  newList: NewListPayload,
): Promise<number> => {
  try {
    const [result] = await db.insert(lists).values(newList);
    return result.insertId;
  } catch (error) {
    console.error('Failed to create new list:', error);
    throw new Error('Failed to create new list');
  }
};

export const findListById = async (id: number): Promise<List | undefined> => {
  try {
    return await db.query.lists.findFirst({
      where: eq(lists.id, id),
    });
  } catch (error) {
    console.error('Failed to find list:', error);
    throw new Error('Failed to find list');
  }
};

export const findListsByBoardId = async (boardId: number): Promise<List[]> => {
  try {
    return await db.query.lists.findMany({
      where: eq(lists.boardId, boardId),
    });
  } catch (error) {
    console.error('Failed to find lists:', error);
    throw new Error('Failed to find lists');
  }
};

export const updateList = async (
  id: number,
  updates: Partial<NewListPayload>,
): Promise<void> => {
  try {
    await db.update(lists).set(updates).where(eq(lists.id, id));
  } catch (error) {
    console.error('Failed to update list:', error);
    throw new Error('Failed to update list');
  }
};

export const removeList = async (id: number): Promise<void> => {
  try {
    await db.delete(lists).where(eq(lists.id, id));
  } catch (error) {
    console.error('Failed to remove list:', error);
    throw new Error('Failed to remove list');
  }
};
