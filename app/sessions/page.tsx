import NavBar from "@/components/NavBar";
import { getCurrentUserId } from "@/lib/session";
import { getSessionsFor, getUser, getAcceptedBuddyIds } from "@/lib/data";
import { planSession } from "./actions";

export default async function SessionsPage() {
  const userId = await getCurrentUserId();
  const sessions = getSessionsFor(userId).sort((a, b) => a.date.localeCompare(b.date));
  const buddyIds = getAcceptedBuddyIds(userId);

  return (
    <div>
      <NavBar currentUserId={userId} />
      <main className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="font-display text-4xl mb-10">Tes séances</h1>

        <div className="flex flex-col gap-3 mb-14">
          {sessions.length === 0 && <p className="text-text-muted text-sm">Aucune séance programmée pour l&apos;instant.</p>}
          {sessions.map((s) => {
            const partnerId = s.creatorId === userId ? s.buddyId : s.creatorId;
            const partner = getUser(partnerId);
            return (
              <div key={s.id} className="flex items-center justify-between rounded border border-border-hair bg-bg-elevated p-4">
                <div>
                  <p className="font-display text-sm capitalize">{s.type} avec {partner?.username}</p>
                  <p className="font-mono text-[11px] text-text-faint">{s.date} · {s.startTime} · {s.duration} min</p>
                </div>
                <span className={`rounded-full px-3 py-1.5 font-mono text-[11px] ${
                  s.status === "planned" ? "bg-accent/10 text-accent-bright border border-accent/30" : "border border-border-hair text-text-muted"
                }`}>
                  {s.status === "planned" ? "Programmée" : s.status === "done" ? "Terminée" : "Annulée"}
                </span>
              </div>
            );
          })}
        </div>

        {buddyIds.length > 0 ? (
          <div className="rounded-md border border-border-hair bg-bg-elevated p-6">
            <p className="font-mono text-xs text-text-faint tracking-wide mb-5">PROGRAMMER UNE SÉANCE</p>
            <form action={planSession} className="grid md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-text-faint">BUDDY</span>
                <select name="buddyId" required className={inputClass}>
                  {buddyIds.map((id) => (
                    <option key={id} value={id}>{getUser(id)?.username}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-text-faint">TYPE</span>
                <input name="type" defaultValue="musculation" required className={inputClass} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-text-faint">DATE</span>
                <input type="date" name="date" required className={inputClass} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-text-faint">HEURE</span>
                <input type="time" name="startTime" required className={inputClass} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-text-faint">DURÉE (MIN)</span>
                <input type="number" name="duration" defaultValue={60} required className={inputClass} />
              </label>
              <button type="submit" className="self-end rounded bg-accent px-5 py-2.5 font-bold text-sm hover:bg-accent-bright transition-colors">
                Programmer →
              </button>
            </form>
          </div>
        ) : (
          <p className="text-text-muted text-sm">Accepte d&apos;abord une invitation pour pouvoir programmer une séance avec un Buddy.</p>
        )}
      </main>
    </div>
  );
}

const inputClass = "rounded border border-border-hair bg-bg-base px-3.5 py-2.5 text-sm outline-none focus:border-accent transition-colors";
