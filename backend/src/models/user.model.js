import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "To'liq ism majburiy"],
      trim: true,
      minlength: [2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"]
    },
    email: {
      type: String,
      required: [true, "Email majburiy"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email noto'g'ri formatda"]
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    refreshTokenHash: {
      type: String,
      select: false
    }
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    delete ret.refreshTokenHash;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.model("User", userSchema);
