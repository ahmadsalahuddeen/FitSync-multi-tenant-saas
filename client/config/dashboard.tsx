

import { Icon, Icons } from '@/components/icons';
import { SideNavItem } from '@/types/types';
import { CreditCard } from 'lucide-react';




export const menuItems = (gymId: any) =>  [
  {
    title: `Home`,
    href: `/dashboard/${gymId}/home`,
    icon:  <Icons.home className="mr-2 h-4 w-4"/>,
  },
  {
    title: `Staff`,
    href: `/dashboard/${gymId}/staff`,
    icon: <Icons.key className="mr-2 h-4 w-4" />,
    submenu: true,
    subMenuItems: [
      { title: `Staff Management`, href: `/dashboard/${gymId}/staff` },
      { title: `Trainer Availability`, href: `/dashboard/${gymId}/staff/availability` },
     
    ],
  },
  {
    title: `Customers`,
    href: `/dashboard/${gymId}/customers`,
    icon:<Icons.users className="mr-2 h-4 w-4"/>,
  },
  {
    title: `Settings`,
    href: `/dashboard/${gymId}/settings`,
    icon: <Icons.settings className="mr-2 h-4 w-4"/>,
  },
  {
    title: `Billing`,
    href: `/dashboard/${gymId}/settings/billing`,
    icon:<CreditCard className="mr-2 h-4 w-4"/>,
  },
  {
    title: `My personal Profile`,
    href: `/dashboard/${gymId}/user-profile`,
    icon:<Icons.user className="mr-2 h-4 w-4"/>,
  },
];
