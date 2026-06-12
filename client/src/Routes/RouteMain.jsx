import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import HrmsHome from "../Component/Hrms/HrmsHome/HrmsHome";
import MasterHome from "../Pages/MasterHome";
import JobHome from "../Component/Jobportal/Home/JobHome";
import Login from "../Component/Jobportal/AuthPages/Login";
import Register from "../Component/Jobportal/AuthPages/Register";
import CompanyRegister from "../Component/Hrms/HrmsHome/CompanyRegister";
import HrmLogin from "../Component/Hrms/HrmsHome/HrmLogin";
import Hrmsintrodetails from "../Component/Hrms/HrmsHome/Hrmsintrodetails";
import MainWhyDetails from "../Pages/Allhomepage/MainWhyDetails";
import JobDetails from "../Component/Jobportal/Home/JobLayoutHome/Jobspage/JobDetails";
import Componydashbordhome from "../Component/Hrms/Compony/dashbord/componydashbordhome/componydashbordhome";
import Hrdashboard from "../Component/Hrms/Compony/dashbord/Hrdashboard/Hrdashboard";
import Employeedashboard from "../Component/Hrms/Compony/dashbord/Employeedashboard/Employeedashboard";
import ProtectedRoute from "../Component/Hrms/ProtectedRoute";
import CreateHrCompony from "../Component/Hrms/Compony/dashbord/componydashbordhome/CreateHrCompony";
import AboutUs from "../Pages/AboutUs";
// import PrivacyPolicy from "../Component/Legal/PrivacyPolicy";
// import TermsCondition from "../Component/Legal/TermsCondition";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

function RouteMain() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <MasterHome />
              </PageTransition>
            }
          />
          <Route
            path="/hrms"
            element={
              <PageTransition>
                <HrmsHome />
              </PageTransition>
            }
          />
          <Route
            path="/about-us"
            element={
              <PageTransition>
                <AboutUs />
              </PageTransition>
            }
          />
          {/* <Route
  path="/privacy-policy"
  element={
    <PageTransition>
      <PrivacyPolicy />
    </PageTransition>
  }
/>

<Route
  path="/terms-conditions"
  element={
    <PageTransition>
      <TermsCondition />
    </PageTransition>
  }
/> */}

          <Route
            path="/jobs"
            element={
              <PageTransition>
                <JobHome />
              </PageTransition>
            }
          />
          <Route
            path="/login"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />
          <Route
            path="/register"
            element={
              <PageTransition>
                <Register />
              </PageTransition>
            }
          />
          <Route
            path="/company-register"
            element={
              <PageTransition>
                <CompanyRegister />
              </PageTransition>
            }
          />
          <Route
            path="/hrm-login"
            element={
              <PageTransition>
                <HrmLogin />
              </PageTransition>
            }
          />
          <Route
            path="/hrmsintrodetails/:id"
            element={
              <PageTransition>
                <Hrmsintrodetails />
              </PageTransition>
            }
          />

          {/* FIXED JOB DETAILS PATH: Matches incoming URLs precisely */}
          <Route
            path="/jobLayoutHome/Jobspage/JobDetails/:category"
            element={
              <PageTransition>
                <JobDetails />
              </PageTransition>
            }
          />

          {/* FIXED MAIN WHY DETAILS PATH */}
          <Route
            path="/mainwhydetails/:id"
            element={
              <PageTransition>
                <MainWhyDetails />
              </PageTransition>
            }
          />

          <Route
            path="/componydashbord"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <PageTransition>
                  <Componydashbordhome />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/hrdashboard"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <PageTransition>
                  <Hrdashboard />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          <Route
            path="/employeedashboard"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <PageTransition>
                  <Employeedashboard />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/creteHr"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <PageTransition>
                  <CreateHrCompony />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route path="/about-us" element={<h1>About Page Working</h1>} />

          <Route
            path="*"
            element={
              <PageTransition>
                <div className="flex flex-col bg-black items-center justify-center min-h-screen text-center">
                  <h1 className="text-4xl font-bold text-[#EA580C]">404</h1>
                  <h1 className="text-4xl font-bold text-[#EA580C]">
                    JOB DEKHO PAGE NOT FOUND
                  </h1>
                </div>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default RouteMain;
