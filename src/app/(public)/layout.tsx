import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Navbar from '@/components/layout/Navbar';
import React from 'react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { cookies, headers } from 'next/headers';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/layout/Footer';
import ContactButton from '@/components/ContactButton';
import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export default async function PublicLayout(
  { children }: { children: React.ReactNode },
  request: NextRequest
) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  //   const session = await auth.api.getSession({
  //     headers: await headers(), // you need to pass the headers object.
  //   });

  //   console.log('user session', session);
  return (
    <main className='container'>
      <ThemeProvider attribute='data-theme' defaultTheme='system' enableSystem={true}>
        <SidebarProvider
          className='overflow-hidden'
          style={
            {
              // '--sidebar-width': '20rem',
              // '--sidebar-width-mobile': '20rem',
            }
          }
          defaultOpen={defaultOpen}
        >
          <div className='w-screen flex min-h-screen flex-col'>
            <Navbar />
            {children}
            <ContactButton />
            <Footer />
          </div>
          <AppSidebar />
        </SidebarProvider>
      </ThemeProvider>
    </main>
  );
}
