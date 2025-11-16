'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Student1',
    message:
      'I was very impressed by the quality of the course materials. The teacher was knowledgeable and engaging, and the classes were well-structured and interactive.',
    avatar: '/student.jpg',
  },
  {
    name: 'Student2',
    message:
      'The course was a great introduction to programming concepts. The teacher was clear and easy to understand, and the classes were well-organized and engaging.',
    avatar: '/student.jpg',
  },
  {
    name: 'Student3',
    message:
      'I really enjoyed the course. The teacher was very knowledgeable and engaging, and the classes were well-structured and interactive.',
    avatar: '/student.jpg',
  },
  {
    name: 'Student4',
    message:
      'The course was a great introduction to programming concepts. The teacher was clear and easy to understand, and the classes were well-organized and engaging.',
    avatar: '/student.jpg',
  },
  {
    name: 'Student5',
    message:
      'I really enjoyed the course. The teacher was very knowledgeable and engaging, and the classes were well-structured and interactive.',
    avatar: '/student.jpg',
  },
  {
    name: 'Student6',
    message:
      'The course was a great introduction to programming concepts. The teacher was clear and easy to understand, and the classes were well-organized and engaging.',
    avatar: '/student.jpg',
  },
  {
    name: 'Student7',
    message:
      'I really enjoyed the course. The teacher was very knowledgeable and engaging, and the classes were well-structured and interactive.',
    avatar: '/student.jpg',
  },
  {
    name: 'Student8',
    message:
      'The course was a great introduction to programming concepts. The teacher was clear and easy to understand, and the classes were well-organized and engaging.',
    avatar: '/student.jpg',
  },
  {
    name: 'Student9',
    message:
      'I really enjoyed the course. The teacher was very knowledgeable and engaging, and the classes were well-structured and interactive.',
    avatar: '/student.jpg',
  },
];

export default function Testimonials() {
  // spotlight (first) then rest
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  const spotlight = testimonials[spotlightIndex];
  const others = testimonials.filter((_, i) => i !== spotlightIndex);

  return (
    <section className='px-6 py-20 bg-gradient-to-b from-blue-100/60 to-white'>
      <div className='max-w-3xl mx-auto text-center mb-12'>
        <h2 className='text-3xl font-bold text-blue-800'>What Our Students Say</h2>
        <p className='text-gray-600 mt-4'>Real stories from people who took the course.</p>
      </div>

      {/* Spotlight Testimonial */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='max-w-md mx-auto mb-16'
      >
        <Card className='rounded-2xl shadow-lg p-6 flex flex-col items-center bg-white'>
          <img
            src={spotlight.avatar}
            alt={spotlight.name}
            className='w-16 h-16 rounded-full mb-4 object-cover'
          />
          <CardContent className='text-center space-y-4'>
            <p className='text-gray-700 leading-relaxed'>“{spotlight.message}”</p>
            <h3 className='text-lg font-semibold text-blue-700'>{spotlight.name}</h3>
          </CardContent>
        </Card>
      </motion.div>

      {/* Other Testimonials (Carousel / Grid) */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {others.map((t, i) => (
          <motion.div
            key={t.name}
            whileHover={{ scale: 1.03 }}
            className='cursor-pointer'
            onClick={() => setSpotlightIndex(testimonials.indexOf(t))}
          >
            <Card className='rounded-xl shadow-md p-4 bg-white h-full'>
              <div className='flex items-center space-x-4 mb-3'>
                <img src={t.avatar} alt={t.name} className='w-12 h-12 rounded-full object-cover' />
                <h4 className='text-md font-medium text-blue-700'>{t.name}</h4>
              </div>
              <p className='text-gray-600 text-sm leading-snug'>
                “{t.message.length > 100 ? t.message.slice(0, 100) + '…' : t.message}”
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
