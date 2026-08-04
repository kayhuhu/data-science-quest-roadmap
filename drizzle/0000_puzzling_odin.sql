CREATE TABLE `attachments` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`object_key` text NOT NULL,
	`file_name` text NOT NULL,
	`mime_type` text NOT NULL,
	`size` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_attachments_object_key` ON `attachments` (`object_key`);--> statement-breakpoint
CREATE INDEX `idx_attachments_owner` ON `attachments` (`owner_id`);--> statement-breakpoint
CREATE TABLE `study_records` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`kind` text NOT NULL,
	`record_key` text NOT NULL,
	`payload` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_study_records_owner_kind_key` ON `study_records` (`owner_id`,`kind`,`record_key`);--> statement-breakpoint
CREATE INDEX `idx_study_records_owner_kind` ON `study_records` (`owner_id`,`kind`);