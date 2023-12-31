import mongoose, { Mongoose, Schema, Types, mongo } from 'mongoose';
import { Password } from '../lib/password';
import { boolean } from 'zod';



//interface that describes the properties to create a new User
export type userAttrs = {
  accountId: string;
  name?: string

  status?: string;
  image?: string;
  bio?: string,
  forgotPasswordToken?: String,
  forgotPasswordTokenExpiry?: Date,
  email: string;
  password: string ;
  role: 'owner' | 'member';
  gyms?: string[]
  isInstructor?: boolean;
isActive?: boolean



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
  name: string;
  status?: string;

  image?: string;
  bio?: string,
  forgotPasswordToken?: String,
  forgotPasswordTokenExpiry?: Date,
  email: string;
  password: string ;
  role: 'owner' | 'member';

  gyms?: string[]
  isInstructor?: boolean;
  isActive?: boolean
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
      unique: true,
      lowercase: true,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,

      
    },
    isActive: {
      type: Boolean,
    default: true
    },
name: {
  type: String,
  required: true
},
status: {
  type: String,
},

    image: {
      type: String,
    }, 
    bio: {
      type: String,
      default: ''
    },
    isInstructor: {
type: Boolean
    },
    role: {
      type: String,
      enum: ['owner', 'member'],
      default: 'member',
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,


    gyms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Gym',
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
    const password = this.get('password');
    if (typeof password === 'string') {
      const hashedPassword = await Password.toHash(password);
      this.set('password', hashedPassword);
    }
  }
  done();
});

userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<userDoc, userModel>('User', userSchema);

export { User };
