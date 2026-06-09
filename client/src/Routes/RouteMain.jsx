import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import HrmsHome from '../Component/Hrms/HrmsHome/HrmsHome';
import MasterHome from '../Pages/MasterHome';
import JobHome from '../Component/Jobportal/Home/JobHome';
import Login from '../Component/Jobportal/AuthPages/Login';
import Register from '../Component/Jobportal/AuthPages/Register';
import CompanyRegister from '../Component/Hrms/HrmsHome/CompanyRegister';
import HrmLogin from '../Component/Hrms/HrmsHome/HrmLogin';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
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
      transition={{ duration: 0.01, ease: "easeInOut" }}  >
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
          
          <Route path="/" element={<PageTransition><MasterHome/></PageTransition>} />
          <Route path="/HrmsHome" element={<PageTransition><HrmsHome/></PageTransition>} />
          <Route path="/JobHome" element={<PageTransition><JobHome/></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login/></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register/></PageTransition>} />
          <Route path="/company-register" element={<PageTransition><CompanyRegister/></PageTransition>} />
          <Route path="/hrm-login" element={<PageTransition><HrmLogin/></PageTransition>} />
          
          <Route path="*" element={
            <PageTransition>
              <div className="flex flex-col bg-black items-center justify-center min-h-screen text-center">
                <h1 className="text-4xl font-bold text-[#EA580C]">404</h1>
                <h1 className="text-4xl font-bold text-[#EA580C]">JOB DEKHO PAGE NOT FOUND</h1>
              </div>
            </PageTransition>
          } />

        </Routes>
      </AnimatePresence>
    </>
  );
}

export default RouteMain;