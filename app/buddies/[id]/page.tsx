import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import MatchDial from "@/components/MatchDial";
import { getCurrentUserId } from "@/lib/session";
import { getFullProfile, getClub, findExistingRequest } from "@/lib/data";
import { computeMatchScore } from "@/lib/matching";
import { sendInvite } from "./actions";

const BREAKDOWN_LABELS: Record<string, string> = {
  club: "Même club",
  schedule: "Horaires compatibles",
  goal: "Objectif similaire",
  activities: "Activités communes",
  level: "Niveau proche",
};
const BREAKDOWN_WEIGHTS: Record<string, number> = {
  club: 30, schedule: 25, goal: 20, activities: 15, level: 10,
};

export default async function BuddyProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = await getCurrentUserId();
  const me = getFullProfile(userId);
  const buddy = getFullProfile(id);

  if (!me || !buddy) notFound();

  const club = getClub(buddy.clubId);
  const { score, breakdown } = computeMatchScore(me, buddy);
  const existing = findExistingRequest(userId, id);

  return (
    <div>
      <NavBar currentUserId={userId} />
      <main className="mx-auto max-w-3xl px-6 py-14">
        <Link href="/buddies" className="font-mono text-xs text-text-faint hover:text-text-muted">← Tous les Buddies</Link>

        <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-10 items-start">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-dim to-bg-elevated-2 font-display text-2xl">
                {buddy.avatarInitial}
              </div>
              <div>
                <h1 className="font-display text-3xl">{buddy.username}</h1>
                <p className="text-text-muted text-sm">{club?.name}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {buddy.activities.map((a) => (
                <span key={a} className="rounded-full border border-border-hair px-3 py-1.5 text-xs text-text-muted capitalize">{a}</span>
              ))}
            </div>

            {userId === id ? (
              <p className="font-mono text-xs text-text-faint">C&apos;est ton propre profil.</p>
            ) : existing ? (
              <span className={`inline-block rounded-full px-4 py-2 font-mono text-xs ${
                existing.status === "accepted" ? "bg-accent/10 text-accent-bright border border-accent/30" : "border border-border-hair text-text-muted"
              }`}>
                {existing.status === "pending" ? "Invitation en attente" : existing.status === "accepted" ? "Vous êtes Buddies ✓" : "Invitation refusée"}
              </span>
            ) : (
              <form action={sendInvite.bind(null, id)}>
                <button type="submit" className="rounded bg-accent px-5 py-2.5 font-bold text-sm hover:bg-accent-bright transition-colors">
                  Envoyer une invitation →
                </button>
              </form>
            )}
          </div>

          <div className="rounded-md border border-border-hair bg-bg-elevated p-6 w-full md:w-[260px]">
            <MatchDial score={score} />
            <div className="flex flex-col gap-2 border-t border-border-hair pt-4 mt-5 text-xs">
              {Object.entries(breakdown).map(([key, value]) => (
                <div key={key} className="flex justify-between text-text-muted">
                  <span>{BREAKDOWN_LABELS[key]}</span>
                  <span className="font-mono text-accent-bright">
                    {Math.round((value / 100) * BREAKDOWN_WEIGHTS[key])}/{BREAKDOWN_WEIGHTS[key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
