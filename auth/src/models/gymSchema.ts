import mongoose, { Types, mongo } from 'mongoose';
import { Password } from '../services/password';
import { Schema } from 'zod';

//interface that describes the properties to create a new Gym
interface gymAttrs {
  accountId: string;
  name: string;
  phoneNumber: string;
  users?: Types.ObjectId[];
  image?: string

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
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
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
