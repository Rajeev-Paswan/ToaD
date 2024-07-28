const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginQuery = async (credentials) => {
  const response = await fetch(`${API_URL}/api/users/auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};

export const registerQuery = async (credentials) => {
  const response = await fetch(`${API_URL}/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
};

export const logoutQuery = async () => {
  const response = await fetch(`${API_URL}/api/users/logout/`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
};
