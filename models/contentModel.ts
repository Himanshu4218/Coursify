import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  contentType: {
    type: String,
    enum: ["video", "document", "text"],
    required: true,
  },
  videoUrl: {
    type: String,
    required: [
      {
        $cond: {
          if: { $eq: ["contentType", "video"] },
          then: true,
          else: false,
        },
      },
    ],
  },
  documentUrl: {
    type: String,
    required: [
      {
        $cond: {
          if: { $eq: ["contentType", "document"] },
          then: true,
          else: false,
        },
      },
    ],
  },
  textContent: {
    type: String,
    required: [
      {
        $cond: {
          if: { $eq: ["contentType", "text"] },
          then: true,
          else: false,
        },
      },
    ],
  },
  order: {
    type: Number,
    default: 0,
  },
  duration: {
    type: String,
    required: [
      {
        $cond: {
          if: { $eq: ["contentType", "video"] },
          then: true,
          else: false,
        },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Content =
  mongoose.models.contents || mongoose.model("contents", contentSchema);

export default Content;
