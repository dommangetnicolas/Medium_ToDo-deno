import db from "../utils/db.ts";
import { Collection, ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

export interface TaskSchema {
  _id: {
    $oid: ObjectId;
  };
  title: String;
  done: boolean;
  createdAt: Date;
}

const Task: Collection = db.collection("Tasks");

export default Task;
