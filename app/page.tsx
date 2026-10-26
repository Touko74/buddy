import Link from "next/link";
import MatchDial from "@/components/MatchDial";

const steps = [
  { idx: "01", title: "FIND BUDDY", desc: "Profil sportif : club, objectif, niveau, activités, disponibilités." },
  { idx: "02", title: "MATCH 94%", desc: "Score de compatibilité calculé sur 5 critères pondérés." },
  { idx: "03", title: "INVITE", desc: "Invitation envoyée, acceptée ou refusée en un geste." },
  { idx: "04", title: "TRAIN TOGETHER", desc: "Séance programmée, rappel envoyé le jour J." },
  { idx: "05", title: "TRACK", desc: "Suivi de la régularité et des séances communes." },
];

const buddyPreview = [
  { name: "Lucas M.", meta: "Intermédiaire · Club Nord", score: 94, tags: ["Musculation", "Crossfit", "Lun 18h-20h"] },
  { name: "Emma R.", meta: "Intermédiaire · Club Nord", score: 81, tags: ["Cardio", "Musculation", "Mer 07h-08h"] },
  { name: "Yanis K.", meta: "Avancé · Club Nord", score: 76, tags: ["Musculation", "Lun 19h-21h"] },
];

export default function LandingPage() {
  return (
    <main>
      <nav className="sticky top-0 z-50 border-b border-border-hair bg-bg-base/90 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6">
          <div className="font-display text-lg flex items-center gap-2.5">
            <span className="relative flex h-7 w-7 overflow-hidden rounded border border-dashed border-text-faint">
              <span className="m-auto font-display text-[9px] text-text-faint">B</span>
            </span>
            BUDDY
          </div>
          <div className="hidden gap-9 text-sm text-text-muted md:flex">
            <a href="#how" className="hover:text-text-primary transition-colors">Comment ça marche</a>
            <a href="#buddies" className="hover:text-text-primary transition-colors">Buddies</a>
            <a href="#clubs" className="hover:text-text-primary transition-colors">Clubs</a>
          </div>
          <Link href="/login" className="rounded bg-accent px-5 py-2.5 font-bold text-sm text-text-primary hover:bg-accent-bright transition-colors">
            REJOINDRE →
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <div className="font-mono text-xs text-accent-bright tracking-widest mb-5 flex items-center gap-2 before:content-[''] before:w-5 before:h-px before:bg-accent-bright">
            FONCTIONNALITÉ COMMUNAUTAIRE — PROTOTYPE
          </div>
          <h1 className="font-display text-5xl md:text-6xl leading-[0.98] mb-6">
            Find your<br />training partner.<br />
            <span className="relative inline-block text-text-faint">
              Not your soulmate.
              <span className="absolute left-[-4px] right-[-4px] top-[48%] h-[5px] bg-text-primary -rotate-1" />
            </span>
          </h1>
          <p className="text-text-muted max-w-md mb-8">
            Un partenaire d&apos;entraînement compatible dans ton club, en quelques minutes. Même objectif, mêmes horaires, même énergie — l&apos;appli s&apos;occupe du reste.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <Link href="/login" className="rounded bg-accent px-5 py-2.5 font-bold text-sm hover:bg-accent-bright transition-colors">
              FIND MY BUDDY →
            </Link>
            <span className="font-mono text-xs text-text-faint">03 CLUBS · DONNÉES DE DÉMO</span>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-hair py-1.5 pl-1.5 pr-3.5">
            <span className="relative flex h-5 w-5 overflow-hidden rounded border border-dashed border-text-faint">
              <span className="m-auto font-display text-[9px] text-text-faint">B</span>
            </span>
            <span className="font-mono text-[11px] text-text-faint tracking-wide">PROTOTYPE FONCTIONNEL</span>
          </div>
        </div>

        <div className="relative -rotate-1 rounded-md border border-border-hair bg-bg-elevated p-7 shadow-2xl">
          <div className="absolute -top-4 -right-3.5 flex h-[76px] w-[76px] rotate-[11deg] items-center justify-center rounded-full border border-dashed border-accent-bright bg-bg-base text-center font-mono text-[8px] leading-tight text-accent-bright">
            MATCH<br />TROUVÉ
          </div>
          <div className="flex justify-between mb-5 font-mono text-[11px] text-text-faint">
            <span>MATCH_ID · #0094</span>
            <span>CLUB NORD</span>
          </div>
          <MatchDial score={94} />
          <div className="text-center font-display text-xl mt-4 mb-1">THOMAS × LUCAS</div>
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

      <div className="border-y border-border-hair bg-bg-elevated py-6">
        <div className="mx-auto max-w-6xl px-6 flex flex-wrap items-center justify-between gap-6">
          <p className="text-sm text-text-muted max-w-lg">
            « La motivation, ça se partage. Un rendez-vous manqué face à un <span className="text-text-primary">Buddy</span> pèse plus lourd qu&apos;un rendez-vous manqué face à soi-même. »
          </p>
          <a href="#how" className="rounded border border-border-hair px-5 py-2.5 text-sm hover:border-text-muted transition-colors">Voir le concept ↓</a>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-20 border-b border-border-hair grid md:grid-cols-[0.85fr_1.15fr] gap-14">
        <div className="font-display text-3xl leading-tight">
          <span className="text-accent font-serif mr-0.5">&quot;</span>Pourquoi pas juste un groupe WhatsApp ?
        </div>
        <div className="text-text-muted text-[15px] flex flex-col gap-3.5 max-w-lg">
          <p>C&apos;est la question qu&apos;on nous pose toujours en premier — et c&apos;est la bonne question. Un annuaire de plus ne sert à rien.</p>
          <p>Ce que WhatsApp ne fait pas : calculer une compatibilité réelle entre deux emplois du temps, rappeler qu&apos;un Buddy s&apos;entraîne ce soir, transformer une mise en relation ponctuelle en habitude qui ramène les deux adhérents au club chaque semaine.</p>
          <p className="text-text-primary font-semibold border-l-2 border-accent pl-3.5">Le matching n&apos;est pas le produit. C&apos;est le point de départ d&apos;une boucle de régularité.</p>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-xl mb-14">
          <div className="font-mono text-xs text-accent tracking-widest mb-3.5">PARCOURS</div>
          <h2 className="font-display text-4xl mb-4">De la recherche à l&apos;habitude</h2>
          <p className="text-text-muted text-sm">Le matching n&apos;est que le point de départ. Le vrai produit, c&apos;est la régularité qu&apos;il crée.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-7 relative">
          <div className="hidden md:block absolute top-[21px] left-10 right-10 h-px bg-border-hair" />
          {steps.map((s) => (
            <div key={s.idx} className="relative">
              <div className="relative z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-accent-dim bg-bg-base font-mono text-xs text-accent mb-5">
                {s.idx}
              </div>
              <h3 className="font-display text-sm mb-2">{s.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="buddies" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="max-w-xl mb-14">
          <div className="font-mono text-xs text-accent tracking-widest mb-3.5">SUGGESTIONS</div>
          <h2 className="font-display text-4xl mb-4">Tes Buddies compatibles</h2>
          <p className="text-text-muted text-sm">Classés par score de compatibilité dans ton club.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {buddyPreview.map((b) => (
            <div key={b.name} className="rounded-md border border-border-hair bg-bg-elevated p-5.5 hover:border-accent-dim hover:-translate-y-1 transition-all">
              <div className="flex justify-between items-center mb-4">
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-gradient-to-br from-accent-dim to-bg-elevated-2 font-display text-base">
                  {b.name[0]}
                </div>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[13px] font-bold text-accent-bright">
                  {b.score}%
                </span>
              </div>
              <h4 className="font-display text-[17px] mb-1">{b.name}</h4>
              <p className="text-xs text-text-faint mb-3.5">{b.meta}</p>
              <div className="flex flex-wrap gap-1.5">
                {b.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border-hair px-2.5 py-1 text-[11px] text-text-muted">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="clubs" className="mx-auto max-w-6xl px-6 py-10 border-t border-border-hair flex flex-wrap items-center justify-between gap-7">
        {["Club Nord", "Club Centre", "Club Sud"].map((c) => (
          <div key={c} className="flex flex-col items-center gap-2.5">
            <span className="flex h-16 w-16 items-center justify-center rounded border border-dashed border-text-faint font-display text-lg text-text-faint">
              {c.split(" ")[1][0]}
            </span>
            <span className="font-display text-[13px] text-text-faint">{c}</span>
          </div>
        ))}
        <div className="flex flex-col items-center gap-2.5">
          <span className="flex h-16 w-16 items-center justify-center rounded border border-text-faint font-mono text-[9px] text-text-faint">+</span>
          <span className="font-display text-[13px] text-text-faint">RÉSEAU DE CLUBS</span>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-lg border border-border-hair bg-bg-elevated p-16 text-center">
          <div className="font-mono text-xs text-accent tracking-widest mb-3.5">PRÊT ?</div>
          <h2 className="font-display text-4xl mb-4">Ton prochain Buddy<br />t&apos;attend en salle.</h2>
          <p className="text-text-muted text-sm max-w-md mx-auto mb-8">Crée ton profil sportif en moins de deux minutes et découvre tes premiers matchs.</p>
          <Link href="/login" className="rounded bg-accent px-5 py-2.5 font-bold text-sm hover:bg-accent-bright transition-colors">FIND MY BUDDY →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div id="why-built" className="rounded border-l-[3px] border-accent border border-border-hair bg-bg-elevated px-10 py-9">
          <div className="font-mono text-[11px] text-accent tracking-widest mb-3.5">WHY I BUILT THIS</div>
          <p className="italic text-text-muted max-w-2xl mb-5">
            Adhérent d'une salle de sport, j'ai remarqué que l'espace boxe/MMA reste sûrement sous-exploité par des adhérents comme moi, freinés par le seul fait de s'y lancer seuls — pas un manque d'envie, un manque de partenaire. J'ai voulu prototyper une réponse à ce frein précis : profil, score de compatibilité, invitation, séance programmée. C'est ma façon de coder : repérer un frein concret avant de proposer une fonctionnalité, pas l'inverse.
          </p>
          <div className="flex flex-wrap justify-between items-center gap-3.5 font-mono text-xs text-text-faint">
            <span>César Touko Sanama — Étudiant Développement Web, IIM Digital School</span>
            <a href="mailto:" className="rounded border border-border-hair px-4 py-2 hover:border-text-muted transition-colors">Me contacter →</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border-hair py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-wrap justify-between items-center gap-4">
          <span className="font-mono text-xs text-text-faint">BUDDY — PROTOTYPE · CÉSAR TOUKO SANAMA</span>
          <div className="flex gap-5 text-sm text-text-muted">
            <a href="#why-built" className="hover:text-text-primary">Why I built this</a>
            <a href="mailto:" className="hover:text-text-primary">Contact</a>
            <a href="https://github.com" className="hover:text-text-primary">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
