import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide the username"],
    unique: [true, "username must be unique"],
  },
  email: {
    type: String,
    required: [true, "please provide the email"],
    unique: [true, "email must be unique"],
  },
  password: {
    type: String,
    required: [true, "please provide the password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
