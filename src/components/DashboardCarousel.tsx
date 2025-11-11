'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function DashboardCarousel() {
  const autoplay = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const slides = [
    {
      title: 'Annual Sports Day',
      description: 'Celebrating teamwork and achievements with our amazing students!',
      image: '/images/memories/sports-day.jpeg',
    },
    {
      title: 'Science Exhibition',
      description: 'Students showcasing creativity and innovation in science projects.',
      image: '/images/memories/science-exhibition.jpeg',
    },
    {
      title: 'Matric Result Ceremony',
      description: 'Congratulations to all high achievers — you made us proud!',
      image: '/images/memories/result-ceremony.jpeg',
    },
    {
      title: 'Important Announcement',
      description: 'New admissions for 2025 are now open! Apply before Dec 10.',
      image: '/images/memories/admissions-open.jpeg',
    },
    {
      title: 'Teacher’s Day',
      description: 'Honoring our mentors who inspire learning every day.',
      image: '/images/memories/teachers-day.jpeg',
    },
  ];

  return (
    <div className='w-full flex justify-center'>
      <Carousel
        className='w-full max-w-8xl rounded-xl overflow-hidden shadow-lg relative group'
        plugins={[autoplay.current]}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <Card className='relative border-none shadow-none'>
                <CardContent className='p-0'>
                  <div
                    className='relative w-full 
                    h-[400px] lg:h-[570px]'
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className='object-cover'
                      priority={index === 0}
                    />

                    {/* Overlay */}
                    <div
                      className='absolute inset-0 bg-black/50 
                      flex flex-col justify-end 
                      px-3 py-4 sm:px-6 sm:py-6 
                      text-white'
                    >
                      <h2 className='text-base sm:text-lg md:text-2xl font-bold leading-tight'>
                        {slide.title}
                      </h2>
                      <p className='text-xs sm:text-sm md:text-base opacity-90'>
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Navigation Arrows */}
        <CarouselPrevious
          className='cursor-pointer absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
          opacity-0 group-hover:opacity-100 transition 
          bg-white/80 hover:bg-white text-gray-700 shadow-md 
          rounded-full size-8 sm:size-10 flex items-center justify-center'
        />
        <CarouselNext
          className='cursor-pointer absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 
          opacity-0 group-hover:opacity-100 transition 
          bg-white/80 hover:bg-white text-gray-700 shadow-md 
          rounded-full size-8 sm:size-10 flex items-center justify-center'
        />
      </Carousel>
    </div>
  );
}
