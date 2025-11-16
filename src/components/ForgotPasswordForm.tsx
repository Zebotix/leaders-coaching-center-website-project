'use client';

import { useState, useTransition } from 'react';
import { getVerified } from '@/lib/server-actions/auth-user';
import { verifyTOTP } from '@/lib/server-actions/auth-user';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  // STEP 1 — Send OTP
  const handleSendOTP = () => {
    startTransition(async () => {
      const success = await getVerified(email, 'forget-password');
      if (success) {
        setMessage('OTP sent to your email.');
        setStep('otp');
      } else {
        setMessage('Failed to send OTP.');
      }
    });
  };

  // STEP 2 — Verify OTP
  const handleVerify = () => {
    startTransition(async () => {
      const { user, token } = await verifyTOTP(email, otp);
      if (user) {
        setMessage('OTP Verified. Logged in successfully.');
        // Optional: redirect
        window.location.href = '/';
      } else {
        setMessage('Invalid OTP.');
      }
    });
  };

  return (
    <div className='w-full max-w-sm space-y-4'>
      {message && <div className='text-sm text-blue-600'>{message}</div>}

      {step === 'email' && (
        <>
          <input
            type='email'
            placeholder='Enter Email'
            className='border border-gray-300 rounded-md px-4 py-2 w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleSendOTP}
            disabled={isPending}
            className='bg-blue-600 text-white px-4 py-2 rounded-md w-full'
          >
            {isPending ? 'Sending...' : 'Send OTP'}
          </button>
        </>
      )}

      {step === 'otp' && (
        <>
          <input
            type='text'
            placeholder='Enter OTP'
            className='border border-gray-300 rounded-md px-4 py-2 w-full'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={handleVerify}
            disabled={isPending}
            className='bg-green-600 text-white px-4 py-2 rounded-md w-full'
          >
            {isPending ? 'Verifying...' : 'Verify OTP'}
          </button>
        </>
      )}
    </div>
  );
}
