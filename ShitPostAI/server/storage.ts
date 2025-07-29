import { users, resumes, developerApplications, aiQueries, type User, type InsertUser, type Resume, type InsertResume, type DeveloperApplication, type InsertDeveloperApplication, type AiQuery, type InsertAiQuery } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createResume(resume: InsertResume): Promise<Resume>;
  getAllResumes(): Promise<Resume[]>;
  
  createDeveloperApplication(application: InsertDeveloperApplication): Promise<DeveloperApplication>;
  getAllDeveloperApplications(): Promise<DeveloperApplication[]>;
  generateQueueNumber(): Promise<string>;
  
  createAiQuery(query: InsertAiQuery): Promise<AiQuery>;
  getAllAiQueries(): Promise<AiQuery[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const [resume] = await db
      .insert(resumes)
      .values({
        ...insertResume,
        phone: insertResume.phone || null,
        desiredPosition: insertResume.desiredPosition || null,
        additionalInfo: insertResume.additionalInfo || null,
      })
      .returning();
    return resume;
  }

  async getAllResumes(): Promise<Resume[]> {
    return await db.select().from(resumes);
  }

  async generateQueueNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await db.select().from(developerApplications);
    const number = String(count.length + 1).padStart(3, '0');
    return `DEV-${year}-${number}`;
  }

  async createDeveloperApplication(insertApplication: InsertDeveloperApplication): Promise<DeveloperApplication> {
    const queueNumber = await this.generateQueueNumber();
    const [application] = await db
      .insert(developerApplications)
      .values({
        ...insertApplication,
        queueNumber,
        githubProfile: insertApplication.githubProfile || null,
        portfolioWebsite: insertApplication.portfolioWebsite || null,
      })
      .returning();
    return application;
  }

  async getAllDeveloperApplications(): Promise<DeveloperApplication[]> {
    return await db.select().from(developerApplications);
  }

  async createAiQuery(insertQuery: InsertAiQuery): Promise<AiQuery> {
    const [aiQuery] = await db
      .insert(aiQueries)
      .values(insertQuery)
      .returning();
    return aiQuery;
  }

  async getAllAiQueries(): Promise<AiQuery[]> {
    return await db.select().from(aiQueries);
  }
}

export const storage = new DatabaseStorage();
