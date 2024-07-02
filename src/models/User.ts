import db from '../config/database';
import { eq, sql } from 'drizzle-orm';
import { users } from '../schema';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export type NewUserPayload = Omit<User, 'id'>;

type UniqueUserQuery = {
  id?: number;
  email?: string;
} & ({ id: number } | { email: string });

export const createUser = async (user: NewUserPayload) => {
  await db.insert(users).values(user);
};

export const findUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  return db.query.users.findFirst({
    where: eq(users.email, email),
  });
};

export const removeUser = async (query: {
  [TProp in keyof UniqueUserQuery]: UniqueUserQuery[TProp];
}) => {
  const key = Object.keys(query)[0] as keyof UniqueUserQuery;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const condition = eq(users[key], query[key]);

  await db.delete(users).where(condition);
};
