import { createContext, useEffect, useState } from "react";
import Loader from "../../Reuse/Loader";
import { toast } from "react-hot-toast";

import {
  checkAuthApi,
  loginApi,
  registerApi,
  logoutApi,
} from "../Api.jsx";

import {
  registerCompanyApi,
  verifyCompanyEmailApi,
  resendCompanyOtpApi,
  loginCompanyApi,
  checkCompanyAuthApi,
  logoutCompanyApi,
} from "../HrmApi.jsx";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userAuthLoading, setUserAuthLoading] = useState(false);

  const [companyUser, setCompanyUser] = useState(null);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [companyAuthLoading, setCompanyAuthLoading] = useState(false);

  // Check auth on mount — sessionStorage only
  useEffect(() => {
    checkBothAuths();
  }, []);

  const checkBothAuths = async () => {
    try {
      // Job Portal — sessionStorage
      const userResponse = await checkAuthApi();
      if (userResponse.response.ok && userResponse.data) {
        const userData = userResponse.data?.data?.user || null;
        setUser(userData?.role === "user" ? userData : null);
      } else {
        setUser(null);
      }

      // HRMS — sessionStorage (no /company/me API)
      const companyResponse = await checkCompanyAuthApi();
      if (companyResponse.response.ok && companyResponse.data) {
        const companyData = companyResponse.data?.data?.user || null;
        setCompanyUser(companyData);
      } else {
        setCompanyUser(null);
      }
    } catch (error) {
      console.error("Auth Check Error:", error);
      setUser(null);
      setCompanyUser(null);
    } finally {
      setUserLoading(false);
      setCompanyLoading(false);
    }
  };

  // ==========================
  // JOB PORTAL LOGIN
  // ==========================
  const loginUser = async (credentials) => {
    try {
      setUserAuthLoading(true);
      const { response, data } = await loginApi(credentials);

      if (response.ok) {
        const loggedInUser = data?.data?.user || null;
        if (["company", "hr", "employee"].includes(loggedInUser?.role)) {
          toast.error("Company accounts must use HRMS portal");
          return { success: false, message: "Please login at HRMS portal" };
        }
        setUser(loggedInUser);
        toast.success(`Welcome ${loggedInUser?.name || "User"}!`);
        return { success: true, user: loggedInUser, role: loggedInUser?.role, message: data?.message };
      }

      toast.error(data?.message || "Login failed");
      return { success: false, message: data?.message };
    } catch (error) {
      toast.error("Something went wrong during login");
      return { success: false, message: "Something went wrong" };
    } finally {
      setUserAuthLoading(false);
    }
  };

  // ==========================
  // JOB PORTAL REGISTER
  // ==========================
  const registerUser = async (formData) => {
    try {
      setUserAuthLoading(true);
      const { response, data } = await registerApi({ ...formData, role: "user" });

      if (response.ok) {
        toast.success("Account created!");
        return await loginUser({ email: formData.email, password: formData.password });
      }

      toast.error(data.message || "Registration failed");
      return { success: false };
    } catch (error) {
      toast.error("Something went wrong");
      return { success: false };
    } finally {
      setUserAuthLoading(false);
    }
  };

  // ==========================
  // JOB PORTAL LOGOUT
  // ==========================
  const logoutUser = async () => {
    try {
      setUserAuthLoading(true);
      await logoutApi();
      setUser(null);
      toast.success("Logged out successfully");
      return { success: true };
    } catch (error) {
      toast.error("Logout failed");
      return { success: false };
    } finally {
      setUserAuthLoading(false);
    }
  };

  // ==========================
  // HRMS: COMPANY REGISTER
  // ==========================
  const registerCompany = async (payload) => {
    try {
      setCompanyAuthLoading(true);
      const data = await registerCompanyApi(payload);

      if (data?.success === false) {
        toast.error(data.message || "Company registration failed");
        return { success: false };
      }

      if (data?.message?.toLowerCase().includes("otp") || data?.otpSent) {
        toast.success(data.message || "OTP sent!");
        return { success: true, data, otpSent: true };
      }

      toast.success("Company registered successfully");
      return { success: true, data };
    } catch (error) {
      toast.error("Company registration error");
      return { success: false };
    } finally {
      setCompanyAuthLoading(false);
    }
  };

  // ==========================
  // HRMS: VERIFY OTP
  // ==========================
  const verifyCompanyOtp = async (email, otp) => {
    try {
      const { response, data } = await verifyCompanyEmailApi(email, otp);
      if (response.ok && data?.success) {
        toast.success("Email verified!");
        return { success: true, data };
      }
      toast.error(data?.message || "OTP verification failed");
      return { success: false, message: data?.message };
    } catch (error) {
      toast.error("OTP verification error");
      return { success: false, message: "Something went wrong" };
    }
  };

  // ==========================
  // HRMS: RESEND OTP
  // ==========================
  const resendCompanyOtp = async (email) => {
    try {
      const { response, data } = await resendCompanyOtpApi(email);
      if (response.ok) {
        toast.success("New OTP sent!");
        return { success: true, data };
      }
      toast.error(data?.message || "Failed to resend OTP");
      return { success: false };
    } catch (error) {
      toast.error("Error resending OTP");
      return { success: false };
    }
  };

  // ==========================
  // HRMS: LOGIN
  // ==========================
  const loginCompany = async (credentials) => {
    try {
      setCompanyAuthLoading(true);
      const { response, data } = await loginCompanyApi(credentials);

      if (response.ok) {
        const loggedInUser = data?.data?.user || null;

        if (loggedInUser?.role === "user") {
          toast.error("Job seekers cannot access HRMS");
          return { success: false, message: "Please use Job Portal" };
        }

        setCompanyUser(loggedInUser);
        toast.success(`Welcome ${loggedInUser?.name || "User"}!`);
        return { success: true, user: loggedInUser, role: loggedInUser?.role, message: data?.message };
      }

      toast.error(data?.message || "HRMS Login failed");
      return { success: false, message: data?.message };
    } catch (error) {
      toast.error("HRMS Login error");
      return { success: false, message: "Something went wrong" };
    } finally {
      setCompanyAuthLoading(false);
    }
  };

  // ==========================
  // HRMS: LOGOUT
  // ==========================
  const logoutCompany = async () => {
    try {
      setCompanyAuthLoading(true);
      await logoutCompanyApi();
      setCompanyUser(null);
      toast.success("Logged out from HRMS");
      return { success: true };
    } catch (error) {
      toast.error("HRMS Logout failed");
      return { success: false };
    } finally {
      setCompanyAuthLoading(false);
    }
  };

  if (userLoading || companyLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loader />
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        user, setUser, userAuthLoading, loginUser, registerUser, logoutUser,
        companyUser, setCompanyUser, companyAuthLoading, companyLoading,
        registerCompany, verifyCompanyOtp, resendCompanyOtp, loginCompany, logoutCompany,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const AppContect = AppContext;
export { AppProvider };