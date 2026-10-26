import Link from "next/link";
import MatchDial from "@/components/MatchDial";

const buddyPreview = [
  { name: "Lucas M.", meta: "Intermédiaire · Club Nord", score: 94, tags: ["Musculation", "Crossfit", "Lun 18h-20h"] },
  { name: "Emma R.", meta: "Intermédiaire · Club Nord", score: 81, tags: ["Cardio", "Musculation", "Mer 07h-08h"] },
  { name: "Yanis K.", meta: "Avancé · Club Nord", score: 76, tags: ["Musculation", "Lun 19h-21h"] },
];

const btnPrimary =
  "rounded-full bg-accent px-6 py-3 font-semibold text-sm text-on-accent hover:bg-accent-bright transition-colors";

export default function LandingPage() {
  return (
    <main>
      <nav className="sticky top-0 z-50 border-b border-border-hair bg-bg-base/90 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6">
          <div className="font-display text-xl flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime font-display text-sm text-accent">
              B
            </span>
            Buddy
          </div>
          <div className="hidden gap-9 text-sm text-text-muted md:flex">
            <a href="#buddies" className="hover:text-text-primary transition-colors">Buddies</a>
          </div>
          <Link href="/login" className={btnPrimary}>
            Rejoindre →
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <div className="font-mono text-xs text-accent-bright tracking-widest mb-5 flex items-center gap-2 before:content-[''] before:w-5 before:h-px before:bg-accent-bright">
            PROTOTYPE
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.08] mb-6 text-balance">
            Ton partenaire d&apos;entraînement,{" "}
            <span className="box-decoration-clone rounded-lg bg-lime px-2 text-accent">
              pas ton âme sœur.
            </span>
          </h1>
          <p className="text-text-muted max-w-md mb-8">
            Un partenaire compatible dans ton club, en quelques minutes. Même objectif, mêmes horaires, même énergie.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <Link href="/login" className={btnPrimary}>
              Trouver mon Buddy →
            </Link>
            <span className="font-mono text-xs text-text-faint">DONNÉES DE DÉMO</span>
          </div>
        </div>

        <div className="relative rounded-carte border border-border-hair bg-bg-elevated p-7 shadow-[0_8px_30px_rgba(18,55,42,0.08)]">
          <div className="absolute -top-4 -right-3.5 flex h-[76px] w-[76px] rotate-[11deg] items-center justify-center rounded-full bg-lime text-center font-mono text-[9px] font-medium leading-tight text-accent">
            MATCH<br />TROUVÉ
          </div>
          <div className="flex justify-between mb-5 font-mono text-[11px] text-text-faint">
            <span>MATCH_ID · #0094</span>
            <span>CLUB NORD</span>
          </div>
          <MatchDial score={94} />
          <div className="text-center font-display text-xl mt-4 mb-1">Thomas × Lucas</div>
          <div className="text-center text-sm text-text-muted mb-5">Prise de masse · Intermédiaire</div>
          <div className="flex flex-col gap-2 border-t border-border-hair pt-4 text-xs text-text-muted">
            {[["Même club", "30/30"], ["Horaires compatibles", "23/25"], ["Objectif similaire", "20/20"], ["Activités communes", "11/15"], ["Niveau proche", "10/10"]].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span>{k}</span>
                <span className="font-mono text-accent-bright">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="buddies" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="max-w-xl mb-10">
          <h2 className="font-display text-4xl mb-3">Tes Buddies compatibles</h2>
          <p className="text-text-muted text-sm">Classés par score dans ton club.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {buddyPreview.map((b) => (
            <div key={b.name} className="flex flex-col rounded-carte border border-border-hair bg-bg-elevated p-6 hover:border-accent-dim hover:-translate-y-1 transition-all">
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
                  <span key={t} className="rounded-full border border-border-hair px-2.5 py-1 text-[11px] text-text-muted">{t}</span>
                ))}
              </div>
              <Link href="/login" className="mt-auto rounded-full border border-accent px-4 py-2 text-center text-sm font-semibold text-accent hover:bg-accent hover:text-on-accent transition-colors">
                Inviter →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-carte bg-accent p-14 text-center text-on-accent">
          <h2 className="font-display text-4xl mb-6">Ton prochain Buddy<br />t&apos;attend en salle.</h2>
          <Link href="/login" className="rounded-full bg-lime px-6 py-3 font-semibold text-sm text-accent hover:brightness-95 transition">
            Trouver mon Buddy →
          </Link>
        </div>
      </section>

      <footer className="border-t border-border-hair py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-wrap justify-between items-center gap-4">
          <span className="font-mono text-xs text-text-faint">BUDDY — PROTOTYPE · CÉSAR TOUKO SANAMA</span>
          <div className="flex gap-5 text-sm text-text-muted">
            <a href="mailto:cetoukosanama@gmail.com" className="hover:text-text-primary">Contact</a>
            <a href="https://github.com/Touko74/buddy" target="_blank" rel="noreferrer" className="hover:text-text-primary">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}