import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { AppError, asyncHandler } from "../middlewares/errorHandler.js";

const signAccessToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m"
  });

const signRefreshToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
  });

const createTokens = async (user) => {
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
  await user.save();
  return { accessToken, refreshToken };
};

const sanitizeUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  createdAt: user.createdAt
});

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new AppError("Ism, email va parol majburiy", 400);
  }

  if (password.length < 6) {
    throw new AppError("Parol kamida 6 ta belgidan iborat bo'lishi kerak", 400);
  }

  const exists = await User.exists({ email: email.toLowerCase() });
  if (exists) {
    throw new AppError("Bu email allaqachon ro'yxatdan o'tgan", 409);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ fullName, email, passwordHash });
  const tokens = await createTokens(user);

  res.status(201).json({
    data: sanitizeUser(user),
    tokens,
    message: "Muvaffaqiyatli ro'yxatdan o'tdingiz"
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email va parol majburiy", 400);
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash +refreshTokenHash");
  if (!user) {
    throw new AppError("Email yoki parol noto'g'ri", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new AppError("Email yoki parol noto'g'ri", 401);
  }

  const tokens = await createTokens(user);

  res.json({ data: sanitizeUser(user), tokens });
});

export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError("Refresh token majburiy", 401);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId).select("+refreshTokenHash");

    if (!user?.refreshTokenHash) {
      throw new AppError("Tizimga kiring", 401);
    }

    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!isTokenValid) {
      throw new AppError("Tizimga kiring", 401);
    }

    const tokens = await createTokens(user);
    res.json({ tokens });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Token muddati tugagan", 401);
  }
});

export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshTokenHash: "" } });
  res.json({ message: "Tizimdan chiqdingiz" });
});
