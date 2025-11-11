import React from 'react';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-accent-strong text-gray-300 py-10'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* Top Section */}
        <div className='grid md:grid-cols-3 gap-8 border-b border-gray-700 pb-8'>
          <div>
            <h3 className='text-xl font-merriweather font-bold text-white mb-3'>
              Leaders Coaching Center
            </h3>
            <p className='text-sm font-inter text-gray-400'>
              Empowering students with quality education, expert mentorship, and a focus on lifelong
              learning.
            </p>
          </div>

          <div>
            <h4 className='text-lg font-semibold text-white mb-3'>Quick Links</h4>
            <ul className='space-y-2 text-sm font-inter'>
              <li>
                <a href='/about' className='hover:text-white transition'>
                  About Us
                </a>
              </li>
              <li>
                <a href='/courses' className='hover:text-white transition'>
                  Courses
                </a>
              </li>
              <li>
                <a href='/exams' className='hover:text-white transition'>
                  Exams
                </a>
              </li>
              <li>
                <a href='/contact' className='hover:text-white transition'>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-lg font-semibold text-white mb-3'>Connect With Us</h4>
            <div className='flex space-x-4'>
              <a
                href='https://www.facebook.com/p/Leaders-Coaching-Centre-100069217748444/'
                className='hover:text-blue-500 transition'
              >
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='https://www.instagram.com/leaders_educational_network/'
                className='hover:text-pink-500 transition'
              >
                <Instagram className='w-5 h-5' />
              </a>
              <a
                href='mailto:leaderscoachingcentre2019@gmail.com'
                className='hover:text-green-500 transition'
              >
                <Mail className='w-5 h-5' />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row items-center justify-between mt-6 text-sm font-inter text-gray-400'>
          <p>© {new Date().getFullYear()} Leaders Coaching Center. All rights reserved.</p>
          <p className='mt-3 md:mt-0'>
            Crafted with ❤️ by{' '}
            <span className='text-white font-semibold hover:text-blue-400 transition'>Zebotix</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
