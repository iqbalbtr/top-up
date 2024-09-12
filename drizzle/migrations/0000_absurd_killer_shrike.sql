CREATE TABLE `order_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ref_code` text NOT NULL,
	`code` text NOT NULL,
	`code_product` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` integer NOT NULL,
	`name` text NOT NULL,
	`sub_total` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ref_code` text NOT NULL,
	`account` blob,
	`status_transaction` text DEFAULT 'PENDING' NOT NULL,
	`status_payment` text DEFAULT 'UNPAID' NOT NULL,
	`ref_transaction` text NOT NULL,
	`create_at` integer DEFAULT 1726156307 NOT NULL,
	`expired` integer NOT NULL,
	`method` text NOT NULL,
	`amount` integer NOT NULL,
	`total_fee` integer DEFAULT 0 NOT NULL,
	`pay_code` text,
	`pay_url` text,
	`barcode` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `transactions_ref_code_unique` ON `transactions` (`ref_code`);--> statement-breakpoint
CREATE UNIQUE INDEX `transactions_ref_transaction_unique` ON `transactions` (`ref_transaction`);