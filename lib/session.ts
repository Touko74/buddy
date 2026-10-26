import { cookies } from "next/headers";
import { getUser } from "./data";

const COOKIE_NAME = "buddy_uid";
const DEFAULT_USER_ID = "thomas";

export async function getCurrentUserId(): Promise<string> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (value && getUser(value)) return value;
  return DEFAULT_USER_ID;
}

export async function getCurrentUser() {
  const id = await getCurrentUserId();
  return getUser(id);
}

export const SESSION_COOKIE = COOKIE_NAME;

// NOTE — l'authentification prévue au cahier des charges est Auth.js
// (email/mot de passe ou provider OAuth). Un vrai provider demande des
// identifiants OAuth ou un flux d'inscription complet avec hash de mot
// de passe stocké en base — hors de portée d'un prototype sans vraie
// base de données. Ici, "se connecter" = choisir un profil démo
// (Thomas, Lucas...), stocké dans un cookie. Le remplacement par
// Auth.js se fait uniquement dans ce fichier et dans /login.
