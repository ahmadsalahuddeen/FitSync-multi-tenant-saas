import mongoose, { mongo } from 'mongoose';
import { Password } from '../services/password';

//interface that describes the properties to create a new Gym
interface gymAttrs {
  accountId: string
  gymCode: string;
  invideCode: string;
  name: string;
  slug: string;
}

// interface that describes the properties
// a Gym Model has
interface gymModel extends mongoose.Model<gymDoc> {
  build(attrs: gymAttrs): gymDoc;
}

// interface that describes the properties
// of a Gym Document
interface gymDoc extends mongoose.Document {
  accountId: string
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  country?: string;
  phoneNumber: string;
  activeCustomers: string;
  refer?: string;
}

const gymSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    businessName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
    country: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    activeCustomers: {
      type: String,
      required: true,
    },
    refer: {
      type: String,
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

// pre hook will run whenever .save onvoked, thus hasing the password if it is modified
gymSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

gymSchema.statics.build = (attrs: gymAttrs) => {
  return new Gym(attrs);
};

const Gym = mongoose.model<gymDoc, gymModel>('Gym', gymSchema);

export { Gym };
