import mongoose, { mongo } from "mongoose";
import { Password } from "../services/password";

//interface that describes the properties to create a new User
interface userAttrs {
  email: string,
  password: string
}


// interface that describes the properties
// a User Model has
interface userModel extends mongoose.Model<userDoc> {
  build(attrs: userAttrs): userDoc;
}

// interface that describes the properties
// of a User Document
interface userDoc extends mongoose.Document {
  email: string,
  password: string
}


const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }

})

// pre hook will run whenever .save onvoked, thus hasing the password if it is modified 
userSchema.pre('save', async function (done){
  if(this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'))
    this.set('password', hashedPassword)
  }
done();
})




userSchema.statics.build = (attrs: userAttrs) => {
return new User(attrs)
}


const User = mongoose.model<userDoc, userModel>('User', userSchema)


const salah = User.build({ email: 'asdfl', password: 'asdlfk' })


export { User }

