

import { Icon, Icons } from '@/components/icons';
import { SideNavItem } from '@/types/types';




export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    href: '/dashboard',
    icon:  <Icons.home className=" h-4 w-4"/>,
  },
  {
    title: 'Staff',
    href: '/staff',
    icon: <Icons.key className="mr-2 h-4 w-4" />,
    submenu: true,
    subMenuItems: [
      { title: 'Trainer Availability', href: '/staff/availability' },
     
    ],
  },
  {
    title: 'Customers',
    href: '/customers',
    icon:<Icons.users className=" h-4 w-4"/>,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Icons.settings className=" h-4 w-4"/>,
    submenu: true,
    subMenuItems: [
      { title: 'Billing', href: '/settings/billing' },
    ],
  },
  {
    title: 'My personal Profile',
    href: '/user-profile',
    icon:<Icons.user className=" h-4 w-4"/>,
  },
];