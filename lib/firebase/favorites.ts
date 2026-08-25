import { ref, get, set, remove } from 'firebase/database';
import { db } from './config';

export function addFavorite(uid: string, teacherId: string) {
  return set(ref(db, `users/${uid}/favorites/${teacherId}`), true);
}

export function removeFavorite(uid: string, teacherId: string) {
  return remove(ref(db, `users/${uid}/favorites/${teacherId}`));
}

export async function fetchUserFavorites(uid: string): Promise<string[]> {
  const snapshot = await get(ref(db, `users/${uid}/favorites`));
  const data = snapshot.val();
  return data ? Object.keys(data) : [];
}
