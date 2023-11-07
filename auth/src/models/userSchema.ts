import mongoose, { Mongoose, Schema, Types, mongo } from 'mongoose';
import { Password } from '../services/password';

type GymInfo = {
  gymId: Types.ObjectId; // Type for Schema.Types.ObjectId
  gymName: string;
}

//interface that describes the properties to create a new User
interface userAttrs {
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'owner' | 'member';
  gyms: GymInfo[]

}

// interface that describes the properties
// a User Model has
interface userModel extends mongoose.Model<userDoc> {
  build(attrs: userAttrs): userDoc;
}

// interface that describes the properties
// of a User Document
interface userDoc extends mongoose.Document {
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'owner' | 'member';
  gyms: GymInfo[]
}

const userSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
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
    role: {
      type: String,
      enum: ['owner', 'member'],
      default: 'member',
    },
    gyms: [
      {
        gymId: {
          type: Schema.Types.ObjectId,
          ref: 'Gym',
          required: true,
        },
        gymName: {
          type: String,
        },
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },

  {
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
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<userDoc, userModel>('User', userSchema);

export { User };
