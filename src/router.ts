import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  createTask,
} from "./controllers/tasks.ts";

const router = new Router();

router
  .post("/tasks", createTask)

export default router;
