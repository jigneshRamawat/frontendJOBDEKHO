import Navbar from './JobLayoutHome/Navbar'
import HeroSection from './JobLayoutHome/HeroSection'
import PopularSearch from './JobLayoutHome/PopularSearch'
import AboutSection from './JobLayoutHome/AboutSection'
import ReviewSection from './JobLayoutHome/ReviewSection'
import JobCategory from './JobLayoutHome/JobCategory'
import FooterBanner from '../../../Pages/Allhomepage/FooterBanner'

function JobHome() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <PopularSearch/>
    <JobCategory/>
    <AboutSection/>
    <ReviewSection/>
    <FooterBanner/>
    </>
  )
}

export default JobHome