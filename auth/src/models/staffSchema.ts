import mongoose, { mongo } from 'mongoose';
import { Password } from '../services/password';

//interface that describes the properties to create a new User
interface userAttrs {
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  country?: string;
  phoneNumber: string;
  activeCustomers: string;
  refer: string;
}

// interface that describes the properties
// a User Model has
interface userModel extends mongoose.Model<userDoc> {
  build(attrs: userAttrs): userDoc;
}

// interface that describes the properties
// of a User Document
interface userDoc extends mongoose.Document {
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
  isOwner?: boolean 
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    
  firstName : {
    type: String,
    required: true,
  },
  lastName : {
    type: String,
    required: true,
  },
  country : {
    type: String,

  },
  phoneNumber : {
    type: String,
    required: true,
  },
  activeCustomers : {
    type: String,
    required: true,
  },
  refer : {
    type: String,

  },
    role: {
      type: String,
      default: 'trainer'
    }
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
