

import { Icon, Icons } from '@/components/icons';
import { SideNavItem } from '@/types/types';




export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    href: '/dashboard',
    icon:  <Icons.home className=" h-4 w-4"/>,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: <Icons.chevronLeft className="mr-2 h-4 w-4" />,
    submenu: true,
    subMenuItems: [
      { title: 'All', href: '/projects' },
      { title: 'Web Design', href: '/projects/web-design' },
      { title: 'Graphic Design', href: '/projects/graphic-design' },
    ],
  },
  {
    title: 'Messages',
    href: '/messages',
    icon:<Icons.media className=" h-4 w-4"/>,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Icons.settings className=" h-4 w-4"/>,
    submenu: true,
    subMenuItems: [
      { title: 'Account', href: '/settings/account' },
      { title: 'Privacy', href: '/settings/privacy' },
    ],
  },
  {
    title: 'Help',
    href: '/help',
    icon:<Icons.help className=" h-4 w-4"/>,
  },
];