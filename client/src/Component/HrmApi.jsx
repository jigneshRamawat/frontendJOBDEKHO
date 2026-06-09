// HrmApi.jsx
import axios from "axios";

const BASE_URL =
  "https://jobdekho-3vnx.onrender.com/api/v1";

const hrmApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const registerCompanyApi = async (companyData) => {
  try {
    const response = await hrmApi.post(
      "/company/companyprofile",
      companyData
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Company registration failed",
    };
  }
};

export default hrmApi;