'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './ui/button';
import { X, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      {/* Floating Contact Button */}
      <Button
        onClick={openModal}
        className='z-50 fixed bottom-8 right-8 bg-accent-strong hover:bg-accent-strong/90 text-white rounded-full size-10 flex items-center justify-center shadow-lg focus:outline-none focus:ring-4 focus:ring-accent-strong/40 transition-all duration-200 cursor-pointer'
        aria-label='Contact us'
      >
        <Mail className='size-6' aria-hidden='true' />
      </Button>

      {/* Contact Modal */}
      <ContactModal open={modalOpen} onClose={closeModal} />
    </>
  );
}

const ContactModal = React.memo(function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Delay rendering until client-side mount (for SSR safety)
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const el = modalRef.current;
    el?.focus();

    // Lock background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const handleInputchange = async (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      toast.success('Message sent successfully!');
      onClose();
      setLoading(false);
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
      setLoading(false);
    }
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }

      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  if (!mounted || !open) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity'
        onClick={onClose}
        aria-hidden='true'
      />

      {/* Dialog */}
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='contact-modal-title'
        className='fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto'
        onKeyDown={handleKeyDown}
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          className='relative w-full max-w-lg bg-indigo-950/60 rounded-2xl p-8 shadow-2xl text-gray-100 focus:outline-none max-h-[90vh] overflow-auto animate-in fade-in slide-in-from-bottom-4 duration-200'
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label='Close contact form'
            className='absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-strong rounded-full'
          >
            <X className='w-5 h-5' aria-hidden='true' />
          </button>

          {/* Header */}
          <h2 id='contact-modal-title' className='text-2xl font-semibold mb-4 text-white'>
            Contact Us
          </h2>
          <p className='text-sm text-gray-200 mb-6'>
            Fill out the form below and we’ll get back to you shortly.
          </p>

          {/* Form */}
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-300 mb-1'>
                Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                onChange={handleInputchange}
                required
                className='w-full rounded-md bg-accent-strong/10 border focus:border-accent-strong focus:ring-2 focus:ring-accent-strong p-2 text-gray-100 placeholder-gray-300'
                placeholder='Your name'
              />
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-1'>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                onChange={handleInputchange}
                required
                className='w-full rounded-md bg-accent-strong/10 border focus:border-accent-strong focus:ring-2 focus:ring-accent-strong p-2 text-gray-100 placeholder-gray-300'
                placeholder='you@example.com'
              />
            </div>

            <div>
              <label htmlFor='message' className='block text-sm font-medium text-gray-300 mb-1'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                rows={4}
                onChange={handleInputchange}
                required
                className='w-full rounded-md bg-accent-strong/10 border focus:border-accent-strong focus:ring-2 focus:ring-accent-strong p-2 text-gray-100 placeholder-gray-300 resize-none'
                placeholder='Your message...'
              />
            </div>

            <div className='flex justify-center'>
              <Button
                type='submit'
                className='text-black bg-white hover:bg-white/90 transition-colors'
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
          <div className='flex flex-col items-center gap-2 border-white border-t pt-3 mt-3 text-sm font-inter text-gray-300'>
            <p>© {new Date().getFullYear()} Leaders Coaching Center. All rights reserved.</p>
            <p className='mt-3 md:mt-0'>
              Crafted with ❤️ by{' '}
              <a
                href='https://www.zebotix.com'
                target='_blank'
                className='text-white font-semibold hover:text-indigo-500 transition'
              >
                Zebotix
              </a>
            </p>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
});
