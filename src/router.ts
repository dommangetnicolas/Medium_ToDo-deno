import { Router } from "https://deno.land/x/oak/mod.ts";
import { createTask, deleteTask, getTasks, updateTask } from "./controllers/tasks.ts";

const router = new Router();

router
  .post("/tasks", createTask)
  .get("/tasks", getTasks)
  .put("/tasks/:id", updateTask)
  .delete("/tasks/:id", deleteTask);

export default router;
