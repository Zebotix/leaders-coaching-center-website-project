import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Navbar from '@/components/Navbar';
import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { cookies } from 'next/headers';
import { ThemeProvider } from '@/components/theme-provider';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
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
        <main className='w-screen flex min-h-screen flex-col'>
          <Navbar />
          {children}
        </main>
        <AppSidebar />
      </SidebarProvider>
    </ThemeProvider>
  );
}
