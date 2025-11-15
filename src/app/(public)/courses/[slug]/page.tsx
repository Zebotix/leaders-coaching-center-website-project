import { getCourses } from '@/lib/server-actions/courses';

// -------------------------
// Metadata (NO fetch needed)
// -------------------------
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await getCourses();
  if (!res.success) {
    return {
      title: 'Course Details',
      description: 'Course information',
    };
  }

  const course = res?.data?.courses.find((c: any) => c.slug === slug);

  if (course) {
    return {
      title: course.title,
      description: course.description,
    };
  }

  return {
    title: `Course - ${slug}`,
    description: `Details and information about the course: ${slug}`,
  };
}

// -------------------------
// Static Params (No fetch)
// -------------------------
export async function generateStaticParams() {
  const res = await getCourses();

  if (!res.success || !res.data?.courses) return [];

  return res.data.courses.map((course: any) => ({
    slug: course.slug,
  }));
}

// -------------------------
// Page Component
// -------------------------
export default async function CourseSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await getCourses();
  const course = res?.data?.courses.find((c: any) => c.slug === slug);

  if (!course) {
    return <div className='p-6'>Course not found.</div>;
  }

  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold'>{course.title}</h1>
      <p className='mt-2 text-gray-700'>{course.description}</p>

      <div className='mt-4'>
        <p>Instructor: {course.instructor}</p>
        <p>Price: ${course.price}</p>
      </div>
    </div>
  );
}
