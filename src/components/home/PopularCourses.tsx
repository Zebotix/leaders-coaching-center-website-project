import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default async function PopularCourses() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add revalidation if needed
      next: {
        revalidate: 60, // Revalidate every 60 seconds
        // or use tags: ['courses']
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    const data = await response.json();
    console.log(data.data);

    return (
      <section className='min-h-fit px-6 shadow-sm py-16 bg-linear-to-b from-blue-50 to-white'>
        <div className='flex justify-between items-center'>
          <h2 className='text-3xl font-bold mb-4'>Popular Courses</h2>
          {Array.isArray(data.popularCourses) && data.popularCourses.length > 0 && (
            <Button variant='link' className='float-right'>
              View All Courses <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
        {Array.isArray(data.popularCourses) && data.popularCourses.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {data.courses.map((course: any) => (
              <Link key={course.id} className='p-4' href={`/courses/${course.slug}`}>
                <Card>
                  {/* Add course content here */}
                  <h3 className='font-semibold'>{course.title}</h3>
                  <p className='text-sm text-gray-600'>{course.instructor}</p>
                  <p className='text-lg font-bold'>${course.price}</p>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          // add dummy cards without any link
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={Math.random() * 1000}
                className='relative max-w-md rounded-xl bg-linear-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg'
              >
                <div className='flex h-60 items-center justify-center'>
                  <Image
                    src='/images/courses/course.jpeg'
                    alt='Shoes'
                    width={300}
                    height={300}
                    className='w-75 '
                  />
                </div>
                <Card className='border-none'>
                  <CardHeader>
                    <CardTitle>Course {index + 1}</CardTitle>
                    <CardDescription className='flex items-center gap-2'>
                      <p>Instructor Name: John Doe</p>
                      <Badge className='text-gray-800 bg-yellow-400 hover:bg-yellow-300'>NEW</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className='font-[Arial] text-sm'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla
                      facilisi.
                    </p>
                  </CardContent>
                  <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
                    <Button size='lg' className='w-full bg-accent-strong hover:bg-purple-800'>
                      Add to cart
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  } catch (error) {
    console.error('Error fetching popular courses:', error);
    return (
      <section className='min-h-fit py-4 shadow-sm'>
        <div className='flex justify-between items-center'>
          <h2 className='text-3xl font-bold mb-4'>Popular Courses</h2>
        </div>
        <p className='text-center'>Failed to load popular courses. Please try again later.</p>
      </section>
    );
  }
}
