import { userAttrs } from "../models/userSchema";

export type gymCreatorIdPopulated =  {
  accountId: string;
  name: string;
  phoneNumber: string;
  inviteEmailList?:  {
    email: string,
    role: string
  }[];
  staffs?: string[] | userAttrs[];
  creatorId: userAttrs;
  inviteCode: string;

  image?: string;
  address?: {
    streetAddressOne?: string;
    streetAddressTwo?: string;
    region?: string;
    state?: string;
    formatted?: string;
    country: string;
    timeZone?: string;
    isoCode?: string;
  };
}