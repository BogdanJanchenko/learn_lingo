// lib/firebase/teachers.ts
import { ref, get, query, orderByChild, equalTo, limitToFirst } from 'firebase/database';
import { db } from './config';
import type { Teacher } from '@/types/teacher';

export interface TeacherFilters {
  language?: string;
  level?: string;
  price?: number;
}

async function getIdsFromIndex(indexPath: string): Promise<Set<string>> {
  const snapshot = await get(ref(db, indexPath));
  const data = snapshot.val();
  return data ? new Set(Object.keys(data)) : new Set();
}

async function getIdsByPrice(price: number): Promise<Set<string>> {
  const priceQuery = query(ref(db, 'teachers'), orderByChild('price_per_hour'), equalTo(price));
  const snapshot = await get(priceQuery);
  const data = snapshot.val() || {};
  return new Set(Object.keys(data));
}

function intersectSets(sets: Set<string>[]): Set<string> {
  return sets.reduce((acc, set) => new Set([...acc].filter((id) => set.has(id))));
}

export async function fetchTeachersByIds(ids: string[]): Promise<Teacher[]> {
  const snapshots = await Promise.all(ids.map((id) => get(ref(db, `teachers/${id}`))));
  return snapshots
    .map((snap, i) =>
      snap.exists() ? { id: ids[i], ...(snap.val() as Omit<Teacher, 'id'>) } : null
    )
    .filter((teacher): teacher is Teacher => teacher !== null);
}

export async function fetchTeachers(
  limit: number,
  filters: TeacherFilters = {}
): Promise<Teacher[]> {
  const hasFilters = Boolean(filters.language || filters.level || filters.price);

  if (!hasFilters) {
    const teachersQuery = query(ref(db, 'teachers'), limitToFirst(limit));
    const snapshot = await get(teachersQuery);
    const data = snapshot.val() || {};
    return Object.entries(data).map(([id, teacher]) => ({
      id,
      ...(teacher as Omit<Teacher, 'id'>),
    }));
  }

  const idSets: Set<string>[] = [];

  if (filters.language) {
    idSets.push(await getIdsFromIndex(`languageIndex/${filters.language}`));
  }
  if (filters.level) {
    idSets.push(await getIdsFromIndex(`levelIndex/${filters.level}`));
  }
  if (filters.price !== undefined) {
    idSets.push(await getIdsByPrice(filters.price));
  }

  const matchedIds = [...intersectSets(idSets)];
  const teachers = await fetchTeachersByIds(matchedIds);

  return teachers.slice(0, limit);
}
