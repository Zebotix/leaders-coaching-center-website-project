'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id='about' className='w-full py-20 px-6 bg-gradient-to-b from-blue-50 to-white'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='space-y-6'
        >
          <h2 className='text-4xl font-bold text-yellow-500 leading-tight'>
            About <span className='text-indigo-900'>Leaders Coaching Center</span>
          </h2>

          <p className='text-gray-700 leading-relaxed text-lg'>
            Leaders Coaching Center is a trusted educational institute dedicated to helping students
            of classes <strong>9th, 10th, 11th, and 12th</strong> excel in their
            <strong>Board Examinations</strong>. With highly qualified and experienced teachers, we
            provide concept-based learning that builds clarity, confidence, and strong academic
            foundations.
          </p>

          <p className='text-gray-700 leading-relaxed text-lg'>
            Along with science and commerce coaching, we also offer professional skill-based
            programs including <strong>Computer Courses</strong>,
            <strong> English Language Training</strong>, and various short courses designed to
            prepare students for the modern world.
          </p>

          <p className='text-gray-700 leading-relaxed text-lg'>
            Our mission is to guide every learner to unlock their full potential through
            personalized teaching, disciplined learning, and a motivating environment that
            encourages growth and excellence.
          </p>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='w-full flex justify-center'
        >
          <div className='relative w-[320px] h-[320px] md:w-[380px] md:h-[380px] rounded-3xl overflow-hidden shadow-xl border border-blue-100 bg-white'>
            <Image
              src='/logo/leaders-coaching-center-logo.png' // replace with your image path
              alt='About Leaders Coaching Center'
              fill
              className='object-cover'
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
