"use client";

import { useState } from "react";
import Link from "next/link";

type Buddy = {
  name: string;
  meta: string;
  score: number;
  goal: string;
  tags: string[];
};

const buddies: Buddy[] = [
  { name: "Lucas M.", meta: "Intermédiaire · Club Nord", score: 94, goal: "Prise de masse", tags: ["Musculation", "Crossfit", "Lun 18h-20h"] },
  { name: "Emma R.", meta: "Intermédiaire · Club Nord", score: 81, goal: "Remise en forme", tags: ["Cardio", "Musculation", "Mer 07h-08h"] },
  { name: "Yanis K.", meta: "Avancé · Club Nord", score: 76, goal: "Performance", tags: ["Musculation", "Lun 19h-21h"] },
];

const goals = ["Tous", "Prise de masse", "Remise en forme", "Performance"];

export default function BuddyList() {
  const [goal, setGoal] = useState("Tous");
  const [invited, setInvited] = useState<string[]>([]);

  const list = buddies.filter((b) => goal === "Tous" || b.goal === goal);

  const toggleInvite = (name: string) =>
    setInvited((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filtrer par objectif">
        {goals.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGoal(g)}
            aria-pressed={goal === g}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              goal === g
                ? "border-accent bg-accent text-on-accent"
                : "border-border-hair text-text-muted hover:border-text-muted"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {list.map((b) => {
          const sent = invited.includes(b.name);
          return (
            <div
              key={b.name}
              className="flex flex-col rounded-carte border border-border-hair bg-bg-elevated p-6 hover:border-accent-dim hover:-translate-y-1 transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-elevated-2 font-display text-base">
                  {b.name[0]}
                </div>
                <span className="rounded-full bg-lime px-3.5 py-1.5 font-display text-2xl leading-none text-accent">
                  {b.score}%
                </span>
              </div>
              <h4 className="font-display text-[17px] mb-1">{b.name}</h4>
              <p className="text-xs text-text-faint mb-3.5">{b.meta}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {b.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border-hair px-2.5 py-1 text-[11px] text-text-muted">
                    {t}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => toggleInvite(b.name)}
                aria-pressed={sent}
                className={`mt-auto rounded-full border px-4 py-2 text-center text-sm font-semibold transition-colors ${
                  sent
                    ? "border-lime bg-lime text-accent"
                    : "border-accent text-accent hover:bg-accent hover:text-on-accent"
                }`}
              >
                {sent ? "Invitation envoyée ✓" : "Inviter →"}
              </button>
            </div>
          );
        })}
      </div>

      {invited.length > 0 && (
        <p className="mt-8 text-sm text-text-muted">
          C&apos;est une démo.{" "}
          <Link href="/login" className="font-semibold text-accent underline underline-offset-4">
            Crée ton profil pour envoyer de vraies invitations →
          </Link>
        </p>
      )}
    </>
  );
}