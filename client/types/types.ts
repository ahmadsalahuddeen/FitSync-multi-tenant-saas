import { Icon } from "@/components/icons"

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}


export type SideNavItem = {
  title: string;
  href: string;
  disabled: boolean,
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type gym = {
  accountId: string,
  name: string,
  
}



export type Gym = {
  id: string
  accountId: string ;
  name: string;
  phoneNumber: string;
  staffs?: string ;
  creatorId?: string ;
  image?: string
  address?: {
    streetAddressOne?: string;
    streetAddressTwo?: string;
    region?: string;
    state?: string;
    formatted?: string;
    country: string;
    timeZone?: string;
    isoCode?: string
  };

} 



