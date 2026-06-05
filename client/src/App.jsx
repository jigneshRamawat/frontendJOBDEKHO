
import { Toaster } from "react-hot-toast";
import RouteMain from "./Routes/RouteMain";

function App(){
  return (
    <>
        <Toaster
      position="top-center"
  toastOptions={{
    duration: 3000,
    style: {
      background: "#fff",
      color: "#222",
      borderRadius: "12px",
      padding: "12px 16px",
      boxShadow:
        "0 4px 20px rgba(0,0,0,0.1)",
    },

    success: {
      iconTheme: {
        primary: "#EA580C",
        secondary: "#fff",
      },
    },

    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    },
  }}
      reverseOrder={false}
    />
    <RouteMain />
    </>
    );
}

export default App;