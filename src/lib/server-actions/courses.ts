'use server';

export async function getCourses() {
  try {
    // Instead of hitting API route, we directly return mock data (or DB)
    const mockCourses = [
      {
        id: 1,
        title: 'Web Development Bootcamp',
        instructor: 'John Doe',
        price: 99,
        slug: 'web-development-bootcamp',
        description: 'Learn full-stack web development from scratch',
        isNew: true,
      },
      {
        id: 2,
        title: 'Data Science Fundamentals',
        instructor: 'Jane Smith',
        price: 129,
        slug: 'data-science-fundamentals',
        description: 'Introduction to data science and machine learning',
        isNew: false,
      },
      {
        id: 3,
        title: 'Mobile App Development',
        instructor: 'Mike Johnson',
        price: 89,
        slug: 'mobile-app-development',
        description: 'Build cross-platform mobile applications',
        isNew: true,
      },
      {
        id: 4,
        title: 'UI/UX Design Masterclass',
        instructor: 'Sarah Wilson',
        price: 79,
        slug: 'ui-ux-design-masterclass',
        description: 'Master user interface and experience design',
        isNew: false,
      },
    ];

    return {
      statusCode: 200,
      success: true,
      message: 'Courses fetched successfully',
      data: {
        courses: mockCourses,
        popularCourses: mockCourses.slice(0, 2),
      },
    };
  } catch (err: any) {
    console.error('[Server Action Error]', err);
    return {
      statusCode: 500,
      success: false,
      message: err?.message || 'Something went wrong!',
    };
  }
}
