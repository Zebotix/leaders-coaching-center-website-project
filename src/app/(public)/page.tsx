// import FAQComponent from '@/components/faqs';
import WhatLeadersCoachingCenterProvides from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import OurExpperts from '@/components/home/OurExpperts';
import PopularCourses from '@/components/home/PopularCourses';

export default function Home() {
  return (
    <section className='overflow-x-hidden py-2'>
      <Hero />
      <PopularCourses />
      <OurExpperts />
      <WhatLeadersCoachingCenterProvides />
      {/* <FAQComponent /> */}
    </section>
  );
}
