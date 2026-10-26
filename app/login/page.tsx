import { getAllFullProfiles, getClub } from "@/lib/data";
import { getCurrentUserId } from "@/lib/session";
import { selectUser } from "./actions";
import Link from "next/link";

export default async function LoginPage() {
  const profiles = getAllFullProfiles();
  const currentId = await getCurrentUserId();

  return (
    <main className="mx-auto max-w-xl px-6 py-20">
      <Link href="/" className="font-mono text-xs text-text-faint hover:text-text-muted">
        ← Retour à l&apos;accueil
      </Link>

      <h1 className="font-display text-3xl mt-6 mb-2">Choisis ton profil</h1>
      <p className="text-text-muted text-sm mb-10">
        Prototype de démo — pas de mot de passe, l&apos;authentification réelle (Auth.js) remplacerait cet écran.
      </p>

      <div className="flex flex-col gap-3">
        {profiles.map((p) => {
          const club = getClub(p.clubId);
          const isCurrent = p.id === currentId;
          return (
            <form action={selectUser} key={p.id}>
              <input type="hidden" name="userId" value={p.id} />
              <button
                type="submit"
                className={`w-full flex items-center justify-between rounded border px-5 py-4 text-left transition-colors ${
                  isCurrent
                    ? "border-accent bg-bg-elevated"
                    : "border-border-hair bg-bg-elevated hover:border-text-muted"
                }`}
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-dim to-bg-elevated-2 font-display text-sm">
                    {p.avatarInitial}
                  </span>
                  <span>
                    <span className="block font-display text-sm">{p.username}</span>
                    <span className="block font-mono text-[11px] text-text-faint">{club?.name}</span>
                  </span>
                </span>
                {isCurrent && <span className="font-mono text-[10px] text-accent">ACTUEL</span>}
              </button>
            </form>
          );
        })}
      </div>

      <Link
        href="/onboarding"
        className="mt-6 block text-center rounded border border-dashed border-border-hair px-5 py-4 font-mono text-xs text-text-faint hover:border-text-muted hover:text-text-muted transition-colors"
      >
        + Créer un nouveau profil
      </Link>
    </main>
  );
}
