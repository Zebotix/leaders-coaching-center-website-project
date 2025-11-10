// import axios from ' ';
import { baseUrl } from '@/lib/constants';
import { MetadataRoute } from 'next';

function getStaticPaths(): string[] {
  // manually or programmatically generate list of all page paths
  const paths = [
    '/',
    '/about',
    '/contact',
    '/faqs',
    '/login',
    '/profile',
    '/admin/dashboard',
    '/courses',
    '/posts',
    '/privacy-policy',
    '/terms',
  ];
  return paths;
}

// async function getDynamicSlugs(): Promise<string[]> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/posts`,
//       {
//         // 👇 prevents Next.js from trying to prerender stale data
//         cache: 'no-store',
//       }
//     );
//     if (!res.ok) return [];
//     const posts = await res.json();
//     return posts.map((p: any) => `/blog/${p.slug}`);
//   } catch (err) {
//     console.error('Failed to fetch posts:', err);
//     return [];
//   }
// }

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = getStaticPaths();
  //   const dynamicPaths = await getDynamicSlugs();
  //   const allPaths = [...staticPaths, ...dynamicPaths];
  const allPaths = [...staticPaths];

  return allPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
