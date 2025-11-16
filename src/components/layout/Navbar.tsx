'use client';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarMenuButton, SidebarTrigger } from '../ui/sidebar';
import { BookOpenText, FileText, ClipboardList, Lightbulb, User2, ChevronUp } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import LoginButton from '../LoginButton';
import UserButton from '../UserButton';
import { signOut } from '@/lib/server-actions/auth-user';

const classes = [
  { name: '9th Class', slug: '9th-class' },
  { name: '10th Class', slug: '10th-class' },
  { name: '11th Class', slug: '11th-class' },
  { name: '12th Class', slug: '12th-class' },
];

const subLinks = [
  { label: 'MDB', path: 'mdb', icon: BookOpenText },
  { label: 'Past Papers', path: 'past-papers', icon: FileText },
  { label: 'Assignments', path: 'assignments', icon: ClipboardList },
  { label: 'Guess Papers', path: 'guess-papers', icon: Lightbulb },
];

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '#about' },
  { label: 'Contact', path: '#contact' },
  { label: 'Resources', path: '#resources' },
];

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <header className='w-full flex justify-between items-center p-2 bg-accent-strong shadow-sm sticky top-0 z-50'>
      {/* Logo */}
      <div onClick={() => router.push('/')} className='cursor-pointer flex items-center gap-1'>
        <div className='shadow-md shadow-black rounded-b-full'>
          <div className='relative w-20 h-28 bg-white rounded-b-full'></div>
          <Image
            src='/logo/leaders-coaching-center-logo.png'
            alt='Leaders Coaching Center'
            className='absolute top-6 size-20 rounded-b-full'
            loading='eager'
            width={9000}
            height={9000}
          />
        </div>
        <h1 className='flex flex-col font-semibold  text-white'>
          <span className='text-2xl tracking-widest'>Leaders </span>

          <span className='text-sm tracking-tight'>Coaching Center</span>
        </h1>
      </div>

      {/* Dropdown Menus */}
      <div className='hidden w-4/5 xl:flex flex-col gap-2 justify-end'>
        <div className='max-w-sm text-gray-300 place-self-end flex justify-between w-full'>
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              className={
                'p-2  text-sm text-gray-100' +
                (pathName === path || pathName?.startsWith(path + '/')
                  ? ' font-extrabold border-b-2 text-yellow-400 border-yellow-400'
                  : 'font-medium hover:text-gray-200')
              }
            >
              {label}
            </Link>
          ))}
        </div>
        {/* <div className='p-2 place-self-end'>
          {user ? (
            (user as any)?.profilePic ? (
              <Image
                src={(user as any)?.profilePic}
                alt='Leaders Coaching Center'
                className='size-8 rounded-full'
                loading='eager'
                width={9000}
                height={9000}
              />
            ) : (
              <UserButton
                signOut={signOut}
                className=' cursor-pointer text-white border border-white rounded-full size-8 p-2'
              />
            )
          ) : (
            <LoginButton />
          )}
        </div> */}
      </div>

      {/* Mobile Sidebar */}
      <div className='p-2 h-full flex flex-col items-end justify-between xl:hidden'>
        {/* {user ? (
          <>
            {(user as any)?.profilePic ? (
              <Image
                src={(user as any)?.profilePic}
                alt='Leaders Coaching Center'
                className='size-8 rounded-full'
                loading='eager'
                width={9000}
                height={9000}
              />
            ) : (
              <>
                <UserButton
                  signOut={signOut}
                  className=' cursor-pointer text-white border border-white rounded-full size-8 p-2'
                /> */}
        <SidebarTrigger size={'lg'} className='justify-self-end' />
        {/* </>
            )}
          </>
        ) : (
          <>
            <SidebarTrigger size={'lg'} className='justify-self-end' />
            <LoginButton className='w-full' />
          </>
        )} */}
      </div>
    </header>
  );
}

export function CustomSelect({ cls }: { cls: { name: string; slug: string } }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative'>
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className='cursor-pointer w-fit p-2 h-9 flex items-center justify-between bg-white hover:bg-[#ffd600] text-sm font-medium  transition-all'
      >
        {cls.name}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className='absolute mt-1 w-[150px] bg-white border border-gray-200 rounded-md shadow-lg z-50'>
          {subLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                router.push(`/study-material/${cls.slug}/${link.path}`);
                setOpen(false);
              }}
              className='w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
