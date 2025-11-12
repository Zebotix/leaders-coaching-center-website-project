'use client';
import {
  Book,
  Building,
  ChevronDown,
  ChevronUp,
  Contact,
  Home,
  ListOrdered,
  MessageCircleMore,
  School,
  User2,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { Button } from '../ui/button';
import LoginButton from '../LoginButton';

export function AppSidebar() {
  const { isMobile, toggleSidebar, setOpenMobile } = useSidebar();
  const user = false;
  const router = useRouter();

  if (!isMobile) return null;

  // ✅ Common class structure
  const classes = [
    { name: '9th Class', slug: '9th' },
    { name: '10th Class', slug: '10th' },
    { name: '11th Class', slug: '11th' },
    { name: '12th Class', slug: '12th' },
  ];

  // ✅ Common sub-links
  const subLinks = [
    { label: 'MDB', path: 'mdb' },
    { label: 'Past Papers', path: 'past-papers' },
    { label: 'Assignments', path: 'assignments' },
    { label: 'Guess Papers', path: 'guess-papers' },
  ];

  const navLinks = [
    { label: 'Home', path: '/', Icon: Home },
    { label: 'About', path: '/about', Icon: Building },
    { label: 'Contact', path: '/contact', Icon: Contact },
    { label: 'FAQs', path: '/faqs', Icon: ListOrdered },
    { label: 'Exams', path: '/exams', Icon: School },
    { label: 'courses', path: '/courses', Icon: Book },
    { label: 'feed', path: '/posts', Icon: MessageCircleMore },
  ];

  return (
    <Sidebar className='z-10'>
      <SidebarHeader>
        <SidebarGroupLabel className='relative'>
          <span
            className='text-black text-3xl cursor-pointer absolute top-0 right-0'
            onClick={() => toggleSidebar()}
          >
            ×
          </span>
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map(({ label, path, Icon }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton>
                    {Icon && <Icon className='mr-2' />}
                    <Link href={path}>{label}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      Study Material
                      <ChevronDown className='ml-auto' />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className='w-56'>
                    {/* Loop through Classes */}
                    {classes.map((cls) => (
                      <DropdownMenuItem key={cls.slug} asChild>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                              {cls.name}
                              <ChevronDown className='ml-auto' />
                            </SidebarMenuButton>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent className='ml-2'>
                            {subLinks.map((link) => (
                              <DropdownMenuItem
                                key={link.path}
                                onClick={() =>
                                  router.push(`/study-material/${cls.slug}/${link.path}`)
                                }
                              >
                                {link.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 👤 Footer (User Menu) */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className='ml-auto' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <LoginButton className='w-full' />
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
