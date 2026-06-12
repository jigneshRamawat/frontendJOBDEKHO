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
  loginCompanyApi,
  checkCompanyAuthApi,
  logoutCompanyApi,
} from "../HrmApi.jsx";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  // Job Portal State
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userAuthLoading, setUserAuthLoading] = useState(false);

  // HRMS State
  const [companyUser, setCompanyUser] = useState(null);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [companyAuthLoading, setCompanyAuthLoading] = useState(false);

  useEffect(() => {
    checkBothAuths();
  }, []);

  const checkBothAuths = async () => {
    try {
      // Check Job Portal Auth (only accepts role: "user")
      const userResponse = await checkAuthApi();
      if (userResponse.response.ok) {
        setUser(userResponse.data?.data?.user || userResponse.data?.data || null);
      } else {
        setUser(null);
      }

      // Check HRMS Auth (only accepts role: company/hr/employee)
      const companyResponse = await checkCompanyAuthApi();
      if (companyResponse.response.ok) {
        setCompanyUser(companyResponse.data?.data?.user || companyResponse.data?.data || null);
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
  // JOB PORTAL: LOGIN (Blocks HRMS users)
  // ==========================
  const loginUser = async (credentials) => {
    try {
      setUserAuthLoading(true);

      const { response, data } = await loginApi(credentials);

      if (response.ok) {
        const loggedInUser = data?.data?.user || null;

        // Double-check: Block HRMS roles
        if (["company", "hr", "employee"].includes(loggedInUser?.role)) {
          toast.error("Company accounts must use HRMS portal");
          setUserAuthLoading(false);
          return {
            success: false,
            message: "Please login at HRMS portal",
          };
        }

        setUser(loggedInUser);
        toast.success(`Welcome ${loggedInUser?.name || "User"}!`);
        return {
          success: true,
          user: loggedInUser,
          role: loggedInUser?.role,
          message: data?.message,
        };
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
  // JOB PORTAL: REGISTER
  // ==========================
  const registerUser = async (formData) => {
    try {
      setUserAuthLoading(true);

      const { response, data } = await registerApi({
        ...formData,
        role: "user", // Force role
      });

      if (response.ok) {
        toast.success("Account created!");
        return await loginUser({
          email: formData.email,
          password: formData.password,
        });
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
  // JOB PORTAL: LOGOUT
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
  // HRMS: LOGIN (Blocks Job Portal users)
  // ==========================
  const loginCompany = async (credentials) => {
    try {
      setCompanyAuthLoading(true);

      const { response, data } = await loginCompanyApi(credentials);

      if (response.ok) {
        const loggedInUser = data?.data?.user || null;

        // Double-check: Block job portal users
        if (loggedInUser?.role === "user") {
          toast.error("Job seekers cannot access HRMS");
          setCompanyAuthLoading(false);
          return {
            success: false,
            message: "Please use Job Portal for user accounts",
          };
        }

        setCompanyUser(loggedInUser);
        toast.success(`Welcome ${loggedInUser?.name || "User"}!`);
        return {
          success: true,
          user: loggedInUser,
          role: loggedInUser?.role,
          message: data?.message,
        };
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
        // Job Portal
        user,
        setUser,
        userAuthLoading,
        loginUser,
        registerUser,
        logoutUser,
        
        // HRMS
        companyUser,
        setCompanyUser,
        companyAuthLoading,
        companyLoading,
        registerCompany,
        loginCompany,
        logoutCompany,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const AppContect = AppContext;
export { AppProvider };