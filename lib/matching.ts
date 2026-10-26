import { FullProfile, Level, Availability } from "./types";

// Poids définis dans le cahier des charges (section 5) :
// club 30% / horaires 25% / objectif 20% / activités 15% / niveau 10%
const WEIGHTS = {
  club: 0.3,
  schedule: 0.25,
  goal: 0.2,
  activities: 0.15,
  level: 0.1,
};

const LEVEL_ORDER: Level[] = ["beginner", "intermediate", "advanced"];

export interface MatchBreakdown {
  club: number;
  schedule: number;
  goal: number;
  activities: number;
  level: number;
}

export interface MatchResult {
  score: number;
  breakdown: MatchBreakdown;
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function scoreClub(a: FullProfile, b: FullProfile): number {
  return a.clubId === b.clubId ? 100 : 0;
}

function scoreLevel(a: FullProfile, b: FullProfile): number {
  const distance = Math.abs(
    LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level)
  );
  const maxDistance = LEVEL_ORDER.length - 1;
  return 100 - (distance / maxDistance) * 100;
}

function scoreGoal(a: FullProfile, b: FullProfile): number {
  return a.goal === b.goal ? 100 : 0;
}

function scoreActivities(a: FullProfile, b: FullProfile): number {
  const setA = new Set(a.activities);
  const setB = new Set(b.activities);
  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  if (union === 0) return 0;
  return (intersection / union) * 100;
}

function overlapMinutes(slotA: Availability, slotB: Availability): number {
  if (slotA.day !== slotB.day) return 0;
  const startA = timeToMinutes(slotA.startTime);
  const endA = timeToMinutes(slotA.endTime);
  const startB = timeToMinutes(slotB.startTime);
  const endB = timeToMinutes(slotB.endTime);
  const overlapStart = Math.max(startA, startB);
  const overlapEnd = Math.min(endA, endB);
  return Math.max(0, overlapEnd - overlapStart);
}

function totalMinutes(slots: Availability[]): number {
  return slots.reduce(
    (sum, s) => sum + (timeToMinutes(s.endTime) - timeToMinutes(s.startTime)),
    0
  );
}

function scoreSchedule(a: FullProfile, b: FullProfile): number {
  let totalOverlap = 0;
  for (const slotA of a.availabilities) {
    for (const slotB of b.availabilities) {
      totalOverlap += overlapMinutes(slotA, slotB);
    }
  }
  const reference = Math.min(
    totalMinutes(a.availabilities),
    totalMinutes(b.availabilities)
  );
  if (reference === 0) return 0;
  return Math.min(100, (totalOverlap / reference) * 100);
}

export function computeMatchScore(a: FullProfile, b: FullProfile): MatchResult {
  const breakdown: MatchBreakdown = {
    club: scoreClub(a, b),
    schedule: scoreSchedule(a, b),
    goal: scoreGoal(a, b),
    activities: scoreActivities(a, b),
    level: scoreLevel(a, b),
  };

  const score =
    breakdown.club * WEIGHTS.club +
    breakdown.schedule * WEIGHTS.schedule +
    breakdown.goal * WEIGHTS.goal +
    breakdown.activities * WEIGHTS.activities +
    breakdown.level * WEIGHTS.level;

  return { score: Math.round(score), breakdown };
}

export function findBestMatches(
  target: FullProfile,
  candidates: FullProfile[],
  minScore = 0
): (MatchResult & { userId: string })[] {
  return candidates
    .filter((c) => c.id !== target.id)
    .map((c) => ({ userId: c.id, ...computeMatchScore(target, c) }))
    .filter((r) => r.score >= minScore)
    .sort((a, b) => b.score - a.score);
}
