import { pgTable, text, serial, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User data collection schema
export const userTrackingData = pgTable("user_tracking_data", {
  id: serial("id").primaryKey(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  userAgent: text("user_agent").notNull(),
  screen: text("screen").notNull(),
  language: text("language").notNull(),
  battery: text("battery"),
  ip: text("ip"),
  platform: text("platform"),
  vendor: text("vendor"),
  cookiesEnabled: text("cookies_enabled"),
  doNotTrack: text("do_not_track"),
  hardwareConcurrency: text("hardware_concurrency"),
  deviceMemory: text("device_memory"),
  networkType: text("network_type"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Creating insert schema for user tracking data
export const insertUserTrackingDataSchema = createInsertSchema(userTrackingData).omit({
  id: true,
  timestamp: true,
  ip: true, // IP will be added server-side
});

export type InsertUserTrackingData = z.infer<typeof insertUserTrackingDataSchema>;
export type UserTrackingData = typeof userTrackingData.$inferSelect;
