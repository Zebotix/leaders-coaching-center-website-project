'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './ui/button';
import { X, Mail, User2, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { signIn, signUp } from '@/lib/server-actions/auth-user';

export default function LoginButton(props: any) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      {/* Floating Login Button */}
      <Button
        variant={'outline'}
        className={`${props.className} text-xs cursor-pointer bg-accent-strong hover:bg-accent-strong/90 text-white border-accent-strong`}
        onClick={openModal} // ✅ setTimeout hata diya
      >
        <User2 className='mr-2 h-4 w-4' /> Login
      </Button>

      {/* Login Modal */}
      <LoginModal open={modalOpen} onClose={closeModal} />
    </>
  );
}

const LoginModal = React.memo(function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: '',
    rememberMe: false,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      //   const { data, error } = await authClient.signIn.email({
      //     email: formData.email,
      //     password: formData.password,
      //     rememberMe: formData.rememberMe,
      //   });

      const result = await signIn(formData.email, formData.password, formData.rememberMe);

      //   if (error) {
      //     toast.error(error.message || 'Login failed');
      //     return;
      //   }

      toast.success('Login successful!');
      onClose();
      window.location.reload();
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      //   const { data, error } = await authClient.signUp.email({
      //     email: formData.email,
      //     password: formData.password,
      //     name: `${formData.firstName} ${formData.lastName}`.trim(),
      //   });

      //   if (error) {
      //     toast.error(error.message || 'Sign up failed');
      //     return;
      //   }

      const result = await signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.username
      );

      toast.success('Account created successfully! Please check your email for verification.');
      onClose();
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rememberMe: false,
      username: '',
    });
  };

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    resetForm();
  };

  // ✅ Click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <>
      {/* Overlay - Fixed z-index */}
      <div
        className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity'
        onClick={handleOverlayClick}
        aria-hidden='true'
      />

      {/* Dialog - Higher z-index */}
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='login-modal-title'
        className='fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto'
        onKeyDown={handleKeyDown}
        onClick={handleOverlayClick} // ✅ Overlay click handler
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()} // ✅ Stop propagation
          className='relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl focus:outline-none max-h-[90vh] overflow-auto animate-in fade-in slide-in-from-bottom-4 duration-200'
          style={{ pointerEvents: 'auto' }} // ✅ Ensure click events work
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label='Close login form'
            className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-strong rounded-full p-1 transition-colors'
          >
            <X className='w-5 h-5' aria-hidden='true' />
          </button>

          {/* Header */}
          <div className='text-center mb-6'>
            <h2
              id='login-modal-title'
              className='text-2xl font-bold text-gray-900 dark:text-white mb-2'
            >
              Welcome Back
            </h2>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              {activeTab === 'login' ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          {/* Tabs */}
          <div className='flex border-b border-gray-200 dark:border-gray-700 mb-6'>
            <button
              type='button'
              onClick={() => handleTabChange('login')}
              className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'login'
                  ? 'border-accent-strong text-accent-strong'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Login
            </button>
            <button
              type='button'
              onClick={() => handleTabChange('signup')}
              className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'signup'
                  ? 'border-accent-strong text-accent-strong'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={activeTab === 'login' ? handleLogin : handleSignUp} className='space-y-4'>
            {activeTab === 'signup' && (
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                  >
                    First Name
                  </label>
                  <input
                    id='firstName'
                    name='firstName'
                    type='text'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required={activeTab === 'signup'}
                    className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:border-accent-strong focus:ring-2 focus:ring-accent-strong/20 transition-colors'
                    placeholder='John'
                  />
                </div>
                <div>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                  >
                    Last Name
                  </label>
                  <input
                    id='lastName'
                    name='lastName'
                    type='text'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required={activeTab === 'signup'}
                    className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:border-accent-strong focus:ring-2 focus:ring-accent-strong/20 transition-colors'
                    placeholder='Doe'
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              >
                Email
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 pr-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:border-accent-strong focus:ring-2 focus:ring-accent-strong/20 transition-colors'
                  placeholder='you@example.com'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              >
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className='w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 pr-10 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:border-accent-strong focus:ring-2 focus:ring-accent-strong/20 transition-colors'
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
                >
                  {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                </button>
              </div>
            </div>

            {activeTab === 'login' && (
              <div className='flex items-center justify-between'>
                <label className='flex items-center text-sm text-gray-700 dark:text-gray-300'>
                  <input
                    type='checkbox'
                    name='rememberMe'
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className='rounded border-gray-300 text-accent-strong focus:ring-accent-strong'
                  />
                  <span className='ml-2'>Remember me</span>
                </label>
                <button
                  type='button'
                  className='text-sm text-accent-strong hover:text-accent-strong/80 font-medium transition-colors'
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type='submit'
              disabled={loading}
              className='w-full bg-accent-strong hover:bg-accent-strong/90 text-white py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                  {activeTab === 'login' ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : activeTab === 'login' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              {activeTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type='button'
                onClick={() => handleTabChange(activeTab === 'login' ? 'signup' : 'login')}
                className='text-accent-strong hover:text-accent-strong/80 font-medium transition-colors'
              >
                {activeTab === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
});
