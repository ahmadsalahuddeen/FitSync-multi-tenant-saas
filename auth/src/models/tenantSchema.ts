import mongoose, { mongo } from 'mongoose';
import { Password } from '../services/password';

//interface that describes the properties to create a new Tenant
interface tenantAttrs {
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
// a Tenant Model has
interface tenantModel extends mongoose.Model<tenantDoc> {
  build(attrs: tenantAttrs): tenantDoc;
}

// interface that describes the properties
// of a Tenant Document
interface tenantDoc extends mongoose.Document {
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

const tenantSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    
  businessName : {
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
  confirmPassword : {
    type: String,

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
tenantSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

tenantSchema.statics.build = (attrs: tenantAttrs) => {
  return new Tenant(attrs);
};

const Tenant = mongoose.model<tenantDoc, tenantModel>('Tenant', tenantSchema);

export { Tenant };
