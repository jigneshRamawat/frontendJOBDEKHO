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

  const checkAuth = async () => {
    try {
      const { response, data } = await checkAuthApi();

      if (response.status === 401) {
        setUser(null);
        return;
      }

      if (response.ok) {
        setUser(data?.data || null);
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

  const loginUser = async (credentials) => {
    try {
      setAuthLoading(true);
      const { response, data } = await loginApi(credentials);

      if (response.ok) {
        const loggedInUser = data?.data?.user || null;
        setUser(loggedInUser);

        toast.success(`Welcome ${loggedInUser?.name || "User"}!`);

        return { success: true };
      }

      toast.error(data.message || "Login failed");
      return { success: false };
    } catch (error) {
      toast.error("Something went wrong during login");
      return { success: false };
    } finally {
      setAuthLoading(false);
    }
  };

  const registerUser = async (formData) => {
    try {
      setAuthLoading(true);

      const { response, data } = await registerApi(formData);

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
      setAuthLoading(false);
    }
  };

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

  // ⭐⭐⭐ FIX: COMPANY REGISTER FUNCTION (THIS WAS MISSING)
  const registerCompany = async (payload) => {
    try {
      setCompanyLoading(true);

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
      setCompanyLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
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
        companyLoading, // optional

        loginUser,
        registerUser,
        logoutUser,

        // ⭐ FIXED EXPORT
        registerCompany,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const AppContect = AppContext;
export { AppProvider };