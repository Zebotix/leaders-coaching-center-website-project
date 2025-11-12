// @/app/api/courses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendErrorResponse, sendSuccessResponse } from '@/utils/sendResponse';

export async function GET(request: NextRequest) {
  try {
    // ✅ Temporary mock data - replace with actual database call
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

    return sendSuccessResponse(200, 'Courses fetched successfully', {
      courses: mockCourses,
      popularCourses: mockCourses.slice(0, 2),
    });
  } catch (err: any) {
    console.error('[API] error', err);
    const isNetworkErr =
      err?.message?.includes('fetch failed') ||
      err?.cause?.code === 'UND_ERR_CONNECT_TIMEOUT' ||
      err?.name === 'NeonDbError' ||
      err?.code === 'ENOTFOUND';
    if (isNetworkErr)
      return sendErrorResponse(503, isNetworkErr ? 'Service Unavailable' : err.message);
    return sendErrorResponse(500, err instanceof Error ? err.message : 'Something went wrong');
  }
}
