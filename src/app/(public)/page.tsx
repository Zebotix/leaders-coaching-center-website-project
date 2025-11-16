import FAQComponent from '@/components/faqs';
import AboutSection from '@/components/home/About';
import Contact from '@/components/home/Contact';
import WhatLeadersCoachingCenterProvides from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import OurExpperts from '@/components/home/OurExpperts';
import PopularCourses from '@/components/home/PopularCourses';
import Resources from '@/components/home/Resources';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <section className='overflow-x-hidden py-2'>
      <Hero />

      {/* <PopularCourses /> */}
      <AboutSection />
      <OurExpperts />
      <WhatLeadersCoachingCenterProvides />
      <Resources />
      <Testimonials />
      <FAQComponent />
      <Contact />
    </section>
  );
}
