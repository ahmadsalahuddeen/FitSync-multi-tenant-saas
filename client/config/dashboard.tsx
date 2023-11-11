

import { Icon, Icons } from '@/components/icons';
import { SideNavItem } from '@/types/types';




export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    href: '/dashboard',
    icon:  <Icons.home className="mr-2 h-4 w-4"/>,
  },
  {
    title: 'Staff',
    href: '/dashboard/staff',
    icon: <Icons.key className="mr-2 h-4 w-4" />,
    submenu: true,
    subMenuItems: [
      { title: 'Trainer Availability', href: '/dashboard/staff/availability' },
     
    ],
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon:<Icons.users className="mr-2 h-4 w-4"/>,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <Icons.settings className="mr-2 h-4 w-4"/>,
    submenu: true,
    subMenuItems: [
      { title: 'Billing', href: '/dashboard/settings/billing' },
    ],
  },
  {
    title: 'My personal Profile',
    href: '/dashboard/user-profile',
    icon:<Icons.user className="mr-2 h-4 w-4"/>,
  },
];