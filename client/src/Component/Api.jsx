const BASE_URL = "https://jobdekho-3vnx.onrender.com/api/v1";

const getUserToken = () => localStorage.getItem("userToken");
const setUserToken = (token) => {
  if (token) localStorage.setItem("userToken", token);
  else localStorage.removeItem("userToken");
};
const removeUserToken = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userData");
};

// Helper: Parse response safely
const safeJsonParse = async (response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Server returned HTML:", text.substring(0, 200));
    return { success: false, message: "Server error", htmlError: true };
  }
};

// ==========================
// JOB PORTAL LOGIN
// ==========================
export const loginApi = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await safeJsonParse(response);

    if (response.ok && data?.data?.accessToken) {
      setUserToken(data.data.accessToken);
      localStorage.setItem("userData", JSON.stringify(data.data.user));
    }

    return { response, data };
  } catch (error) {
    return {
      response: { ok: false, status: 500 },
      data: { message: "Network error" },
    };
  }
};

// ==========================
// CHECK JOB PORTAL AUTH — localStorage only
// ==========================
export const checkAuthApi = async () => {
  const savedUser = localStorage.getItem("userData");
  const token = getUserToken();

  if (!savedUser || !token) {
    return { response: { ok: false, status: 401 }, data: null };
  }

  try {
    const parsedUser = JSON.parse(savedUser);
    return {
      response: { ok: true, status: 200 },
      data: { data: { user: parsedUser } },
    };
  } catch (e) {
    return { response: { ok: false, status: 500 }, data: null };
  }
};

// ==========================
// JOB PORTAL REGISTER
// ==========================
export const registerApi = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await safeJsonParse(response);
    return { response, data };
  } catch (error) {
    return {
      response: { ok: false, status: 500 },
      data: { message: "Network error" },
    };
  }
};

// ==========================
// JOB PORTAL LOGOUT
// ==========================
export const logoutApi = async () => {
  try {
    const token = getUserToken();
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
    });
    removeUserToken();
    return true;
  } catch (error) {
    removeUserToken();
    return false;
  }
};