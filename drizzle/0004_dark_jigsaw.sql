ALTER TABLE "delivery_persons" RENAME COLUMN "warehous_id" TO "warehouse_id";--> statement-breakpoint
ALTER TABLE "delivery_persons" DROP CONSTRAINT "delivery_persons_warehous_id_warehouses_id_fk";
--> statement-breakpoint
ALTER TABLE "delivery_persons" ADD CONSTRAINT "delivery_persons_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE cascade ON UPDATE no action;