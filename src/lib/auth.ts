import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from './generated/prisma/client';
import { nextCookies } from 'better-auth/next-js';
// import { twoFactor, username } from 'better-auth/plugins';
import { emailOTP } from 'better-auth/plugins';
import { sendEmail } from './server-actions/auth-user';

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'sign-in') {
          // Send the OTP for sign in
        } else if (type === 'email-verification') {
          // Send the OTP for email verification
        } else {
          // Send the OTP for password reset
        }
      },
    }),
  ],
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        text: `Click the link to verify your email: ${url}`,
      });
    },
    sendOnSignUp: true,
  },
});
