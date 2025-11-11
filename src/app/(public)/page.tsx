import WhatLeadersCoachingCenterProvides from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import OurExpperts from '@/components/home/OurExpperts';
import PopularCourses from '@/components/home/PopularCourses';
import React from 'react';

export default function Home() {
  return (
    <section className='py-4'>
      <Hero />
      <PopularCourses />
      <OurExpperts />
      <WhatLeadersCoachingCenterProvides />
    </section>
  );
}
