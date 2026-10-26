import {
  Club,
  User,
  TrainingPreference,
  Availability,
  BuddyRequest,
  TrainingSession,
  FullProfile,
} from "./types";

// ─── Store en mémoire ────────────────────────────────────────────────
// Next.js (App Router + Turbopack) bundle chaque route séparément —
// un simple `const users = [...]` en haut de module peut donc se
// retrouver dupliqué entre app/api/profile et app/login, chacun avec
// sa propre copie, désynchronisée dès qu'on écrit dans l'une. On
// attache donc le store à `globalThis`, seul point garanti partagé
// entre tous les bundles d'un même process Node (même pattern que le
// singleton Prisma recommandé par Next.js). Persiste tant que le
// serveur tourne, repart de zéro à chaque redémarrage — suffisant
// pour une démo, pas pour de la prod (voir note en bas de fichier).

interface Store {
  clubs: Club[];
  users: User[];
  trainingPreferences: TrainingPreference[];
  availabilities: Availability[];
  buddyRequests: BuddyRequest[];
  sessions: TrainingSession[];
  idCounter: number;
}

declare global {
  var __buddyStore: Store | undefined;
}

function createInitialStore(): Store {
  return {
    clubs: [
      { id: "club-nord", name: "Club Nord", city: "Nord", address: "12 rue du Stade" },
      { id: "club-centre", name: "Club Centre", city: "Centre", address: "8 avenue de la Gare" },
      { id: "club-sud", name: "Club Sud", city: "Sud", address: "45 boulevard des Sports" },
    ],
    users: [
      { id: "thomas", username: "Thomas B.", email: "thomas@example.com", age: 27, avatarInitial: "T", clubId: "club-nord", level: "intermediate", goal: "muscle_gain", partnerType: "regular", createdAt: "2026-01-10" },
      { id: "lucas", username: "Lucas M.", email: "lucas@example.com", age: 25, avatarInitial: "L", clubId: "club-nord", level: "intermediate", goal: "muscle_gain", partnerType: "regular", createdAt: "2026-01-12" },
      { id: "emma", username: "Emma R.", email: "emma@example.com", age: 29, avatarInitial: "E", clubId: "club-nord", level: "intermediate", goal: "general_fitness", partnerType: "occasional", createdAt: "2026-01-15" },
      { id: "yanis", username: "Yanis K.", email: "yanis@example.com", age: 31, avatarInitial: "Y", clubId: "club-nord", level: "advanced", goal: "performance", partnerType: "regular", createdAt: "2026-01-18" },
      { id: "sarah", username: "Sarah D.", email: "sarah@example.com", age: 24, avatarInitial: "S", clubId: "club-centre", level: "advanced", goal: "weight_loss", partnerType: "occasional", createdAt: "2026-01-20" },
    ],
    trainingPreferences: [
      { id: "tp1", userId: "thomas", activity: "musculation" },
      { id: "tp2", userId: "thomas", activity: "cardio" },
      { id: "tp3", userId: "lucas", activity: "musculation" },
      { id: "tp4", userId: "lucas", activity: "crossfit" },
      { id: "tp5", userId: "emma", activity: "cardio" },
      { id: "tp6", userId: "emma", activity: "musculation" },
      { id: "tp7", userId: "yanis", activity: "musculation" },
      { id: "tp8", userId: "sarah", activity: "cardio" },
      { id: "tp9", userId: "sarah", activity: "yoga" },
    ],
    availabilities: [
      { id: "av1", userId: "thomas", day: 0, startTime: "18:00", endTime: "20:00" },
      { id: "av2", userId: "thomas", day: 2, startTime: "07:00", endTime: "08:30" },
      { id: "av3", userId: "lucas", day: 0, startTime: "19:00", endTime: "21:00" },
      { id: "av4", userId: "emma", day: 2, startTime: "07:00", endTime: "08:00" },
      { id: "av5", userId: "yanis", day: 0, startTime: "19:00", endTime: "21:00" },
      { id: "av6", userId: "sarah", day: 3, startTime: "12:00", endTime: "13:00" },
    ],
    buddyRequests: [
      { id: "br1", senderId: "thomas", receiverId: "emma", status: "pending", createdAt: "2026-08-01" },
    ],
    sessions: [
      { id: "ts1", creatorId: "thomas", buddyId: "lucas", clubId: "club-nord", date: "2026-08-11", startTime: "18:00", duration: 60, type: "musculation", status: "planned" },
    ],
    idCounter: 100,
  };
}

const db: Store = globalThis.__buddyStore ?? (globalThis.__buddyStore = createInitialStore());

const nextId = (prefix: string) => `${prefix}-${db.idCounter++}`;

// ─── Lecture ─────────────────────────────────────────────────────────

export function getClubs(): Club[] {
  return db.clubs;
}

export function getClub(id: string): Club | undefined {
  return db.clubs.find((c) => c.id === id);
}

export function getUser(id: string): User | undefined {
  return db.users.find((u) => u.id === id);
}

export function toFullProfile(user: User): FullProfile {
  return {
    ...user,
    activities: db.trainingPreferences
      .filter((tp) => tp.userId === user.id)
      .map((tp) => tp.activity),
    availabilities: db.availabilities.filter((a) => a.userId === user.id),
  };
}

export function getFullProfile(id: string): FullProfile | undefined {
  const user = getUser(id);
  return user ? toFullProfile(user) : undefined;
}

export function getAllFullProfiles(): FullProfile[] {
  return db.users.map(toFullProfile);
}

export function getBuddyRequestsFor(userId: string) {
  return {
    sent: db.buddyRequests.filter((r) => r.senderId === userId),
    received: db.buddyRequests.filter((r) => r.receiverId === userId),
  };
}

export function getAcceptedBuddyIds(userId: string): string[] {
  return db.buddyRequests
    .filter(
      (r) =>
        r.status === "accepted" &&
        (r.senderId === userId || r.receiverId === userId)
    )
    .map((r) => (r.senderId === userId ? r.receiverId : r.senderId));
}

export function getSessionsFor(userId: string): TrainingSession[] {
  return db.sessions.filter((s) => s.creatorId === userId || s.buddyId === userId);
}

export function findExistingRequest(userIdA: string, userIdB: string) {
  return db.buddyRequests.find(
    (r) =>
      (r.senderId === userIdA && r.receiverId === userIdB) ||
      (r.senderId === userIdB && r.receiverId === userIdA)
  );
}

// ─── Écriture ────────────────────────────────────────────────────────

export interface CreateProfileInput {
  username: string;
  email: string;
  age: number;
  clubId: string;
  level: User["level"];
  goal: User["goal"];
  partnerType: User["partnerType"];
  activities: string[];
  availabilities: { day: number; startTime: string; endTime: string }[];
}

export function createProfile(input: CreateProfileInput): User {
  const id = nextId("user");
  const user: User = {
    id,
    username: input.username,
    email: input.email,
    age: input.age,
    avatarInitial: input.username.trim().charAt(0).toUpperCase() || "?",
    clubId: input.clubId,
    level: input.level,
    goal: input.goal,
    partnerType: input.partnerType,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  db.users.push(user);

  for (const activity of input.activities) {
    db.trainingPreferences.push({ id: nextId("tp"), userId: id, activity });
  }
  for (const a of input.availabilities) {
    db.availabilities.push({ id: nextId("av"), userId: id, ...a });
  }

  return user;
}

export function createBuddyRequest(senderId: string, receiverId: string): BuddyRequest {
  const existing = findExistingRequest(senderId, receiverId);
  if (existing) return existing;
  const request: BuddyRequest = {
    id: nextId("br"),
    senderId,
    receiverId,
    status: "pending",
    createdAt: new Date().toISOString().slice(0, 10),
  };
  db.buddyRequests.push(request);
  return request;
}

export function updateBuddyRequestStatus(
  id: string,
  status: BuddyRequest["status"]
): BuddyRequest | undefined {
  const request = db.buddyRequests.find((r) => r.id === id);
  if (request) request.status = status;
  return request;
}

export function createSession(input: Omit<TrainingSession, "id" | "status">): TrainingSession {
  const session: TrainingSession = { ...input, id: nextId("ts"), status: "planned" };
  db.sessions.push(session);
  return session;
}

// NOTE — pourquoi pas de vraie base de données ici :
// le cahier des charges vise PostgreSQL + Prisma. Prisma télécharge ses
// binaires (query engine) depuis binaries.prisma.sh au moment de
// `npm install`, un domaine hors de la liste blanche réseau de ce
// sandbox — l'install échoue donc ici. Ce fichier reproduit exactement
// les mêmes entités/champs que le schéma du cahier des charges
// (section 8), donc migrer vers Prisma + Postgres revient à réécrire
// ces fonctions en requêtes prisma.client, sans toucher au reste de
// l'app (types, API routes, composants).
