import React from 'react';
import { BookOpen, Users, Target, Sparkles } from 'lucide-react';

export default function WhatLeadersCoachingCenterProvides() {
  const features = [
    {
      icon: <BookOpen className='w-8 h-8 text-accent-strong' />,
      title: 'Comprehensive Study Material',
      description:
        'Access well-structured notes, practice papers, and concept guides prepared by experienced teachers to help you master every subject.',
    },
    {
      icon: <Users className='w-8 h-8 text-yellow-500' />,
      title: 'Expert Faculty & Mentorship',
      description:
        'Learn from passionate mentors who guide you personally, track your progress, and help you stay motivated throughout your journey.',
    },
    {
      icon: <Target className='w-8 h-8 text-red-600' />,
      title: 'Result-Oriented Coaching',
      description:
        'Regular mock tests, performance analysis, and focused sessions ensure you stay exam-ready and confident on the big day.',
    },
    {
      icon: <Sparkles className='w-8 h-8 text-purple-600' />,
      title: 'Interactive Learning Environment',
      description:
        'Experience fun and interactive classes that make learning enjoyable — not stressful. Build confidence while mastering concepts.',
    },
  ];

  return (
    <section className='overflow-x-hidden shadow-sm py-16 bg-linear-to-b from-blue-50 to-white'>
      <div className='max-w-6xl mx-auto px-6 text-center'>
        <h2 className='text-3xl md:text-4xl font-merriweather font-bold text-gray-900 mb-6 text-left sm:text-center'>
          What <span className='text-blue-600'>Leaders Coaching Center</span> Provides
        </h2>
        <p className='text-gray-600 text-lg max-w-3xl mx-auto mb-12 font-inter text-justify sm:text-center'>
          We empower students to achieve academic excellence through personalized attention, expert
          guidance, and a motivating learning environment.
        </p>

        <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-8'>
          {features.map((item, index) => (
            <div
              key={index}
              className='p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300'
            >
              <div className='flex flex-col items-center space-y-3'>
                <div className='p-3 bg-blue-100 rounded-full'>{item.icon}</div>
                <h3 className='text-lg font-semibold font-merriweather text-gray-900'>
                  {item.title}
                </h3>
                <p className='text-gray-600 text-sm font-inter text-left'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
