import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';

export default function OurExpperts() {
  const experts = [
    {
      id: 1,
      image: '/images/teachers/teacher1.jpeg',
      name: 'John Doe',
      expertise: 'Mathematics',
    },
    {
      id: 2,
      image: '/images/teachers/teacher2.jpeg',
      name: 'Jane Smith',
      expertise: 'Physics',
    },
    {
      id: 3,
      image: '/images/teachers/teacher3.jpeg',
      name: 'Alice Johnson',
      expertise: 'Chemistry',
    },
    {
      id: 4,
      image: '/images/teachers/teacher4.jpeg',
      name: 'Bob Brown',
      expertise: 'Biology',
    },
  ];
  return (
    <section className='min-h-fit px-6 shadow-sm py-16 bg-linear-to-b from-blue-50 to-white'>
      <h2 className='text-3xl font-bold mb-4'>Our Experts</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {experts.map((expert) => (
          <ExpertCard
            key={expert.id}
            image={expert.image}
            name={expert.name}
            expertise={expert.expertise}
          />
        ))}
      </div>
      {/* add some more content for experts component */}
    </section>
  );
}

export function ExpertCard(data: { image: string; name: string; expertise: string }) {
  return (
    <Card className='p-4 flex flex-col items-center text-center'>
      <Image
        src={data.image}
        alt={data.name}
        width={96}
        height={96}
        className='w-24 h-24 rounded-full mb-4 object-cover'
      />
      <h3 className='text-lg font-semibold'>{data.name}</h3>
      <p className='text-sm text-gray-600'>{data.expertise}</p>
    </Card>
  );
}
