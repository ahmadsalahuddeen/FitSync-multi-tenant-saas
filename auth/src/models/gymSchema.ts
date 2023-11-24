import mongoose, { Mongoose, Types, mongo } from 'mongoose';
import { Password } from '../services/password';
import { Schema } from 'zod';

//interface that describes the properties to create a new Gym
interface gymAttrs {
  accountId: string;
  name: string;
  phoneNumber: string;
  users?: Types.ObjectId[];
  creatorId?: Types.ObjectId;
  image?: string
  address?: {
    streetAddressOne?: string;
    streetAddressTwo?: string;
    region?: string;
    state?: string;
    formatted?: string;
    country: string;
    timeZone?: string;
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
  users?: Types.ObjectId[];
  image?: string
  address?: {
    streetAddressOne?: string;
    streetAddressTwo?: string;
    region?: string;
    state?: string;
    formatted?: string;
    country: string;
    timeZone?: string;
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
      type: String
    },
    
    name: {
      type: String,
      required: true,
    },
   
    phoneNumber: {
      type: String,
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
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
    },
  },

  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);



gymSchema.statics.build = (attrs: gymAttrs) => {
  return new Gym(attrs);
};

const Gym = mongoose.model<gymDoc, gymModel>('Gym', gymSchema);

export { Gym };
