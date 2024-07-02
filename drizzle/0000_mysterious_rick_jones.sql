CREATE TABLE `boards` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `boards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lists` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`name` varchar(255) NOT NULL,
	`boardId` int NOT NULL,
	CONSTRAINT `lists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`creatorUserId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(1024) NOT NULL,
	`dueDate` date NOT NULL,
	`assigneeUserId` int NOT NULL,
	`status` varchar(50) NOT NULL,
	`listId` int NOT NULL,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
