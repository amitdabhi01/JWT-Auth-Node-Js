import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => {
      if (!value.endsWith("@gmail.com")) {
        throw new Error("Email must be gmail");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate: (value) => {
      if (!value.toLowerCase() === "password") {
        throw new Error("password can't contain password word as a password");
      }
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
