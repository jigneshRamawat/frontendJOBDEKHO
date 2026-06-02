import { createContext } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const companies = [
    "Google",
    "Amazon",
    "Microsoft",
    "Infosys",
    "TCS",
    "Wipro",
  ];

  const categories = [
    {
      id: 1,
      title: "Frontend Developer",
      jobs: "120 Jobs",
      icon: "💻",
    },
    {
      id: 2,
      title: "Backend Developer",
      jobs: "80 Jobs",
      icon: "⚙️",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      jobs: "50 Jobs",
      icon: "🎨",
    },
    {
      id: 4,
      title: "Marketing",
      jobs: "95 Jobs",
      icon: "📈",
    },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Google",
      location: "Bangalore",
      salary: "10 LPA",
    },
    {
      id: 2,
      title: "MERN Developer",
      company: "Amazon",
      location: "Remote",
      salary: "12 LPA",
    },
    {
      id: 3,
      title: "React Developer",
      company: "Microsoft",
      location: "Delhi",
      salary: "8 LPA",
    },
  ];

  return (
    <AppContext.Provider
      value={{
        companies,
        categories,
        featuredJobs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;