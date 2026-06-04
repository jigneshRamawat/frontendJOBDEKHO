import CTASection from "./Allhomepage/CTASection";
import FooterBanner from "./Allhomepage/FooterBanner";
import HeroSection from "./Allhomepage/HeroSection";
import JobCategories from "./Allhomepage/JobCategories";
import Owerservices from "./Allhomepage/Owerservices";
import Testimonials from "./Allhomepage/Testimonials";
import TrustedCompanies from "./Allhomepage/TrustedCompanies";
import WhyChooseUs from "./Allhomepage/WhyChooseUs";
import Navbar from "./Navbar";

function MasterHome() {
  return (
    <>
       <Navbar />
       <div className="pt-15">
         <HeroSection />
         <TrustedCompanies />
         
         <div id="our-services">
           <Owerservices />
         </div>
         
         <WhyChooseUs />
         <JobCategories />
         <Testimonials />
         <CTASection />
         <FooterBanner />
       </div>
    </>
  );
}

export default MasterHome;