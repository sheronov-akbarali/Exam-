import mongoose from "mongoose";

export const TASK_STATUSES = ["TODO", "IN_PROGRESS", "DONE"];
export const TASK_PRIORITIES = ["LOW", "MEDIUM", "HIGH"];

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: [true, "Sarlavha majburiy"],
      trim: true,
      minlength: [2, "Sarlavha kamida 2 ta belgidan iborat bo'lishi kerak"],
      maxlength: [120, "Sarlavha 120 belgidan oshmasligi kerak"]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Tavsif 1000 belgidan oshmasligi kerak"],
      default: ""
    },
    status: {
      type: String,
      enum: TASK_STATUSES,
      default: "TODO"
    },
    priority: {
      type: String,
      enum: TASK_PRIORITIES,
      default: "MEDIUM"
    },
    dueDate: {
      type: Date
    }
  },
  { timestamps: true }
);

taskSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model("Task", taskSchema);
