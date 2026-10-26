import Link from "next/link";
import { getUser } from "@/lib/data";

export default function NavBar({ currentUserId }: { currentUserId: string }) {
  const user = getUser(currentUserId);

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/buddies", label: "Find a Buddy" },
    { href: "/invitations", label: "Invitations" },
    { href: "/sessions", label: "Sessions" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border-hair bg-bg-base/90 backdrop-blur">
      <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between px-6">
        <Link href="/dashboard" className="font-display text-lg flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 overflow-hidden rounded border border-dashed border-text-faint">
            <span className="m-auto font-display text-xs text-text-faint">B</span>
          </span>
          BUDDY
        </Link>

        <div className="hidden gap-8 text-sm text-text-muted md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-text-primary transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/login"
          className="rounded border border-border-hair px-4 py-2 font-mono text-xs text-text-muted hover:border-text-muted transition-colors"
        >
          {user ? `${user.username} ↔` : "Connexion"}
        </Link>
      </div>
    </nav>
  );
}
