import { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: '404 — Page Not Found • Leaders Coaching Center',
  description: 'Leaders Coaching Center | Empowering Students for Success | Page Not Found',
  robots: 'noindex,follow',
  themeColor: '#000000',
  icons: {
    icon: '/logo/favicon.png',
    shortcut: '/logo/favicon.png',
    apple: '/logo/favicon.png',
  },
};

export default function NotFound() {
  const SITE_URL = 'https://leaderscoachingcenter.vercel.app';

  return (
    <html lang='en'>
      <body>
        <main className=' min-h-screen  flex items-center'>
          <div className='w-full max-w-5xl mx-auto px-6 py-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
              <section className='space-y-6'>
                <div className='inline-flex items-center gap-3 bg-white/5 rounded-full px-3 py-1 text-sm '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-indigo-300'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V5a1 1 0 10-2 0v2a1 1 0 001 1h1zm0 4a1 1 0 11-2 0 1 1 0 012 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='font-medium '>Leaders Coaching Center</span>
                  <span className='text-xs '>• Karachi, Pakistan</span>
                </div>

                <h1 className='text-5xl md:text-6xl font-extrabold leading-tight'>
                  404
                  <span className='ml-4  font-black'>Page not found</span>
                </h1>

                <p className='text-lg  max-w-xl'>
                  Oops — we couldn't find the page you're looking for. It may have been moved,
                  renamed, or never existed. Don't worry — here are a few options to get you back on
                  track.
                </p>

                <div className='flex flex-wrap gap-3'>
                  <Link
                    href='/'
                    className='inline-flex items-center gap-2   rounded-lg px-4 py-2 text-sm shadow-md'
                  >
                    Home
                  </Link>

                  <Link
                    href='/courses'
                    className='inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-lg px-4 py-2 text-sm border border-gray-700'
                  >
                    Courses
                  </Link>

                  <Link
                    href='/exams'
                    className='inline-flex items-center gap-2 bg-transparent hover:bg-black/5  rounded-lg px-4 py-2 text-sm border border-dashed border-gray-700'
                  >
                    Exams
                  </Link>

                  <Link
                    href='/faqs'
                    className='inline-flex items-center gap-2 bg-transparent hover:bg-white/5  rounded-lg px-4 py-2 text-sm border border-gray-700'
                  >
                    FAQs
                  </Link>
                </div>

                <div className='mt-4 text-sm text-gray-500'>
                  <p>
                    Want us to fix this? Report the broken link or send details to{' '}
                    <a href='mailto:zebotix@gmail.com' className='text-indigo-400 hover:underline'>
                      leaderscoachingcentre2019@gmail.com
                    </a>
                    .
                  </p>
                </div>

                {/* <div className='mt-6 bg-white/3 p-4 rounded-lg border border-white/5'>
                  <label htmlFor='site-search' className='sr-only'>
                    Search the site
                  </label>
                  <div className='flex items-center gap-2'>
                    <input
                      id='site-search'
                      name='q'
                      placeholder='Search services, e.g. e‑commerce, LMS, hotel'
                      className='w-full bg-transparent placeholder-gray-400 text-gray-100 outline-none px-3 py-2'
                    />
                    <button className='inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md px-4 py-2 text-sm'>
                      Search
                    </button>
                  </div>
                  <p className='mt-2 text-xs text-gray-400'>
                    Tip: try keywords like "e-commerce", "perfumes", "LMS".
                  </p>
                </div> */}
              </section>

              <aside className='p-6 rounded-2xl bg-linear-to-br from-indigo-900 to-black border border-white/5'>
                <div className='flex items-center justify-between mb-4'>
                  <div>
                    <h3 className='text-sm text-indigo-300 font-semibold'>Quick Links</h3>
                    <p className='text-xs text-gray-200'>Jump to useful pages</p>
                  </div>
                  <div className='text-xs text-gray-200'>Last updated: Oct 2025</div>
                </div>

                <ul className='space-y-3 text-sm'>
                  <li>
                    <Link href='/terms' className='text-gray-100 hover:text-indigo-300'>
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href='/privacy' className='text-gray-100 hover:text-indigo-300'>
                      Privacy Policy
                    </Link>
                  </li>

                  <li>
                    <Link href='/enroll' className='text-gray-100 hover:text-indigo-300'>
                      Enroll Now
                    </Link>
                  </li>
                  <li>
                    <Link href='/about' className='text-gray-100 hover:text-indigo-300'>
                      About Us
                    </Link>
                  </li>
                </ul>

                <div className='mt-6 border-t border-white/5 pt-4 text-sm text-gray-300'>
                  <p className='mb-2'>Need urgent help?</p>
                  <p className='text-xs'>
                    Email:{' '}
                    <a href='mailto:zebotix@gmail.com' className='text-indigo-300 hover:underline'>
                      leaderscoachingcentre2019@gmail.com
                    </a>
                  </p>
                  <p className='text-xs'>Karachi, Pakistan</p>
                </div>

                <div className='mt-6'>
                  <svg
                    viewBox='0 0 200 200'
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-full h-36 opacity-60'
                  >
                    <defs>
                      <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
                        <stop offset='0%' stopColor='#7c3aed' />
                        <stop offset='100%' stopColor='#06b6d4' />
                      </linearGradient>
                    </defs>
                    <rect width='200' height='200' rx='20' fill='url(#g)' opacity='0.12' />
                    <g fill='none' stroke='url(#g)' strokeWidth='2'>
                      <path d='M30 140 C60 80, 140 80, 170 140' />
                      <path d='M40 120 C70 70, 130 70, 160 120' opacity='0.7' />
                    </g>
                  </svg>
                </div>
              </aside>
            </div>

            <div className='mt-12 text-center text-xs text-gray-500'>
              <p>
                © {new Date().getFullYear()} Leaders Coaching Center. All rights reserved. View our{' '}
                <Link href='/terms' className='text-indigo-300 hover:underline'>
                  Terms
                </Link>{' '}
                and{' '}
                <Link href='/privacy' className='text-indigo-300 hover:underline'>
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
