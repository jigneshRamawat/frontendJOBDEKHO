const BASE_URL = "https://jobdekho-3vnx.onrender.com/api/v1";

// ==========================
// HRMS LOGIN (Only company/hr/employee roles)
// ==========================
export const loginCompanyApi = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/company/login`, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...credentials,
        portalType: "hrms", // Tell backend this is HRMS login
      }),
    });

    const data = await response.json();

    // Frontend validation: Reject if role is regular user
    if (response.ok && data?.data?.user?.role === "user") {
      return {
        response: { ok: false, status: 403 },
        data: { message: "Job seekers cannot access HRMS. Please use Job Portal." },
      };
    }

    return { response, data };
  } catch (error) {
    console.error("HRMS Login API Error:", error);
    throw error;
  }
};

// ==========================
// COMPANY REGISTER
// ==========================
export const registerCompanyApi = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/company/register`, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...payload,
        portalType: "hrms",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || `Validation Failed (${response.status})`,
      };
    }

    return { success: true, ...data };
  } catch (error) {
    return {
      success: false,
      message: "Network request failed. Check server status.",
    };
  }
};

// ==========================
// CHECK HRMS AUTH
// ==========================
export const checkCompanyAuthApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/company/me`, {
      method: "GET",
      headers: {
        "accept": "*/*",
      },
      credentials: "include",
    });

    const data = await response.json();

    // Reject if Job Portal user tries to access HRMS
    if (response.ok && data?.data?.user?.role === "user") {
      return { response: { ok: false, status: 403 }, data: null };
    }

    return { response, data };
  } catch (error) {
    console.error("Company Auth Check Error:", error);
    return { response: { ok: false, status: 500 }, data: null };
  }
};

// ==========================
// HRMS LOGOUT
// ==========================
export const logoutCompanyApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/company/logout`, {
      method: "POST",
      headers: {
        "accept": "*/*",
      },
      credentials: "include",
    });
    return response.ok;
  } catch (error) {
    console.error("HRMS Logout Error:", error);
    throw error;
  }
};

// ==========================
// CREATE HR
// ==========================
export const createHrApi = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/company/hr`, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return { response, data };
  } catch (error) {
    console.error("Create HR Error:", error);
    throw error;
  }
};