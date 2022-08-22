// A mock function to mimic making an async request for data
/* export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
} */

import { Task } from "./tasksSlice";

const endpoint = "https://63026d6c9eb72a839d6f833d.mockapi.io/api/v1"

export const getTasks = async () => {
  const rawResponse = await fetch(`${endpoint}/Tasks`);
  const response = await rawResponse.json();
  return response;
}

export const createTask = async (task: Task) => {
  await fetch(`${endpoint}/Tasks`, {
    method: "POST",
    body: JSON.stringify(task)
  });
}

export const changeTask = async (id: number, done: boolean) => {
  await fetch(`${endpoint}/${id}/Tasks`, {
    method: "PUT",
    body: JSON.stringify({ done })
  });
}
