'use client';
import { User2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function UserButton({
  className,
  signOut,
}: {
  className?: string;
  signOut: () => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <User2 onClick={() => setDropDown(!dropdown)} className={className + ' '} />
      {dropdown && (
        <div className='relative'>
          <ul
            className='absolute rounded-lg shadow z-50 w-44 right-0 top-2 bg-white border border-gray-200 divide-y divide-gray-100  text-sm text-gray-700 dark:text-gray-200'
            aria-labelledby='dropdownDefaultButton'
          >
            <li>
              <button
                onClick={openModal}
                className='cursor-pointer text-start w-full rounded-t-lg block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                Profile
              </button>
            </li>
            <li>
              <a
                href='#'
                className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                My Courses
              </a>
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className='cursor-pointer rounded-b-lg text-start w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
      <UserModal open={modalOpen} onClose={closeModal} />
    </>
  );
}

export function UserModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return createPortal(<></>, document.body);
}
