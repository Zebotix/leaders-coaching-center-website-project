import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function PopularCourses() {
  // ✅ Temporary fallback - API fix hone tak
  const showFallback = true;

  //   if (showFallback) {
  //     return <CoursesFallback />;
  //   }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

    // ✅ Check if API URL is available
    if (!apiUrl) {
      console.warn('NEXT_PUBLIC_API_URL is not defined');
      return <CoursesFallback />;
    }

    console.log('Fetching from:', `${apiUrl}/courses`);

    const response = await fetch(`${apiUrl}/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Courses data received:', data);

    const courses: any = [];
    // data.data.popularCourses ||
    return <CoursesSection courses={courses} />;
  } catch (error) {
    console.error('Error in PopularCourses:', error);
    return <CoursesFallback />;
  }
}

// ✅ Separate component for courses section
function CoursesSection({ courses }: { courses: any[] }) {
  return (
    <section className='overflow-x-hidden min-h-[80vh] px-6 shadow-sm py-16 bg-linear-to-b from-blue-50 to-white'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold mb-4'>Popular Courses</h2>
        {courses.length > 0 && (
          <Button variant='link' className='float-right'>
            View All Courses <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>

      {courses && Array.isArray(courses) && courses.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {courses.map((course: any) => (
            <Link key={course.id} className='p-4' href={`/courses/${course.slug}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className='flex items-center gap-2'>
                    <p>{course.instructor || 'Instructor'}</p>
                    {course.isNew && (
                      <Badge className='text-gray-800 bg-yellow-400 hover:bg-yellow-300'>NEW</Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='font-[Arial] text-sm'>
                    {course.description || 'Course description not available.'}
                  </p>
                </CardContent>
                <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
                  <p className='text-lg font-bold'>${course.price || '0'}</p>
                  <Button
                    size='lg'
                    className='cursor-pointer w-full bg-accent-strong hover:bg-purple-800'
                  >
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className='text-center relative top-10'>No courses available.</p>
      )}
    </section>
  );
}

// ✅ Fallback component
function CoursesFallback() {
  return (
    <section className='overflow-x-hidden min-h-fit px-6 shadow-sm py-16 bg-linear-to-b from-blue-50 to-white'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold mb-4'>Popular Courses</h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='relative max-w-md pt-0 shadow-lg'>
            <div className='flex h-fit items-center justify-center'>
              <Image
                src='/images/courses/course.jpeg'
                alt='Course placeholder'
                width={300}
                height={300}
                className='w-75 rounded-t-xl'
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
                </p>
              </CardContent>
              <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
                <Button
                  size='lg'
                  className='cursor-pointer w-full bg-accent-strong hover:bg-purple-800'
                >
                  Add to cart
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
