CREATE TABLE `crons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`time` integer DEFAULT 0 NOT NULL
);
