import { userTrackingData, type UserTrackingData, type InsertUserTrackingData } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Add new method for tracking data
  saveTrackingData(data: InsertUserTrackingData): Promise<UserTrackingData>;
  getAllTrackingData(): Promise<UserTrackingData[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private trackingData: Map<number, UserTrackingData>;
  currentId: number;
  trackingId: number;

  constructor() {
    this.users = new Map();
    this.trackingData = new Map();
    this.currentId = 1;
    this.trackingId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveTrackingData(data: InsertUserTrackingData): Promise<UserTrackingData> {
    const id = this.trackingId++;
    const timestamp = new Date();
    const trackingRecord: UserTrackingData = { ...data, id, timestamp };
    this.trackingData.set(id, trackingRecord);
    return trackingRecord;
  }

  async getAllTrackingData(): Promise<UserTrackingData[]> {
    return Array.from(this.trackingData.values());
  }
}

export const storage = new MemStorage();
