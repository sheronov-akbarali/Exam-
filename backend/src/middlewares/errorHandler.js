export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

export const notFound = (req, _res, next) => {
  next(new AppError(`${req.originalUrl} topilmadi`, 404));
};

export const errorHandler = (error, _req, res, _next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Serverda xatolik yuz berdi";

  if (error.name === "CastError") {
    statusCode = 404;
    message = "Ma'lumot topilmadi";
  }

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = "Bu email allaqachon ro'yxatdan o'tgan";
  }

  res.status(statusCode).json({ statusCode, message });
};
