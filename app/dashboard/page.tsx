import Link from "next/link";
import NavBar from "@/components/NavBar";
import MatchDial from "@/components/MatchDial";
import { getCurrentUserId } from "@/lib/session";
import { getFullProfile, getAllFullProfiles, getSessionsFor, getBuddyRequestsFor, getClub, getUser } from "@/lib/data";
import { findBestMatches } from "@/lib/matching";

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  const profile = getFullProfile(userId)!;
  const club = getClub(profile.clubId);

  const candidates = getAllFullProfiles();
  const matches = findBestMatches(profile, candidates).slice(0, 1);
  const topMatch = matches[0] ? { ...matches[0], user: getUser(matches[0].userId)! } : null;

  const sessions = getSessionsFor(userId);
  const nextSession = sessions.find((s) => s.status === "planned");
  const { received } = getBuddyRequestsFor(userId);
  const pendingReceived = received.filter((r) => r.status === "pending");

  const DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

  return (
    <div>
      <NavBar currentUserId={userId} />
      <main className="mx-auto max-w-6xl px-6 py-14">
        <p className="font-mono text-xs text-text-faint mb-1">SALUT {profile.username.toUpperCase()}</p>
        <h1 className="font-display text-4xl mb-10">{club?.name}</h1>

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          <Card title="PROCHAINE SÉANCE">
            {nextSession ? (
              <>
                <p className="font-display text-xl mb-1">{DAYS[new Date(nextSession.date).getDay() === 0 ? 6 : new Date(nextSession.date).getDay() - 1]}</p>
                <p className="text-text-muted text-sm mb-3">{nextSession.date} · {nextSession.startTime}</p>
                <p className="font-mono text-xs text-accent-bright">avec {getUser(nextSession.buddyId === userId ? nextSession.creatorId : nextSession.buddyId)?.username}</p>
              </>
            ) : (
              <>
                <p className="text-text-muted text-sm mb-4">Aucune séance programmée.</p>
                <Link href="/buddies" className="font-mono text-xs text-accent-bright hover:underline">Trouver un Buddy →</Link>
              </>
            )}
          </Card>

          <Card title="INVITATIONS EN ATTENTE">
            <p className="font-display text-4xl mb-1">{pendingReceived.length}</p>
            <p className="text-text-muted text-sm mb-3">demande{pendingReceived.length !== 1 ? "s" : ""} reçue{pendingReceived.length !== 1 ? "s" : ""}</p>
            <Link href="/invitations" className="font-mono text-xs text-accent-bright hover:underline">Voir →</Link>
          </Card>

          <Card title="MEILLEUR MATCH">
            {topMatch ? (
              <div className="flex items-center gap-4">
                <MatchDial score={topMatch.score} size={64} />
                <div>
                  <p className="font-display text-base">{topMatch.user.username}</p>
                  <Link href={`/buddies/${topMatch.user.id}`} className="font-mono text-xs text-accent-bright hover:underline">Voir profil →</Link>
                </div>
              </div>
            ) : (
              <p className="text-text-muted text-sm">Complète ton profil pour voir tes matchs.</p>
            )}
          </Card>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/buddies" className="rounded bg-accent px-5 py-2.5 font-bold text-sm hover:bg-accent-bright transition-colors">
            FIND A BUDDY →
          </Link>
          <Link href="/sessions" className="rounded border border-border-hair px-5 py-2.5 text-sm hover:border-text-muted transition-colors">
            Mes séances
          </Link>
        </div>
      </main>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border-hair bg-bg-elevated p-6">
      <p className="font-mono text-[11px] text-text-faint tracking-wide mb-4">{title}</p>
      {children}
    </div>
  );
}
