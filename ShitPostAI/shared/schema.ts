import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const resumes = pgTable("resumes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  desiredPosition: text("desired_position"),
  fileName: text("file_name").notNull(),
  fileSize: text("file_size").notNull(),
  additionalInfo: text("additional_info"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const developerApplications = pgTable("developer_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  queueNumber: text("queue_number").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  experience: text("experience").notNull(),
  techStack: jsonb("tech_stack").notNull(),
  githubProfile: text("github_profile"),
  portfolioWebsite: text("portfolio_website"),
  motivation: text("motivation").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const aiQueries = pgTable("ai_queries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  query: text("query").notNull(),
  response: text("response").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  createdAt: true,
});

export const insertDeveloperApplicationSchema = createInsertSchema(developerApplications).omit({
  id: true,
  queueNumber: true,
  createdAt: true,
});

export const insertAiQuerySchema = createInsertSchema(aiQueries).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;

export type InsertDeveloperApplication = z.infer<typeof insertDeveloperApplicationSchema>;
export type DeveloperApplication = typeof developerApplications.$inferSelect;

export type InsertAiQuery = z.infer<typeof insertAiQuerySchema>;
export type AiQuery = typeof aiQueries.$inferSelect;
