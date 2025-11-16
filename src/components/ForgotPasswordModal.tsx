'use client';
import { createPortal } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X } from 'lucide-react';

export default function ForgotPasswordModal({ isOpen, onClose }: any) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]' onClick={onClose} />

      <div className='fixed inset-0 z-[9999] flex items-center justify-center px-4'>
        <div
          className='w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl relative'
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-600 hover:text-black'
          >
            <X />
          </button>

          <h2 className='text-xl font-bold mb-3'>Reset Password</h2>
          <p className='text-sm text-gray-500 mb-4'>Enter your email to receive a reset link.</p>

          <Input placeholder='you@example.com' />

          <Button className='w-full mt-4'>Send Link</Button>
        </div>
      </div>
    </>,
    document.body
  );
}
