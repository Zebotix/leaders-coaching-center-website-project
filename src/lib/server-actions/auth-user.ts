'use server';

import { headers } from 'next/headers';
import { auth } from '../auth';

export async function signIn(email: string, password: string, rememberMe: boolean) {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: '/profile',
    },
  });
  return result;
}

export async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  username: string
) {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: `${firstName} ${lastName}`,
      callbackURL: '/profile',
    },
  });
  return result;
}

// signout
export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });
  return result;
}
