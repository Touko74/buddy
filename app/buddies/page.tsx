import Link from "next/link";
import NavBar from "@/components/NavBar";
import { getCurrentUserId } from "@/lib/session";
import { getFullProfile, getAllFullProfiles, getUser, getClub } from "@/lib/data";
import { findBestMatches } from "@/lib/matching";

export default async function BuddiesPage() {
  const userId = await getCurrentUserId();
  const profile = getFullProfile(userId)!;
  const matches = findBestMatches(profile, getAllFullProfiles());

  return (
    <div>
      <NavBar currentUserId={userId} />
      <main className="mx-auto max-w-6xl px-6 py-14">
        <p className="font-mono text-xs text-accent tracking-widest mb-3">MATCHING</p>
        <h1 className="font-display text-4xl mb-2">Tes Buddies compatibles</h1>
        <p className="text-text-muted text-sm mb-10">{matches.length} profil{matches.length !== 1 ? "s" : ""} classé{matches.length !== 1 ? "s" : ""} par score.</p>

        {matches.length === 0 && (
          <p className="text-text-muted text-sm">Aucun autre profil pour l&apos;instant.</p>
        )}

        <div className="grid md:grid-cols-3 gap-5">
          {matches.map((m) => {
            const u = getUser(m.userId)!;
            const club = getClub(u.clubId);
            return (
              <Link
                key={m.userId}
                href={`/buddies/${m.userId}`}
                className="rounded-md border border-border-hair bg-bg-elevated p-5 hover:border-accent-dim hover:-translate-y-1 transition-all block"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent-dim to-bg-elevated-2 font-display text-base">
                    {u.avatarInitial}
                  </div>
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[13px] font-bold text-accent-bright">
                    {m.score}%
                  </span>
                </div>
                <h4 className="font-display text-[17px] mb-1">{u.username}</h4>
                <p className="text-xs text-text-faint mb-3.5">{levelLabel(u.level)} · {club?.name}</p>
                <p className="text-xs text-text-muted">{goalLabel(u.goal)}</p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function levelLabel(l: string) {
  return { beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé" }[l] ?? l;
}
function goalLabel(g: string) {
  return {
    muscle_gain: "Prise de masse",
    weight_loss: "Perte de poids",
    endurance: "Endurance",
    general_fitness: "Forme générale",
    performance: "Performance",
  }[g] ?? g;
}
