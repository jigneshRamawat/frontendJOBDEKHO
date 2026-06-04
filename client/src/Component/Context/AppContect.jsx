import {
  createContext,
  useEffect,
  useState,
} from "react";

import Loader from "../../Reuse/Loader";

export const AppContext =
  createContext();

export default function AppProvider({
  children,
}) {
  // ==========================
  // STATES
  // ==========================
  const [user, setUser] =
    useState(null);

  // Page auth check loader
  const [loading, setLoading] =
    useState(true);

  // Login/Register button loader
  const [
    authLoading,
    setAuthLoading,
  ] = useState(false);

  const BASE_URL =
    "http://localhost:3000/api/v1/auth";

  // ==========================
  // CHECK AUTH ON REFRESH
  // ==========================
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth =
    async () => {
      try {
        const response =
          await fetch(
            `${BASE_URL}/current-user`,
            {
              method:
                "GET",
              credentials:
                "include",
            }
          );

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data =
          await response.json();

        setUser(
          data?.data || null
        );
      } catch (
        error
      ) {
        console.error(
          "Auth Check Error:",
          error
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

  // ==========================
  // LOGIN USER
  // ==========================
  const loginUser =
    async (
      credentials
    ) => {
      try {
        setAuthLoading(true);

        const response =
          await fetch(
            `${BASE_URL}/login`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              credentials:
                "include",

              body:
                JSON.stringify(
                  credentials
                ),
            }
          );

        const data =
          await response.json();

        if (
          response.ok
        ) {
          const loggedInUser =
            data?.data
              ?.user || null;

          setUser(
            loggedInUser
          );

          return {
            success: true,
            message: `Welcome ${
              loggedInUser?.name ||
              "User"
            }`,
          };
        }

        return {
          success: false,
          message:
            data.message ||
            "Login failed",
        };
      } catch (
        error
      ) {
        console.error(
          "Login Error:",
          error
        );

        return {
          success: false,
          message:
            "Something went wrong",
        };
      } finally {
        setAuthLoading(false);
      }
    };

  // ==========================
  // REGISTER USER
  // ==========================
  const registerUser =
    async (
      formData
    ) => {
      try {
        setAuthLoading(true);

        const response =
          await fetch(
            `${BASE_URL}/register`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              credentials:
                "include",

              body:
                JSON.stringify(
                  {
                    ...formData,
                    role:
                      formData.role ||
                      "user",
                  }
                ),
            }
          );

        const data =
          await response.json();

        if (
          response.ok
        ) {
          // Auto login
          return await loginUser(
            {
              email:
                formData.email,
              password:
                formData.password,
            }
          );
        }

        return {
          success: false,
          message:
            data.message ||
            "Register failed",
        };
      } catch (
        error
      ) {
        console.error(
          "Register Error:",
          error
        );

        return {
          success: false,
          message:
            "Something went wrong",
        };
      } finally {
        setAuthLoading(false);
      }
    };

  // ==========================
  // LOGOUT USER
  // ==========================
  const logoutUser =
    async () => {
      try {
        setAuthLoading(true);

        await fetch(
          `${BASE_URL}/logout`,
          {
            method:
              "POST",

            credentials:
              "include",
          }
        );

        setUser(null);

        return {
          success: true,
        };
      } catch (
        error
      ) {
        console.error(
          "Logout Error:",
          error
        );

        return {
          success: false,
        };
      } finally {
        setAuthLoading(false);
      }
    };

  // ==========================
  // FULL SCREEN LOADER
  // ==========================
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

// Optional typo fix
export const AppContect =
  AppContext;

export {
  AppProvider,
};