# Buddy

> Find your training partner. Not your soulmate.

Prototype fonctionnel d'une fonctionnalité communautaire de matching partenaire
d'entraînement pour des salles de sport (voir la section "Why I built this"
sur la landing page).

Basé sur le [Cahier des charges](#) et la [Vision Produit](#) fournis en amont
du projet — voir en particulier les sections 5 (algorithme de matching) et 13
(MVP) du cahier des charges.

## Lancer le projet en local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000). La landing page est
publique ; clique sur **FIND MY BUDDY** ou **REJOINDRE** pour arriver sur
`/login`, qui liste les profils de démo (Thomas, Lucas, Emma, Yanis, Sarah —
voir section 14 du cahier des charges) : choisis-en un pour te connecter.

## Parcours implémenté (MVP du cahier des charges, section 13)

- **Landing page** (`/`) — présentation, argumentaire "pourquoi pas juste
  WhatsApp", parcours en 5 étapes, section "Why I built this"
- **Onboarding** (`/onboarding`) — création de profil en 3 étapes (infos,
  habitudes, disponibilités), écrit en base via `POST /api/profile`
- **Dashboard** (`/dashboard`) — prochaine séance, invitations en attente,
  meilleur match
- **Find a Buddy** (`/buddies`) — liste des profils compatibles, triée par
  score de matching
- **Profil Buddy** (`/buddies/[id]`) — score détaillé par critère, envoi
  d'invitation
- **Invitations** (`/invitations`) — reçues / envoyées, accepter / refuser
- **Sessions** (`/sessions`) — programmer une séance avec un Buddy accepté

**Non implémenté (bonus du cahier des charges, hors MVP) :** messagerie,
notifications, mode clair, PWA.

## Ce qui est mocké, et pourquoi

Le cahier des charges vise **PostgreSQL + Prisma + Auth.js**. Ce prototype
utilise à la place :

- **Un store en mémoire** (`lib/data.ts`) au lieu de PostgreSQL — les types
  (`lib/types.ts`) reprennent exactement les entités du schéma de données du
  cahier des charges (section 8 : `User`, `Club`, `TrainingPreference`,
  `Availability`, `BuddyRequest`, `TrainingSession`...), donc brancher Prisma
  revient à réécrire les fonctions de `lib/data.ts` en requêtes
  `prisma.client`, sans toucher au reste de l'app.
- **Une "connexion" par choix de profil démo** (`/login`, cookie) au lieu
  d'Auth.js — remplacer se fait uniquement dans `lib/session.ts` et
  `/login`.

Raison technique : Prisma télécharge ses binaires (query engine) depuis
`binaries.prisma.sh` à l'installation, un domaine indisponible dans
l'environnement où ce prototype a été construit. L'architecture est pensée
pour que la migration vers la vraie stack soit un remplacement ciblé, pas une
réécriture.

**Important** : le store en mémoire repart de zéro à chaque redémarrage du
serveur (`npm run dev` / `npm run start`) — normal pour une démo, à remplacer
par une vraie base avant toute mise en ligne réelle.

## Algorithme de matching

Implémenté dans `lib/matching.ts`, pondérations reprises du cahier des
charges (section 5) :

| Critère | Poids | Méthode de calcul |
|---|---|---|
| Même club | 30% | égalité stricte |
| Horaires compatibles | 25% | chevauchement réel en minutes, normalisé par la disponibilité du profil le plus contraint |
| Objectif similaire | 20% | égalité stricte |
| Activités communes | 15% | indice de Jaccard |
| Niveau proche | 10% | distance sur l'échelle débutant → avancé |

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · Server
Actions pour les mutations (`sendInvite`, `respondToInvite`, `planSession`).

## Prochaines étapes vers la prod

1. Remplacer `lib/data.ts` par un vrai client Prisma + schéma PostgreSQL
   (les types sont déjà alignés)
2. Remplacer `lib/session.ts` par Auth.js
3. Ajouter les photos réelles du club (le design en réserve déjà l'espace)
4. Remplacer les emplacements `LOGO` (nav, hero, section clubs) par le logo
   de ton choix
5. Déployer sur Vercel + une instance PostgreSQL hébergée
