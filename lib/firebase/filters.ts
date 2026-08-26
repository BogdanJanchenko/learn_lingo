import { ref, get } from 'firebase/database';
import { db } from './config';
import type { Teacher } from '@/types/teacher';

export interface TeachersFiltersOptions {
  languages: string[];
  levels: string[];
  prices: number[];
}

export async function fetchFiltersOptions(): Promise<TeachersFiltersOptions> {
  const [languageSnapshot, levelSnapshot, teachersSnapshot] = await Promise.all([
    get(ref(db, 'languageIndex')),
    get(ref(db, 'levelIndex')),
    get(ref(db, 'teachers')),
  ]);

  const languages = languageSnapshot.exists() ? Object.keys(languageSnapshot.val()).sort() : [];

  const levels = levelSnapshot.exists() ? Object.keys(levelSnapshot.val()).sort() : [];

  const teachersData = teachersSnapshot.val() || {};
  const allTeachers = Object.values(teachersData) as Omit<Teacher, 'id'>[];
  const prices = [...new Set(allTeachers.map((t) => t.price_per_hour))].sort((a, b) => a - b);

  return { languages, levels, prices };
}
