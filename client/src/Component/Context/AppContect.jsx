import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AppContext =
  createContext();

export default function AppProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const BASE_URL =
    "https://jobdekho-3vnx.onrender.com/api/v1/auth";

  useEffect(() => {
    const storedUser =
      localStorage.getItem(
        "cookies"
      );

    if (storedUser) {
      setUser(
        JSON.parse(
          storedUser
        )
      );
    }
  }, []);
  const loginUser =
    async (
      credentials
    ) => {
      try {
        setLoading(true);

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
          const user =
            data?.data
              ?.user;

          const token =
            data?.data
              ?.token;

          // Save token
          localStorage.setItem(
            "token",
            token
          );

          // Save user
          localStorage.setItem(
            "user",
            JSON.stringify(
              user
            )
          );

          setUser(user);

          return {
            success: true,
          };
        }

        alert(
          data.message ||
            "Login failed"
        );

        return {
          success: false,
        };
      } catch (error) {
        console.error(
          "Login Error:",
          error
        );

        return {
          success: false,
        };
      } finally {
        setLoading(false);
      }
    };

  // ---------------------------
  // Register User
  // ---------------------------
  const registerUser =
    async (
      formData
    ) => {
      try {
        setLoading(true);

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
          // Auto Login
          return await loginUser(
            {
              email:
                formData.email,
              password:
                formData.password,
            }
          );
        }

        alert(
          data.message ||
            "Register failed"
        );

        return {
          success: false,
        };
      } catch (error) {
        console.error(
          "Register Error:",
          error
        );

        return {
          success: false,
        };
      } finally {
        setLoading(false);
      }
    };

  // ---------------------------
  // Logout
  // ---------------------------
  const logoutUser =
    async () => {
      try {
        setLoading(true);

        // Optional API call
        await fetch(
          `${BASE_URL}/logout`,
          {
            method:
              "POST",
          }
        );

        // Clear localStorage
        localStorage.removeItem(
          "cookies"
        );

        localStorage.removeItem(
          "user"
        );

        setUser(null);
      } catch (error) {
        console.error(
          "Logout Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const AppContect =
  AppContext;

export { AppProvider };