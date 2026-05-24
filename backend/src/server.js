import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fullstack-task-manager";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server http://localhost:${PORT} da ishlayapti`);
    });
  })
  .catch((error) => {
    console.error("MongoDB ulanishida xatolik:", error.message);
    process.exit(1);
  });
