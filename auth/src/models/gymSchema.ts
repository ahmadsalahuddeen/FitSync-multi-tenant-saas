import mongoose, { Mongoose, Types, mongo } from 'mongoose';
import { Password } from '../lib/password';
import { Schema, number } from 'zod';
import { userAttrs } from './userSchema';

//interface that describes the properties to create a new Gym
export interface gymAttrs {
  accountId: string;
  name: string;
  phoneNumber: string;
  inviteEmailList?: {
    email: string;
    role: string;
  }[];
  staffs: string[] ;
  creatorId: string;
  inviteCode: string;
  venues?: string[];
customerCount?: string;
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

// interface that describes the properties
// a Gym Model has
interface gymModel extends mongoose.Model<gymDoc> {
  build(attrs: gymAttrs): gymDoc;
}

// interface that describes the properties
// of a Gym Document
interface gymDoc extends mongoose.Document {
  accountId: string;
  name: string;
  phoneNumber: string;
  staffs: string[] ;

  inviteEmailList?: {
    email: string;
    role: string;
  }[];
  creatorId: string;
  venues?: string[];
customerCount?: string;
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

const gymSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    image: {
      type: String,
    },
customerCount: {
  type: Number, 
  default: 1,
},
    name: {
      type: String,
      required: true,
    },
    inviteCode: {
      type: String,
      required: true,
    },
    venues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
      },
    ],
    // classAppointments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'ClassAppointment',
    //   },
    // ],
    // memberships: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Membership',
    //   },
    // ],
    phoneNumber: {
      type: String,
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    staffs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    inviteEmailList: [
      {
        email: String,
        role: String,
      },
    ],
    // TODO: update after creating customer logic
    // customers: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    //   }
    // ],
    address: {
      streetAddressOne: {
        type: String,
      },
      streetAddressTwo: {
        type: String,
      },
      region: {
        type: String,
      },
      state: {
        type: String,
      },
      formatted: {
        type: String,
      },
      country: {
        type: String,
      },
      timeZone: {
        type: String,
      },
      isoCode: {
        type: String,
      },
    },
  },

  // Inside gymSchema
  {
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

gymSchema.statics.build = (attrs: gymAttrs) => {
  return new Gym(attrs);
};

const Gym = mongoose.model<gymDoc, gymModel>('Gym', gymSchema);

export { Gym };
