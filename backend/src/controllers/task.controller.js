import Task, { TASK_PRIORITIES, TASK_STATUSES } from "../models/task.model.js";
import { AppError, asyncHandler } from "../middlewares/errorHandler.js";

const findOwnedTask = async (taskId, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError("Vazifa topilmadi", 404);
  }

  if (task.userId.toString() !== userId.toString()) {
    throw new AppError("Bu vazifaga ruxsatingiz yo'q", 403);
  }

  return task;
};

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ data: tasks });
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await findOwnedTask(req.params.id, req.user._id);
  res.json({ data: task });
});

export const createTask = asyncHandler(async (req, res) => {
  const { title, description = "", priority = "MEDIUM", dueDate } = req.body;

  if (!title?.trim()) {
    throw new AppError("Sarlavha majburiy", 400);
  }

  if (!TASK_PRIORITIES.includes(priority)) {
    throw new AppError("Muhimlik darajasi noto'g'ri", 400);
  }

  const task = await Task.create({
    userId: req.user._id,
    title,
    description,
    priority,
    dueDate: dueDate || undefined
  });

  res.status(201).json({
    data: task,
    message: "Vazifa muvaffaqiyatli yaratildi"
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await findOwnedTask(req.params.id, req.user._id);
  const allowedFields = ["title", "description", "status", "priority", "dueDate"];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      task[field] = req.body[field] || (field === "dueDate" ? undefined : req.body[field]);
    }
  });

  if (task.status && !TASK_STATUSES.includes(task.status)) {
    throw new AppError("Vazifa holati noto'g'ri", 400);
  }

  if (task.priority && !TASK_PRIORITIES.includes(task.priority)) {
    throw new AppError("Muhimlik darajasi noto'g'ri", 400);
  }

  await task.save();

  res.json({
    data: task,
    message: "Vazifa muvaffaqiyatli yangilandi"
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await findOwnedTask(req.params.id, req.user._id);
  await task.deleteOne();
  res.json({ message: "Vazifa muvaffaqiyatli o'chirildi" });
});

export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!TASK_STATUSES.includes(status)) {
    throw new AppError("Vazifa holati noto'g'ri", 400);
  }

  const task = await findOwnedTask(req.params.id, req.user._id);
  task.status = status;
  await task.save();

  res.json({
    data: task,
    message: "Vazifa holati yangilandi"
  });
});
