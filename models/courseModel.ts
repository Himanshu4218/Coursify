import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a course name"],
    },
    image: {
      type: String,
      required: [true, "Please provide a course image"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a course price"],
    },
    category: {
      type: String,
      required: [true, "Please provide a course category"],
    },
    description: {
      type: String,
      required: [true, "Please provide a course description"],
    },
    skills: {
      type: [String],
      required: [true, "Please provide a course skills"],
    },
    language: {
      type: String,
      required: [true, "Please provide a course language"],
    },
    level: {
      type: String,
    },
    duration: {
      type: Number,
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Course =
  mongoose.models.courses || mongoose.model("courses", courseSchema);

export default Course;
