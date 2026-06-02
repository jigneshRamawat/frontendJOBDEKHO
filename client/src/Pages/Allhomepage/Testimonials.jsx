import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonialsData = [
  {
    id: 1,
    name: 'Aboli Patne',
    role: 'HR Executive, Green-Ecomes Solutions Pvt Ltd',
    title: 'JobDekhoo made Ecomes HR Operations Efficient and Accurate!',
    content: 'We are pleased to report that we are utilizing most of the modules of the JobDekhoo portal, including attendance, leaves, resignation, payroll, and performance. We are satisfied with the service provided by JobDekhoo, which has significantly improved the accuracy and efficiency of our processes.',
    image: 'https://placehold.co/100x100/ea580c/ffffff?text=AP'
  },
  {
    id: 2,
    name: 'Rohan Sharma',
    role: 'Technical Lead, TechNova',
    title: 'The best hiring experience we have ever had.',
    content: 'Finding the right talent used to take weeks. With JobDekhoo, we sourced, interviewed, and hired two senior developers within 5 days. The AI-driven matching is incredibly accurate, saving our HR team countless hours of manual filtering.',
    image: 'https://placehold.co/100x100/ea580c/ffffff?text=RS'
  },
  {
    id: 3,
    name: 'Priya Desai',
    role: 'Operations Manager, BuildFast',
    title: 'Paperless workflows changed our daily routine entirely.',
    content: 'The transition to JobDekhoo was seamless. The self-service portal empowered our employees to manage their own time-offs and tax documents without constantly emailing HR. It is intuitive, fast, and highly reliable.',
    image: 'https://placehold.co/100x100/ea580c/ffffff?text=PD'
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play logic: Loops right to left every 4 seconds
  useEffect(() => {
    let interval;
    // Pause animation if user is hovering over the card
    if (!isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); 
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-20 relative bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] overflow-hidden min-h-[600px] flex flex-col justify-center">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-orange-100 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-200 rounded-full opacity-40 blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 border-[40px] border-orange-50 rounded-full opacity-50 -z-10"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        
        {/* Header & Dots */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Testimonials</h2>
          <p className="text-gray-600">Our Clients Love Us</p>
          
          {/* Decorative Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonialsData.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-6 bg-[#EA580C]' : 'w-2 bg-orange-200'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Card Container */}
        <div 
          className="relative max-w-3xl mx-auto group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrevious}
            className="absolute cursor-pointer -left-4 md:-left-16 top-1/2 -translate-y-1/2 bg-white text-[#EA580C] hover:bg-[#EA580C] hover:text-white border border-orange-100 p-3 rounded-full shadow-lg transition-all z-20"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Main Card Wrapper (Hides Overflow) */}
          <div className="bg-[#EA580C] text-white rounded-[2rem] shadow-2xl relative overflow-hidden">
            
            {/* Quote Marks Decoration (Static background) */}
            <Quote size={80} className="absolute top-4 left-4 text-white opacity-20 rotate-180 z-0" />
            <Quote size={80} className="absolute bottom-4 right-4 text-white opacity-20 z-0" />

            {/* Sliding Track */}
            <div 
              className="flex transition-transform duration-700 ease-in-out relative z-10"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialsData.map((testimonial) => (
                
                /* Individual Slide Content */
                <div key={testimonial.id} className="w-full shrink-0 flex flex-col md:flex-row items-center md:items-start gap-8 p-8 md:p-12">
                  
                  {/* Profile Image */}
                  <div className="shrink-0 md:top-12 top-0 relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 shadow-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-orange-100 text-sm font-medium mb-4 uppercase tracking-wider">
                      {testimonial.name} - {testimonial.role}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                      {testimonial.title}
                    </h3>
                    <p className="text-orange-50 md:text-lg leading-relaxed">
                      {testimonial.content}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            className="absolute cursor-pointer -right-4 md:-right-16 top-1/2 -translate-y-1/2 bg-white text-[#EA580C] hover:bg-[#EA580C] hover:text-white border border-orange-100 p-3 rounded-full shadow-lg transition-all z-20"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={24} />
          </button>

        </div>
      </div>
    </section>
  );
}

export default Testimonials;