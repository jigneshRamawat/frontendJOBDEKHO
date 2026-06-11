import { createContext, useEffect, useState } from "react";
import Loader from "../../Reuse/Loader";
import { toast } from "react-hot-toast";

import {
  checkAuthApi,
  loginApi,
  registerApi,
  logoutApi,
} from "../Api.jsx";

import { registerCompanyApi } from "../HrmApi.jsx";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  // ==========================
  // CHECK AUTH
  // ==========================
  const checkAuth = async () => {
    try {
      const { response, data } = await checkAuthApi();

      if (response.status === 401) {
        setUser(null);
        return;
      }

      if (response.ok) {
        setUser(data?.data?.user || data?.data || null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth Check Error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // LOGIN USER (ROLE BASED)
  // ==========================
  const loginUser = async (credentials) => {
    try {
      setAuthLoading(true);

      const { response, data } =
        await loginApi(credentials);

      if (response.ok) {
        const loggedInUser =
          data?.data?.user || null;

        setUser(loggedInUser);

        toast.success(
          `Welcome ${
            loggedInUser?.name || "User"
          }!`
        );

        return {
          success: true,
          user: loggedInUser,
          role: loggedInUser?.role,
          message: data?.message,
        };
      }

      toast.error(
        data?.message || "Login failed"
      );

      return {
        success: false,
        message: data?.message,
      };
    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        "Something went wrong during login"
      );

      return {
        success: false,
        message: "Something went wrong",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // ==========================
  // REGISTER USER
  // ==========================
  const registerUser = async (formData) => {
    try {
      setAuthLoading(true);

      const { response, data } =
        await registerApi(formData);

      if (response.ok) {
        toast.success("Account created!");

        return await loginUser({
          email: formData.email,
          password: formData.password,
        });
      }

      toast.error(
        data.message || "Registration failed"
      );

      return { success: false };
    } catch (error) {
      toast.error("Something went wrong");

      return { success: false };
    } finally {
      setAuthLoading(false);
    }
  };

  // ==========================
  // LOGOUT USER
  // ==========================
  const logoutUser = async () => {
    try {
      setAuthLoading(true);

      await logoutApi();

      setUser(null);

      toast.success("Logged out");

      return { success: true };
    } catch (error) {
      toast.error("Logout failed");

      return { success: false };
    } finally {
      setAuthLoading(false);
    }
  };

  // ==========================
  // COMPANY REGISTER
  // ==========================
  const registerCompany = async (
    payload
  ) => {
    try {
      setCompanyLoading(true);

      const data =
        await registerCompanyApi(payload);

      if (data?.success === false) {
        toast.error(
          data.message ||
            "Company registration failed"
        );

        return { success: false };
      }

      toast.success(
        "Company registered successfully"
      );

      return {
        success: true,
        data,
      };
    } catch (error) {
      toast.error(
        "Company registration error"
      );

      return { success: false };
    } finally {
      setCompanyLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed  inset-0 flex items-center justify-center bg-white z-50">
        <Loader />
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        authLoading,
        companyLoading,

        loginUser,
        registerUser,
        logoutUser,
        registerCompany,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const AppContect = AppContext;
export { AppProvider };