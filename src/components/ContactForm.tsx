// components/ContactForm.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

type Contact = {
  name: string;
  phone: string;
  email: string;
  addressLine: string;
  mapQuery: string;
  socials: Record<string, string>;
};

export default function ContactForm({ contact }: { contact: Contact }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const liveRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // focus the live region on success/error for screen readers
    if (status === 'success' || status === 'error') {
      liveRef.current?.focus();
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');

    const target = e.currentTarget;
    const formData = new FormData(target);
    const data = {
      name: (formData.get('name') as string)?.trim(),
      email: (formData.get('email') as string)?.trim(),
      subject: (formData.get('subject') as string)?.trim(),
      message: (formData.get('message') as string)?.trim(),
      page: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (!data.name || !data.email || !data.message) {
      setStatus('error');
      setMessage('Please fill name, email, and message.');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('Thanks — your message was sent. We will reply soon.');
        target.reset();
        return;
      }

      // non-2xx -> fallback to mailto
      throw new Error('API returned non-2xx');
    } catch (err) {
      // Fallback to mailto if API is not implemented or there's a network error
      const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
        data.subject || 'New contact from website'
      )}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
      window.location.href = mailto;
      setStatus('idle');
      setMessage('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4' aria-describedby='contact-form-desc'>
      <p id='contact-form-desc' className='sr-only'>
        Required fields are name, email and message.
      </p>

      <div>
        <label htmlFor='name' className='block text-sm font-medium'>
          Name <span aria-hidden='true'>*</span>
        </label>
        <input
          id='name'
          name='name'
          type='text'
          required
          placeholder='Your name'
          className='mt-1 block w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200'
        />
      </div>

      <div>
        <label htmlFor='email' className='block text-sm font-medium'>
          Email <span aria-hidden='true'>*</span>
        </label>
        <input
          id='email'
          name='email'
          type='email'
          required
          placeholder='you@example.com'
          className='mt-1 block w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
      </div>

      <div>
        <label htmlFor='subject' className='block text-sm font-medium'>
          Subject
        </label>
        <input
          id='subject'
          name='subject'
          type='text'
          placeholder='Project: e.g. admissions query'
          className='mt-1 block w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
      </div>

      <div>
        <label htmlFor='message' className='block text-sm font-medium'>
          Message <span aria-hidden='true'>*</span>
        </label>
        <textarea
          id='message'
          name='message'
          rows={6}
          required
          placeholder="Tell us about your question or the course you're interested in..."
          className='mt-1 block w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
      </div>

      <div className='flex items-center gap-3'>
        <button
          type='submit'
          className='inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md px-4 py-2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300'
          aria-disabled={status === 'sending'}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>

        <button
          type='button'
          onClick={() => document.getElementById('name')?.focus()}
          className='text-sm text-gray-300 underline'
        >
          Reset focus
        </button>
      </div>

      <div
        role='status'
        aria-live='polite'
        tabIndex={-1}
        ref={liveRef}
        className={`text-sm mt-2 ${
          status === 'success'
            ? 'text-green-400'
            : status === 'error'
            ? 'text-rose-400'
            : 'text-gray-300'
        }`}
      >
        {message}
      </div>
    </form>
  );
}
