import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const certificateSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
  completedOn: {
    type: Date,
    default: Date.now,
  },
});

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
  wishlist: [wishlistSchema],
  certificates: [certificateSchema],
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
