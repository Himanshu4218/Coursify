import mongoose from "mongoose";

const enrolledSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  progress: {
    completedSections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
    percentage: {
      type: Number,
      default: 0,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  enrolldedAt: {
    type: Date,
    default: Date.now,
  },
});

const Enrollment =
  mongoose.models.enrollments || mongoose.model("enrollments", enrolledSchema);

export default Enrollment;
