'use client';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarTrigger } from './ui/sidebar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BookOpenText, FileText, ClipboardList, Lightbulb } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Exams', path: '/exams' },
  { label: 'courses', path: '/courses' },
  { label: 'feed', path: '/posts' },
];

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <header className='w-full flex justify-between items-center px-4 py-2 bg-white shadow-sm sticky top-0 z-50'>
      {/* Logo */}
      <div onClick={() => router.push('/')} className='cursor-pointer flex items-center gap-2'>
        <Image
          src='/logo/leaders-coaching-center-logo.png'
          alt='Leaders Coaching Center'
          className='size-14 sm:size-20'
          loading='eager'
          width={9000}
          height={9000}
        />
        <h1 className='hidden sm:block font-semibold text-lg text-gray-800'>
          Leaders Coaching Center
        </h1>
      </div>

      {/* Dropdown Menus */}
      <div className='hidden xl:flex flex-col gap-2'>
        <div className='place-self-end flex justify-between w-full'>
          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              className={
                'py-2  text-sm text-gray-700' +
                (pathName === path
                  ? ' font-semibold border-b-2 border-blue-600'
                  : ' hover:text-gray-900')
              }
            >
              {label}
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-4'>
          {classes.map((cls) => (
            <CustomSelect key={cls.slug} cls={cls} />
          ))}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className='flex  xl:hidden'>
        <SidebarTrigger />
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
        className='cursor-pointer w-[150px] h-9 px-3 flex items-center justify-between bg-white hover:bg-[#ffd600] text-sm font-medium  transition-all'
      >
        {cls.name}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className='absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50'>
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
