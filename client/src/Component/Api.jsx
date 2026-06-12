const BASE_URL = "https://jobdekho-3vnx.onrender.com/api/v1";

// ==========================
// JOB PORTAL LOGIN (Only users with role: "user")
// ==========================
export const loginApi = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...credentials,
        portalType: "jobportal", // Tell backend this is Job Portal login
      }),
    });

    const data = await response.json();

    // Frontend validation: Reject if role is company/hr/employee
    if (response.ok && ["company", "hr", "employee"].includes(data?.data?.user?.role)) {
      return {
        response: { ok: false, status: 403 },
        data: { message: "Please use HRMS portal for company accounts" },
      };
    }

    return { response, data };
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};

// ==========================
// JOB PORTAL REGISTER (Force role: "user")
// ==========================
export const registerApi = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...formData,
        role: "user", // Force role to user
        portalType: "jobportal",
      }),
    });

    const data = await response.json();
    return { response, data };
  } catch (error) {
    console.error("Register API Error:", error);
    throw error;
  }
};

// ==========================
// CHECK JOB PORTAL AUTH
// ==========================
export const checkAuthApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "accept": "*/*",
      },
      credentials: "include",
    });

    const data = await response.json();

    // Reject if HRMS user tries to access Job Portal
    if (response.ok && ["company", "hr", "employee"].includes(data?.data?.user?.role)) {
      return { response: { ok: false, status: 403 }, data: null };
    }

    return { response, data };
  } catch (error) {
    console.error("Auth Check Error:", error);
    return { response: { ok: false, status: 500 }, data: null };
  }
};

// ==========================
// JOB PORTAL LOGOUT
// ==========================
export const logoutApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "accept": "*/*",
      },
      credentials: "include",
    });
    return response.ok;
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};