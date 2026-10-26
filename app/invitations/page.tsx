import Link from "next/link";
import NavBar from "@/components/NavBar";
import { getCurrentUserId } from "@/lib/session";
import { getBuddyRequestsFor, getUser } from "@/lib/data";
import { respondToInvite } from "./actions";

const STATUS_LABEL: Record<string, string> = {
  pending: "En attente",
  accepted: "Acceptée",
  declined: "Refusée",
};

export default async function InvitationsPage() {
  const userId = await getCurrentUserId();
  const { sent, received } = getBuddyRequestsFor(userId);

  return (
    <div>
      <NavBar currentUserId={userId} />
      <main className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="font-display text-4xl mb-10">Invitations</h1>

        <section className="mb-12">
          <p className="font-mono text-xs text-text-faint tracking-wide mb-4">REÇUES</p>
          {received.length === 0 && <p className="text-text-muted text-sm">Aucune invitation reçue.</p>}
          <div className="flex flex-col gap-3">
            {received.map((r) => {
              const from = getUser(r.senderId)!;
              return (
                <div key={r.id} className="flex items-center justify-between rounded border border-border-hair bg-bg-elevated p-4">
                  <div>
                    <Link href={`/buddies/${from.id}`} className="font-display text-sm hover:text-accent-bright">{from.username}</Link>
                    <p className="font-mono text-[11px] text-text-faint">{r.createdAt}</p>
                  </div>
                  {r.status === "pending" ? (
                    <div className="flex gap-2">
                      <form action={respondToInvite.bind(null, r.id, "accepted")}>
                        <button className="rounded bg-accent px-3.5 py-2 text-xs font-bold hover:bg-accent-bright transition-colors">Accepter</button>
                      </form>
                      <form action={respondToInvite.bind(null, r.id, "declined")}>
                        <button className="rounded border border-border-hair px-3.5 py-2 text-xs text-text-muted hover:border-text-muted transition-colors">Refuser</button>
                      </form>
                    </div>
                  ) : (
                    <StatusPill status={r.status} />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <p className="font-mono text-xs text-text-faint tracking-wide mb-4">ENVOYÉES</p>
          {sent.length === 0 && <p className="text-text-muted text-sm">Aucune invitation envoyée.</p>}
          <div className="flex flex-col gap-3">
            {sent.map((r) => {
              const to = getUser(r.receiverId)!;
              return (
                <div key={r.id} className="flex items-center justify-between rounded border border-border-hair bg-bg-elevated p-4">
                  <div>
                    <Link href={`/buddies/${to.id}`} className="font-display text-sm hover:text-accent-bright">{to.username}</Link>
                    <p className="font-mono text-[11px] text-text-faint">{r.createdAt}</p>
                  </div>
                  <StatusPill status={r.status} />
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <span className={`rounded-full px-3 py-1.5 font-mono text-[11px] ${
      status === "accepted" ? "bg-accent/10 text-accent-bright border border-accent/30" : "border border-border-hair text-text-muted"
    }`}>
      {STATUS_LABEL[status]}
    </span>
  );
}
