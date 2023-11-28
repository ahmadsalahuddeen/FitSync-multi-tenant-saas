import mongoose, { Schema, mongo } from 'mongoose';
import { Password } from '../lib/password';

//interface that describes the properties to create a new Account
interface accountAttrs {
  currentPeriodEnds?: Date;
  maxCustomer: number;
  subscriptionType: 'starter' | 'accelarate' | 'ultimate' | 'freeTrial';
  // gyms: string[];
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
}

// interface that describes the properties
// a Account Model has
interface accountModel extends mongoose.Model<accountDoc> {
  build(attrs: accountAttrs): accountDoc;
}

// interface that describes the properties
// of a Account Document
interface accountDoc extends mongoose.Document {
  currentPeriodEnds?: Date;
  maxCustomer: number;
  subscriptionType: 'starter' | 'accelarate' | 'ultimate' | 'freeTrial';
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
}

const accountSchema = new mongoose.Schema(
  {
    stripeCustomerId: String,

    stripeSubscriptionId: String,

    currentPeriodEnds: {
      type: Date,
    },
    maxCustomer: {
      type: Number,
    },
 
    subscriptionType: {
      type: String,
      enum: ['starter', 'accelarate', 'ultimate', 'freeTrial'],
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
accountSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

accountSchema.statics.build = (attrs: accountAttrs) => {
  return new Account(attrs);
};

const Account = mongoose.model<accountDoc, accountModel>(
  'Account',
  accountSchema
);

export { Account };
