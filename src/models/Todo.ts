import db from "../utils/db.ts";
import { Collection } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

export interface TodoSchema {
  title: String;
  done: boolean;
  createdAt: Date;
}

const Todo: Collection = db.collection("Todos");

export default Todo;
