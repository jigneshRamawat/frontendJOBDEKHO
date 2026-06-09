const BASE_URL =
  "https://jobdekho-3vnx.onrender.com/api/v1/auth";

export const checkAuthApi =
  async () => {
    const response = await fetch(
      `${BASE_URL}/current-user`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    return { response, data };
  };

export const loginApi = async (credentials) => {
  const response = await fetch(
    `${BASE_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    }
  );

  const data = await response.json();
  return { response, data };
};

export const registerApi = async (formData) => {
  const response = await fetch(
    `${BASE_URL}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...formData,
        role: formData.role || "user",
      }),
    }
  );

  const data = await response.json();
  return { response, data };
};

export const logoutApi = async () => {
  const response = await fetch(
    `${BASE_URL}/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  return response;
};