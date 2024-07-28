const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createTaskQuery = async (newTask) => {
  const response = await fetch(`${API_URL}/api/task/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  if (!response.ok) {
    throw new Error("Failed to create task");
  }
  return response.json();
};

export const getTasksQuery = async (userId) => {
  const response = await fetch(`${API_URL}/api/task/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
};

export const deleteTaskQuery = async (taskId) => {
  const response = await fetch(`${API_URL}/api/task/delete/${taskId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};

export const updateTaskQuery = async (taskId, taskData) => {
  const response = await fetch(`${API_URL}/api/task/update/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  return response.json();
};
