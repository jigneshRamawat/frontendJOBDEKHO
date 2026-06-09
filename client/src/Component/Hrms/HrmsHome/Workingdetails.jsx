import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Task Management",
    description:
      "Assign, manage and track employee tasks with real-time progress updates. t vel numquam rerum, beatae veritatis maiores suscipit deleniti autem perspiciatis ab eius? Repellendus repellat quisquam distinctio. Dolorum, repellendus velit facere obcaecati in quidem, numquam corporis modi delectus minima sit animi tempora? Porro illum pariatur, consectetur iste unde eaque incidunt voluptatibus sunt fugiat eum quo rem facere saepe impedit magni blanditiis ea sint! Aut magnam molestias commodi magni voluptatibus veritatis distinctio tenetur voluptates earum!",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFza3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "02",
    title: "Attendance Management",
    description:
      "Track employee attendance, check-ins, leaves and working hours.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptatem molestiae dolorum est at vel placeat rem tempora possimus corrupti numquam rerum, beatae",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXR0ZW5kYW5jZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "03",
    title: "Employee Management",
    description: "Manage employee profiles, departments, roles and records. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptatem molestiae dolorum est at vel placeat rem tempora possimus corrupti numquam rerum, beatae veritatis maiores suscipit deleniti autem perspiciatis ab eius? Repellendus quaerat blanditiis error eius saepe praesentium facere odio totam est possimus. Optio quod quaerat explicabo vel quam voluptatuptatibus sunt fugiat eum quo rem facere saepe impedit magni blanditiis ea sint! Aut magnam molestias ",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1wbG95ZWV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "04",
    title: "Leave Request",
    description: "Approve or reject leave requests with smart workflows. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptatem molestiae dolorum est at vel placeat rem tempora possimus corrupti numquam rerum, beatae tenetur voluptates earum!",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFza3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "05",
    title: "Payroll Management",
    description: "Generate salaries, payroll reports and payment tracking. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptatem molestiae dolorum est at vel placeat rem tempora possimus corrupti numquam rerum, beatae veritatis maiores suscipit deleniti autem perspiciatis ab eius? Repellendus repellat quisquam distinctio. Dolorum, repellendus velit facere obcaecati in quidem, numquam corporis modi delectus minima sit animi tempora? Porro illum pariatur, consectetur iste unde eaque incidunt voluptatibus sunt fugiat eum quo rem facere saepe impedit magni blanditiis ea sint! Aut magnam molestias commodi magni voluptatibus veritatis distinctio tenetur voluptates earum!",
    image:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGF5cm9sbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },

  {
    id: "06",
    title: "Analytics Dashboard",
    description: "Get HR insights, performance reports and employee analytics. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptatem molestiae dolorum est at vel placeat rem tempora possimus corrupti numquam rerum, beatae veritatis maiores suscipit deleniti autem perspiciatis ab eius? Repellendus quaerat blanditiis error eius saepe praesentium facere odio totam est possimus. Optio quod quaerat explicabo vel quam voluptatum repellat quisquam distinctio. Dolorum, repellendus velit facere obcaecati in quidem, numquam corporis modi delectus minima sit animi tempora? Porro illum pariatur, consectetur iste unde eaque incidunt voluptatibus sunt fugiat eum quo rem facere saepe impedit magni blanditiis ea sint! Aut magnam molestias commodi magni voluptatibus veritatis distinctio tenetur voluptates earum!",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFza3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];

const WorkingDetails = () => {
  const [activeIndex, setActiveIndex] = useState(0);



  return (
    
    <section className="py-24 px-5 bg-gradient-to-b from-[#e9d3c6] via-orange-50 to-white overflow-hidden">

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="px-5 py-2 rounded-full bg-orange-100 text-[#FA7B3D] font-medium text-sm">
            HRMS Features
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-6 text-gray-900 leading-tight">
            Smart HR Solutions
            <br />
            For Modern Teams
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            Explore how our HRMS system transforms workforce management.
          </p>
        </div>

        <div className="space-y-5">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                layout
                transition={{
                  duration: 0.5,
                }}
               className={`overflow-hidden border border-orange-200 rounded-[28px] transition-all duration-700 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#FA7B3D] to-[#ff9559] shadow-2xl"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                <div className="grid lg:grid-cols-[80px_1fr_100px] items-center px-6 py-5">
                  <div
                    className={`text-2xl font-bold ${
                      isActive ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {service.id}
                  </div>

                  <div>
                    <h2
                      className={`text-2xl md:text-2xl font-bold transition-all duration-500 ${
                        isActive ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {service.title}
                    </h2>
                  </div>

                  <div className="text-right">
                    <button
                      className={`font-semibold transition-all duration-500 ${
                        isActive ? "text-white" : "text-[#FA7B3D]"
                      }`}
                    >
                      VIEW DETAILS ↗
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="grid lg:grid-cols-2 gap-6 px-6 pb-6 items-center">
                        <motion.div
                          initial={{
                            x: -50,
                            opacity: 0,
                          }}
                          animate={{
                            x: 0,
                            opacity: 1,
                          }}
                          transition={{
                            duration: 0.5,
                          }}
                        >
                          <p className="text-lg text-orange-50 leading-8 mb-8">
                            {service.description}
                          </p>

                          <button className="bg-white text-[#FA7B3D] px-7 py-4 rounded-2xl font-semibold hover:scale-105 transition-all">
                            Explore Feature
                          </button>
                        </motion.div>

                        <motion.div
                          initial={{
                            x: 50,
                            opacity: 0,
                          }}
                          animate={{
                            x: 0,
                            opacity: 1,
                          }}
                          transition={{
                            duration: 0.5,
                          }}
                          className="flex justify-center"
                        >
                          <img
                            src={service.image}
                            alt={service.title}
                            className="rounded-[28px] shadow-2xl w-full max-w-[450px] h-[250px] object-cover hover:scale-[1.02] transition-all duration-500"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkingDetails;
