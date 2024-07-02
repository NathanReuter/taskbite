import {
  date,
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
});

export const boards = mysqlTable('boards', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const lists = mysqlTable('lists', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  boardId: int('boardId').notNull(),
});

export const tasks = mysqlTable('tasks', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  creatorUserId: int('creatorUserId').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 1024 }).notNull(),
  dueDate: date('dueDate', {
    mode: 'string',
  }).notNull(),
  assigneeUserId: int('assigneeUserId'),
  status: varchar('status', { length: 50 }).notNull(),
  listId: int('listId').notNull(),
});
