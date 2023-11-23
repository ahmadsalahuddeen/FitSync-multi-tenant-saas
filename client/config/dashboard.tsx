import { Icon, Icons } from "@/components/icons";
import { getCurrentUser } from "@/lib/session";
import { SideNavItem } from "@/types/types";
import { CreditCard } from "lucide-react";

export const menuItems = (gymId: any) => [
  {
    title: `Home`,
    href: `/dashboard/${gymId}/home`,
    disabled: false,
    icon: <Icons.home className="mr-2 h-4 w-4" />,
  },
  {
    title: `Staff`,
    href: `/dashboard/${gymId}/staff`,
    icon: <Icons.key className="mr-2 h-4 w-4" />,
    disabled: false,
    submenu: true,
    subMenuItems: [
      {
        title: `Staff Management`,
        href: `/dashboard/${gymId}/staff`,
        disabled: false,
      },
      {
        title: `Trainer Availability`,
        href: `/dashboard/${gymId}/staff/availability`,
        disabled: false,
      },
    ],
  },
  {
    title: `Customers`,
    href: `/dashboard/${gymId}/customers`,
    disabled: false,
    icon: <Icons.users className="mr-2 h-4 w-4" />,
  },
  {
    title: `Settings`,
    href: `/dashboard/${gymId}/settings`,
    disabled: false,
    icon: <Icons.settings className="mr-2 h-4 w-4" />,
  },
  {
    title: `Billing`,
    disabled: false,
    href: `/dashboard/billing`,
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
  {
    title: `My personal Profile`,
    href: `/dashboard/${gymId}/user-profile`,
    disabled: false,
    icon: <Icons.user className="mr-2 h-4 w-4" />,
  },
];

export const initalMenuItems = () => [
  
  {
    title: `Home`,
    href: `/dashboard/undefined/home`,
    disabled: false,
    icon: <Icons.home className="mr-2 h-4 w-4" />,
  },
  {
    title: `Settings`,
    href: `/dashboard/settings`,
    disabled: false,
    icon: <Icons.settings className="mr-2 h-4 w-4" />,
  },
  {
    title: `Billing`,
    href: `/dashboard/billing`,
    disabled: false,
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
  {
    title: `Account Settings`,
    href: `/dashboard/user-profile`,
    disabled: false,
    icon: <Icons.user className="mr-2 h-4 w-4" />,
  },
];
