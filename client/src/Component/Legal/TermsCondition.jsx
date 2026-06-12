import React from "react";
import LegalLayout from "./LegalLayout";

function TermsCondition() {
  const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "accounts", title: "User Accounts" },
    { id: "restrictions", title: "Restrictions" },
    { id: "contact", title: "Contact" },
  ];

  return (
    <LegalLayout
      title="Terms & Conditions"
      lastUpdated="June 2026"
      sections={sections}
    >
      <section id="acceptance">
        <h2 className="text-2xl font-bold text-[#EA580C] mb-4">
          Acceptance of Terms
        </h2>

        <p className="text-gray-600">
          By using JobDekho, you agree to comply with our
          platform policies and legal terms.
        </p>
      </section>

      <section id="accounts" className="mt-10">
        <h2 className="text-2xl font-bold text-[#EA580C] mb-4">
          User Accounts
        </h2>

        <p className="text-gray-600">
          Users are responsible for maintaining the security
          of their accounts and passwords.
        </p>
      </section>

      <section id="restrictions" className="mt-10">
        <h2 className="text-2xl font-bold text-[#EA580C] mb-4">
          Restrictions
        </h2>

        <p className="text-gray-600">
          Any misuse, spam, fake job posting, or illegal activity
          may result in account suspension.
        </p>
      </section>

      <section id="contact" className="mt-10">
        <h2 className="text-2xl font-bold text-[#EA580C] mb-4">
          Contact
        </h2>

        <p className="text-gray-600">
          support@jobdekho.com
        </p>
      </section>
    </LegalLayout>
  );
}

export default TermsCondition;