import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './config';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function registerUser({ name, email, password }: RegisterData) {
  const credentials = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credentials.user, { displayName: name });
  return credentials.user;
}

export async function loginUser({ email, password }: LoginData) {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials.user;
}

export function logoutUser() {
  return signOut(auth);
}
