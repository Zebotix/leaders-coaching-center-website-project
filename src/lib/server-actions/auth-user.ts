'use server';

import nodemailer from 'nodemailer';
import { headers } from 'next/headers';
import { auth } from '../auth';

async function signIn(email: string, password: string, rememberMe: boolean) {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: '/profile',
    },
  });
  return result;
}

async function signUp(
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
async function signOut() {
  const { success } = await auth.api.signOut({
    headers: await headers(),
  });
  return success;
}

async function getVerified(
  email: string,
  type: 'sign-in' | 'email-verification' | 'forget-password'
) {
  const { success } = await auth.api.sendVerificationOTP({
    body: {
      email,
      type,
    },
  });

  return success;
}

async function verifyTOTP(email: string, otp: string) {
  const { user, token } = await auth.api.signInEmailOTP({
    body: {
      email,
      otp,
    },
  });

  return { user, token };
}

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) return null;
  return session;
}

async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Zebotix" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
}

export { sendEmail, signIn, signUp, signOut, verifyTOTP, getVerified, getSession };
