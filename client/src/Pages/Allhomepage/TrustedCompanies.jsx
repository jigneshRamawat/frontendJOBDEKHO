import React from 'react';

// Array of temporary placeholder images
// You can replace the 'logoUrl' with your actual imported image paths later
const companies = [
  { id: 1, name: 'Mahindra', logoUrl: 'https://imgs.search.brave.com/9CJU21kX99wsJYgWMhB1jLIlBsaY4wALJVDGBrZL23I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL3RfbWFo/aW5kcmEtYXV0by13/aXRoLXdvcmRtYXJr/NzE2Ny5sb2dvd2lr/LmNvbS53ZWJw' },
  { id: 2, name: 'IDFC First Bank', logoUrl: 'https://imgs.search.brave.com/dgN2nBUKBegZGNY9JbwR1yfyOr644dVKC1L2qOFVrmA/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9pY29u/YXBlLmNvbS93cC1j/b250ZW50L3BuZ19s/b2dvX3ZlY3Rvci9p/ZGZjLWZpcnN0LWJh/bmstbG9nby5wbmc' },
  { id: 3, name: 'Delhivery', logoUrl: 'https://imgs.search.brave.com/Tr9rDqpB5OtAzl2Za0O6JZHaSLklM9sTGrX6vIwipg4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuc3RhcnR1cHRh/bGt5LmNvbS8yMDIy/LzA1L0RlbGhpdmVy/eS1sb2dvLVN0YXJ0/dXBUYWxreS5qcGc' },
  { id: 4, name: 'Kotak', logoUrl: 'https://imgs.search.brave.com/WxtiziTBgPA5_fhNNZWN39BQFLGn0uas_5bzJIuy5VA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/YnJhbmRmZXRjaC5p/by9pZGQtYVJuMDFa/L3cvNDAwL2gvNDAw/L3RoZW1lL2Rhcmsv/aWNvbi5qcGVnP2M9/MWJ4aWQ2NE11cDdh/Y3pld1NBWU1YJnQ9/MTc3MjMyNjkxMjMx/OQ'},
  { id: 5, name: 'Yes Bank', logoUrl: 'https://imgs.search.brave.com/MQZQE8JzAghk0J1pIU771e6F5_-ul11ZHffcfxU7EuU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS12/ZWN0b3IveWVzLWJh/bmstbG9nby1uZXct/ZWRpdG9yaWFsLTYw/MG53LTIzMjMxNzIx/NTEuanBn' },
  { id: 6, name: 'Indus Towers', logoUrl: 'https://imgs.search.brave.com/XlwJdgCGsOiiXL0rP4vRFBC29Np4GslLmd_yV50hYB0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzEwLzIvb2Jvci10/b3dlcnMtbG9nby1w/bmdfc2Vla2xvZ28t/MTAxOTY0LnBuZw' },
];

function TrustedCompanies() {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-[#fff7f2] via-[#fff3eb] to-[#ffe4d6] font-sans text-center">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F2A4A] max-w-4xl mx-auto leading-tight mb-4">
          Driving 300,000+ Users To Successfully Lead Their Work-Life With Job Dekho HRMS  & Automation
        </h2>

        <div className="flex justify-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
        </div>

        <p className="text-[#fc6113] text-sm md:text-base leading-relaxed max-w-4xl mx-auto mb-12 px-4 md:px-8">
          As the <span className="font-bold text-gray-800">JobDekhoo is an  platform simplifying work-life for over 300,000 
            users. From smart CV parsing to paperless workflows, we empower HR leaders and employees to achieve more in less time</span>  </p>

        <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-3 gap-4 md:gap-6 px-2 md:px-0">
          {companies.map((company) => (
            <div 
              key={company.id} 
              className="flex justify-center items-center bg-white border border-gray-100 rounded-xl p-4 h-26 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 cursor-pointer group"
            >
              <img 
                src={company.logoUrl} 
                alt={`${company.name} logo`} 
                className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

export default TrustedCompanies;