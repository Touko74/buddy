// Types calqués sur le schéma de données du cahier des charges (section 8).
// Le jour où on branche Prisma + Postgres, ces types deviennent quasi
// directement le schema.prisma (mêmes noms de champs, mêmes relations).

export type Level = "beginner" | "intermediate" | "advanced";
export type Goal =
  | "muscle_gain"
  | "weight_loss"
  | "endurance"
  | "general_fitness"
  | "performance";
export type PartnerType = "regular" | "occasional";
export type RequestStatus = "pending" | "accepted" | "declined";
export type SessionStatus = "planned" | "done" | "cancelled";

export interface Club {
  id: string;
  name: string;
  city: string;
  address: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  age: number;
  avatarInitial: string; // pas d'upload de vraie photo dans ce prototype
  clubId: string;
  level: Level;
  goal: Goal;
  partnerType: PartnerType;
  createdAt: string;
}

export interface TrainingPreference {
  id: string;
  userId: string;
  activity: string;
}

export interface Availability {
  id: string;
  userId: string;
  day: number; // 0 = lundi ... 6 = dimanche
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
}

export interface BuddyRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: RequestStatus;
  createdAt: string;
}

export interface Conversation {
  id: string;
  userAId: string;
  userBId: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
}

export interface TrainingSession {
  id: string;
  creatorId: string;
  buddyId: string;
  clubId: string;
  date: string; // "YYYY-MM-DD"
  startTime: string;
  duration: number; // minutes
  type: string;
  status: SessionStatus;
}

// Vue "profil complet" utilisée par l'algo de matching et l'UI —
// assemble User + ses TrainingPreference + ses Availability.
export interface FullProfile extends User {
  activities: string[];
  availabilities: Availability[];
}
