import { Router } from "https://deno.land/x/oak/mod.ts";
import { createTask, deleteTask, getTasks } from "./controllers/tasks.ts";

const router = new Router();

router
  .post("/tasks", createTask)
  .get("/tasks", getTasks)
  .delete("/tasks/:id", deleteTask);

export default router;
