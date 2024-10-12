import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please enter your name!'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email!'],
      unique: true,
      validate: [validator.isEmail, 'please enter a valid email!'],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    bannerImg: {
      type: String,
      default: '',
    },
    headline: {
      type: String,
      default: 'LinkedIn User',
    },
    location: {
      type: String,
      default: 'earth',
    },
    about: {
      type: String,
      default: '',
    },
    skills: [String],

    experience: [
      {
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    education: [
      {
        school: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number,
      },
    ],
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  console.log(`inside the userschema pre function`);

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
export default User;
