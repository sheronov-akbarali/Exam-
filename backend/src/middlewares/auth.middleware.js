import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { AppError, asyncHandler } from "./errorHandler.js";

export const protect = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new AppError("Tizimga kiring", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError("Tizimga kiring", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Token muddati tugagan", 401);
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Tizimga kiring", 401);
  }
});
