import { createContext, useEffect, useState } from "react";
import Loader from "../../Reuse/Loader";
import { toast } from 'react-hot-toast';

import {
  checkAuthApi,
  loginApi,
  registerApi,
  logoutApi,
} from "../Api.jsx";

// Sahi nam se context banaya
export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  // Application load hote hi user check karne ke liye
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

  // Login Functionality
  const loginUser = async (credentials) => {
    try {
      setAuthLoading(true);
      const { response, data } = await loginApi(credentials);

      if (response.ok) {
        const loggedInUser = data?.data?.user || null;
        setUser(loggedInUser);

        const welcomeMsg = `Welcome ${loggedInUser?.name || "User"}!`;
        toast.success(welcomeMsg); // Normal login par bhi toast chalega

        return { success: true, message: welcomeMsg };
      }

      toast.error(data.message || "Login failed");
      return { success: false, message: data.message || "Login failed" };

    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong during login");
      return { success: false, message: "Something went wrong" };
    } finally {
      setAuthLoading(false);
    }
  };

  // Register Functionality (With updated auto-login handler)
  const registerUser = async (formData) => {
    try {
      setAuthLoading(true);
      const { response, data } = await registerApi(formData);

      console.log("REGISTER RESPONSE:", data);

      if (response.ok) {
        toast.success(data?.message || "Account created successfully! Logging in...");

        // Auto login trigger
        const loginRes = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        return loginRes || { success: true };
      }

      // 409 Conflict (Email already exists) ya koi bhi validation error handle karega
      const errorMessage = data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);

      return { success: false, message: errorMessage };

    } catch (error) {
      console.error("Register Error:", error);
      const catchMessage = error?.message || "Something went wrong. Connection failed.";
      toast.error(catchMessage);

      return { success: false, message: catchMessage };
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout Functionality
  const logoutUser = async () => {
    try {
      setAuthLoading(true);
      await logoutApi();
      setUser(null);
      toast.success("Logged out successfully");
      return { success: true };
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed");
      return { success: false };
    } finally {
      setAuthLoading(false);
    }
  };

  // Initial Loading state blocker
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
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Typo fixed export: dono name rakh diye taaki purani files break na ho
export const AppContect = AppContext; 
export { AppProvider };