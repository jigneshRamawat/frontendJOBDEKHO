import React from "react";
import LegalLayout from "./LegalLayout";

function PrivacyPolicy() {
  const sections = [
    { id: "information", title: "Information We Collect" },
    { id: "usage", title: "How We Use Information" },
    { id: "security", title: "Security" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="June 2026"
      sections={sections}
    >
      <section id="information">
        <h2 className="text-2xl font-bold text-[#EA580C] mb-4">
          Information We Collect
        </h2>

        <p className="text-gray-600">
          JobDekho may collect personal information such as your
          name, email address, phone number, resume, and profile
          information to improve our hiring services.
        </p>
      </section>

      <section id="usage" className="mt-10">
        <h2 className="text-2xl font-bold text-[#EA580C] mb-4">
          How We Use Information
        </h2>

        <p className="text-gray-600">
          We use your information to provide job recommendations,
          connect candidates with employers, and improve platform
          experience.
        </p>
      </section>

      <section id="security" className="mt-10">
        <h2 className="text-2xl font-bold text-[#EA580C] mb-4">
          Security
        </h2>

        <p className="text-gray-600">
          We protect user data through secure authentication,
          encrypted systems, and proper security measures.
        </p>
      </section>

      <section id="contact" className="mt-10">
        <h2 className="text-2xl font-bold text-[#EA580C] mb-4">
          Contact Us
        </h2>

        <p className="text-gray-600">
          Email: support@jobdekho.com
        </p>
      </section>
    </LegalLayout>
  );
}

export default PrivacyPolicy;