import Todo, { TodoSchema } from "../models/Todo.ts";
import checkOid from "../utils/checkOid.ts";

/**
 * Get all tasks
 * @param param0 
 */
export const getTasks = async ({ response }: { response: any }) => {
  const todos = await Todo.find();

  response.status = 200;
  response.body = { todos };
};

/**
 * Create a task
 * @param param0
 */
export const createTask = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { error: "Invalid data" };
    return;
  }

  const {
    value: { title },
  } = await request.body();

  const todo: TodoSchema = {
    title,
    done: false,
    createdAt: new Date(),
  };

  await Todo.insertOne(todo);

  response.status = 201;
};

/**
 * Delete a task
 * @param param0
 */
export const deleteTask = async ({
  params,
  response,
}: {
  params: { id?: String };
  response: any;
}) => {
  const { id } = params;

  if (!id || !checkOid(id.toString())) {
    response.status = 400;
    response.body = { error: "Invalid data" };
    return;
  }

  const todo = await Todo.findOne({ _id: { $oid: id } });

  if (!todo) {
    response.body = 404;
    response.body = { error: "Task not found" };
    return;
  }

  Todo.deleteOne({ _id: { $oid: id } });

  response.status = 200;
};
