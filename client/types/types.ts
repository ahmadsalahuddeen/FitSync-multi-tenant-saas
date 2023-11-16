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
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type gym = {
  accountId: string,
  name: string,
  
}