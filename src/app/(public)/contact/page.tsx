// app/contact/page.tsx
import React from 'react';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import { Facebook, Instagram, Mail } from 'lucide-react';

const CONTACT = {
  name: 'Leaders Coaching Center',
  phone: '+92 313 2061329', // <-- replace with real phone
  email: 'leaderscoachingcentre2019@gmail.com', // <-- replace with real email
  addressLine: 'Karachi, Pakistan', // <-- replace if needed
  mapQuery: 'Leaders Coaching Center, Karachi Pakistan',
  socials: {
    facebook: 'https://www.facebook.com/leaderscoaching',
    instagram: 'https://www.instagram.com/leaderscoaching',
    mail: 'mailto:leaderscoachingcentre2019@gmail.com',
  },
};

export default function ContactPage() {
  // Server component: renders static/SSR content.
  // Client-only behavior (form interactivity) lives in components/ContactForm.tsx
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://leaderscoaching.vercel.app';

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: CONTACT.name,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressCountry: 'PK',
    },
    url: siteUrl,
    sameAs: Object.values(CONTACT.socials).filter(Boolean),
  };

  return (
    <>
      <script
        type='application/ld+json'
        // JSON-LD is safe to include server-side; does not access window
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      <main className='min-h-screen py-12 lg:px-20'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>
          {/* LEFT: Contact Form (client component) */}
          <section
            aria-labelledby='contact-heading'
            className='text-muted bg-accent-strong p-4 sm:p-6 rounded-2xl shadow-md'
          >
            <h1 id='contact-heading' className='text-2xl md:text-3xl font-extrabold mb-2'>
              Get in touch with <span className='text-indigo-500'>Leaders Coaching Center</span>
            </h1>
            <p className='text-sm text-gray-300 mb-6'>
              Questions about admissions, courses, or schedules? Send us a message — we typically
              reply within 1-2 business days.
            </p>

            {/* Client form receives CONTACT (so it can use email/phone/map info) */}
            <ContactForm contact={CONTACT} />
          </section>

          {/* RIGHT: Contact details + map (server-rendered) */}
          <aside className='space-y-6'>
            <div className='text-muted bg-accent-strong p-4 sm:p-6 rounded-2xl shadow-md'>
              <h2 className='text-lg font-semibold mb-3'>Contact details</h2>

              <dl className='space-y-3'>
                <div>
                  <dt className='text-xs font-medium text-gray-300'>Phone</dt>
                  <dd>
                    <a href={`tel:${CONTACT.phone}`} className='text-indigo-300 hover:underline'>
                      {CONTACT.phone}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className='text-xs font-medium text-gray-300'>Email</dt>
                  <dd>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className='text-xs text-indigo-300 hover:underline'
                    >
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className='text-xs font-medium text-gray-300'>Address</dt>
                  <dd className='text-gray-300'>{CONTACT.addressLine}</dd>
                </div>
              </dl>

              <div className='mt-4'>
                <h3 className='text-sm font-medium text-gray-300 mb-2'>Follow</h3>
                <div className='flex gap-3'>
                  <a
                    href={CONTACT.socials.facebook}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Facebook'
                    className='p-2 rounded-md hover:text-blue-500 transition'
                  >
                    <Facebook className=' w-5 h-5' />
                  </a>

                  <a
                    href={CONTACT.socials.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Instagram'
                    className='p-2 rounded-md hover:text-pink-500 transition'
                  >
                    <Instagram className='w-5 h-5' />
                  </a>

                  <a
                    href={CONTACT.socials.mail}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Mail'
                    className='p-2 rounded-md hover:text-green-500 transition'
                  >
                    <Mail className='w-5 h-5' />
                  </a>
                </div>
              </div>
            </div>

            {/* Map card */}
            <div className='rounded-2xl overflow-hidden border border-white/6'>
              <h3 className='px-4 pt-4 text-sm font-medium text-gray-800'>Our location</h3>
              <div
                className='h-56 md:h-72 w-full'
                role='region'
                aria-label='Leaders Coaching Center location map'
              >
                {/* <iframe src="" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                {/* simple embedded map using query — use a proper embed if you prefer */}
                <iframe
                  title='Leaders Coaching Center location — Karachi'
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.4134473145727!2d66.9636953!3d24.917981500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb315003b6ec927%3A0xd72699e3856e59d7!2sLEADERS%20Coaching%20Centre!5e0!3m2!1sen!2s!4v1762818789768!5m2!1sen!2s`}
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                />
              </div>
            </div>

            {/* Small trust / compliance note */}
            <div className='text-xs text-gray-500'>
              <p>
                We use secure channels for messages and do not store payment card details. For
                privacy and legal information, see our{' '}
                <a href='/privacy' className='text-indigo-400 hover:underline'>
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
