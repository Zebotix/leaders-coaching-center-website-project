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

const classes = [
  { name: '9th Class', slug: '9th' },
  { name: '10th Class', slug: '10th' },
  { name: '11th Class', slug: '11th' },
  { name: '12th Class', slug: '12th' },
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
  return (
    <header className='w-full flex justify-between items-center px-4 py-2 bg-white shadow-sm sticky top-0 z-50'>
      {/* Logo */}
      <div className='flex items-center gap-2'>
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
              className='py-2  text-sm text-gray-700 hover:bg-gray-100 rounded-md'
            >
              {label}
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-4'>
          {classes.map((cls) => (
            <SelectDemo key={cls.slug} cls={cls} />
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

export function SelectDemo({
  cls,
}: {
  cls: {
    name: string;
    slug: string;
  };
}) {
  return (
    <Select>
      <SelectTrigger className='w-[150px] h-9 text-sm font-medium border-gray-300 hover:border-gray-400 transition-colors'>
        <SelectValue placeholder={cls.name} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {subLinks.map((link) => {
            const Icon = link.icon;
            return (
              <SelectItem
                key={link.path}
                value={link.path}
                className='px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center  rounded-md cursor-pointer'
              >
                <Link
                  href={`/study-material/${cls.slug}/${link.path}`}
                  className='flex items-center gap-2 w-full'
                >
                  <Icon size={16} className='text-gray-500' />
                  {link.label}
                </Link>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
