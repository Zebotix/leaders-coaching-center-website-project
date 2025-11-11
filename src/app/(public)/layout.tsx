import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Navbar from '@/components/layout/Navbar';
import React from 'react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { cookies } from 'next/headers';
import { ThemeProvider } from '@/components/theme-provider';
import Footer from '@/components/layout/Footer';
import ContactButton from '@/components/ContactButton';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <main>
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
