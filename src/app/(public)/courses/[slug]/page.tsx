import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
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

  if (!response.ok) throw new Error('Failed to fetch courses for metadata');

  const data = await response.json();
  const course = data.data.courses.find((course: any) => course.slug === slug);

  if (course)
    return {
      title: course.title,
      description: course.description,
    };

  if (!course)
    return {
      title: `Course - ${slug}`,
      description: `Details and information about the course: ${slug}`,
    };

  return {
    title: `Course - ${slug}`,
    description: `Details and information about the course: ${slug}`,
  };
}

export default async function CourseSlug({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  return <div>CourseSlug</div>;
}

export async function generateStaticParams({ params }: { params: Promise<{ slug: string }> }) {
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
    if (!response.ok) {
      throw new Error('Failed to fetch courses for static params');
    }
    const data = await response.json();

    return data.data.courses?.map((course: any) => ({
      slug: course.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}
