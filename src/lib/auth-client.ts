import { createAuthClient } from 'better-auth/client';
import { twoFactorClient, usernameClient } from 'better-auth/client/plugins';
export const authClient = createAuthClient({
  plugins: [
    usernameClient(),
    twoFactorClient({
      // onTwoFactorRedirect: '/two-factor',
      //   onTwoFactorPage: '/two-factor', // the page to redirect if a user needs to verify 2nd factor
      onTwoFactorRedirect() {
        window.location.href = '/two-factor';
      },
    }),
  ],
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
});

export const { signIn, signUp, useSession } = createAuthClient();
