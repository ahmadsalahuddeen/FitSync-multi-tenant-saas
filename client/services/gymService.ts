import useAxiosAuth from "@/hooks/useAxiosAuth";
import { gymcreationSchema } from "@/validators/auth";
import { ICountry } from "country-state-city";
import { toast } from "sonner";
import { z } from "zod";
const axiosAuth = useAxiosAuth()


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





