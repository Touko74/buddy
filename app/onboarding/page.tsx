"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CLUBS = [
  { id: "club-nord", name: "Club Nord" },
  { id: "club-centre", name: "Club Centre" },
  { id: "club-sud", name: "Club Sud" },
];

const ACTIVITIES = ["musculation", "cardio", "crossfit", "yoga", "boxe", "course"];
const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

interface Slot {
  day: number;
  startTime: string;
  endTime: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(25);
  const [clubId, setClubId] = useState(CLUBS[0].id);
  const [level, setLevel] = useState("intermediate");
  const [goal, setGoal] = useState("muscle_gain");
  const [partnerType, setPartnerType] = useState("regular");
  const [activities, setActivities] = useState<string[]>([]);
  const [slots, setSlots] = useState<Slot[]>([{ day: 0, startTime: "18:00", endTime: "20:00" }]);

  const toggleActivity = (a: string) => {
    setActivities((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  };

  const updateSlot = (i: number, patch: Partial<Slot>) => {
    setSlots((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  };

  const addSlot = () => setSlots((prev) => [...prev, { day: 0, startTime: "18:00", endTime: "20:00" }]);
  const removeSlot = (i: number) => setSlots((prev) => prev.filter((_, idx) => idx !== i));

  const canContinueStep1 = username.trim().length > 1 && email.includes("@");
  const canContinueStep2 = activities.length > 0;
  const canSubmit = slots.length > 0;

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          age,
          clubId,
          level,
          goal,
          partnerType,
          activities,
          availabilities: slots,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur inconnue");
      }
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <Link href="/" className="font-mono text-xs text-text-faint hover:text-text-muted">← Retour</Link>

      <div className="flex gap-2 mt-6 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? "bg-accent" : "bg-border-hair"}`} />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h1 className="font-display text-3xl mb-1">Ton profil</h1>
          <p className="text-text-muted text-sm mb-8">Les infos de base pour te retrouver dans ton club.</p>

          <div className="flex flex-col gap-4">
            <Field label="Nom affiché">
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Thomas B." className={inputClass} />
            </Field>
            <Field label="Email">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="thomas@example.com" className={inputClass} />
            </Field>
            <Field label="Âge">
              <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className={inputClass} />
            </Field>
            <Field label="Club">
              <select value={clubId} onChange={(e) => setClubId(e.target.value)} className={inputClass}>
                {CLUBS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
          </div>

          <button disabled={!canContinueStep1} onClick={() => setStep(2)} className={btnClass}>Continuer →</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="font-display text-3xl mb-1">Tes habitudes</h1>
          <p className="text-text-muted text-sm mb-8">Ça sert directement au calcul de compatibilité.</p>

          <div className="flex flex-col gap-4 mb-6">
            <Field label="Niveau">
              <select value={level} onChange={(e) => setLevel(e.target.value)} className={inputClass}>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </select>
            </Field>
            <Field label="Objectif">
              <select value={goal} onChange={(e) => setGoal(e.target.value)} className={inputClass}>
                <option value="muscle_gain">Prise de masse</option>
                <option value="weight_loss">Perte de poids</option>
                <option value="endurance">Endurance</option>
                <option value="general_fitness">Forme générale</option>
                <option value="performance">Performance</option>
              </select>
            </Field>
            <Field label="Type de partenaire recherché">
              <select value={partnerType} onChange={(e) => setPartnerType(e.target.value)} className={inputClass}>
                <option value="regular">Régulier</option>
                <option value="occasional">Occasionnel</option>
              </select>
            </Field>
          </div>

          <p className="text-xs text-text-faint mb-2.5 font-mono tracking-wide">ACTIVITÉS</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {ACTIVITIES.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => toggleActivity(a)}
                className={`rounded-full border px-3.5 py-2 text-sm capitalize transition-colors ${
                  activities.includes(a)
                    ? "border-accent bg-accent/10 text-accent-bright"
                    : "border-border-hair text-text-muted hover:border-text-muted"
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className={btnGhostClass}>← Retour</button>
            <button disabled={!canContinueStep2} onClick={() => setStep(3)} className={btnClass}>Continuer →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className="font-display text-3xl mb-1">Tes disponibilités</h1>
          <p className="text-text-muted text-sm mb-8">Utilisées pour calculer les créneaux communs avec tes Buddies.</p>

          <div className="flex flex-col gap-3 mb-4">
            {slots.map((s, i) => (
              <div key={i} className="flex items-center gap-2 rounded border border-border-hair bg-bg-elevated p-3">
                <select value={s.day} onChange={(e) => updateSlot(i, { day: Number(e.target.value) })} className={inputClass}>
                  {DAYS.map((d, idx) => <option key={d} value={idx}>{d}</option>)}
                </select>
                <input type="time" value={s.startTime} onChange={(e) => updateSlot(i, { startTime: e.target.value })} className={inputClass} />
                <span className="text-text-faint">–</span>
                <input type="time" value={s.endTime} onChange={(e) => updateSlot(i, { endTime: e.target.value })} className={inputClass} />
                {slots.length > 1 && (
                  <button onClick={() => removeSlot(i)} className="text-text-faint hover:text-accent px-2">✕</button>
                )}
              </div>
            ))}
          </div>
          <button onClick={addSlot} className="font-mono text-xs text-accent-bright hover:underline mb-8">+ Ajouter un créneau</button>

          {error && <p className="text-accent-bright text-sm mb-4">{error}</p>}

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className={btnGhostClass}>← Retour</button>
            <button disabled={!canSubmit || submitting} onClick={handleSubmit} className={btnClass}>
              {submitting ? "Création..." : "Créer mon profil →"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-xs text-text-faint tracking-wide">{label.toUpperCase()}</span>
      {children}
    </label>
  );
}

const inputClass =
  "rounded border border-border-hair bg-bg-elevated px-3.5 py-2.5 text-sm text-text-primary outline-none focus:border-accent transition-colors";
const btnClass =
  "mt-8 rounded bg-accent px-5 py-2.5 font-bold text-sm hover:bg-accent-bright transition-colors disabled:opacity-30 disabled:cursor-not-allowed";
const btnGhostClass =
  "mt-8 rounded border border-border-hair px-5 py-2.5 text-sm hover:border-text-muted transition-colors";
