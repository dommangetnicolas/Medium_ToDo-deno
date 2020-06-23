import Task, { TaskSchema } from "../models/Task.ts";
import checkOid from "../utils/checkOid.ts";

/**
 * Get all tasks
 * @param param0
 */
export const getTasks = async ({ response }: { response: any }) => {
  const request = await Task.find();

  const tasks = request.map(
    ({ _id: { $oid }, title, done, createdAt }: TaskSchema) => {
      return { id: $oid, title, done, createdAt };
    }
  );

  response.status = 200;
  response.body = { tasks };
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

  const task = {
    title,
    done: false,
    createdAt: new Date(),
  };

  const req = await Task.insertOne(task);

  response.status = 201;
  response.body = { task: { id: req.$oid, ...task } };
};

/**
 * Update a task
 * @param param0
 */
export const updateTask = async ({
  request,
  response,
  params,
}: {
  request: any;
  params: { id?: String };
  response: any;
}) => {
  const { id } = params;

  if (!id || !checkOid(id.toString()) || !request.hasBody) {
    response.status = 400;
    response.body = { error: "Invalid data" };
    return;
  }

  const task = await Task.findOne({ _id: { $oid: id } });

  if (!task) {
    response.body = 404;
    response.body = { error: "Task not found" };
    return;
  }

  const {
    value: { title, done },
  } = await request.body();

  await Task.updateOne({ _id: { $oid: id } }, { $set: { title, done } });

  response.status = 201;
};

/**
 * Delete a task
 * @param param0
 */
export const deleteTask = async ({
  response,
  params,
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

  const todo = await Task.findOne({ _id: { $oid: id } });

  if (!todo) {
    response.body = 404;
    response.body = { error: "Task not found" };
    return;
  }

  Task.deleteOne({ _id: { $oid: id } });

  response.status = 200;
};
