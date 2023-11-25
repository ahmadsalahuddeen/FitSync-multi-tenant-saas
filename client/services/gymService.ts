import axios from "@/lib/axios";

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


export function getAllGyms(){
return axios.get<Gym[]>('/api/gym/gym').then(res => res.data)

}