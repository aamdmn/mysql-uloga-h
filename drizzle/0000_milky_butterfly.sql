CREATE TABLE `form` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` char,
	`email` char,
	`phone` int,
	`message` char,
	`person` boolean DEFAULT true,
	CONSTRAINT `form_id` PRIMARY KEY(`id`)
);
