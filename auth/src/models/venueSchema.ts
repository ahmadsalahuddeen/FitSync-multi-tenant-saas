import mongoose, { Mongoose, Types, mongo } from 'mongoose';
import { Password } from '../lib/password';
import { Schema, boolean } from 'zod';
import { userAttrs } from './userSchema';

//interface that describes the properties to create a new Venue
export interface venueAttrs {
  accountId: string;
  name: string,
  description: string,
  isOnline: boolean
  isActive: boolean
capacity?: number 

}

// interface that describes the properties
// a Venue Model has
interface venueModel extends mongoose.Model<venueDoc> {
  build(attrs: venueAttrs): venueDoc;
}

// interface that describes the properties
// of a Venue Document
interface venueDoc extends mongoose.Document {
  accountId: string;
  name: string,
  description: string,
  isOnline: boolean
  isActive: boolean
capacity?: number 

}

const venueSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
description: {
  type: String
},
    name: {
      type: String,
      required: true,
    },
  
    gymId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gym',
    },
isActive: {
  type: Boolean,
  default: true
},
capacity: {
  type: Number,

},
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

  // Inside venueSchema
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

venueSchema.statics.build = (attrs: venueAttrs) => {
  return new Venue(attrs);
};

const Venue = mongoose.model<venueDoc, venueModel>('Venue', venueSchema);

export { Venue };


