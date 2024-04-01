import React, { useState } from "react";

const ContactForm = () => {
  const [organizationSize, setOrganizationSize] = useState("");

  const handleOrganizationSizeChange = (e) => {
    setOrganizationSize(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Oops! As an Editor, You Can't Create Projects
          </h1>
          <p className="text-red-500 mb-4">
            Please ask your Leader to create a project or buy SnapSynk Pro.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Free Subscription */}
          <div className="bg-blue-500 rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Free Subscription
            </h2>
            <ul className="text-left text-white">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
              <li>Feature 5</li>
            </ul>
          </div>
          {/* Pro Subscription */}
          <div className="bg-green-500 rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Pro Subscription
            </h2>
            <ul className="text-left text-white">
              <li>Unlimited Projects</li>
              <li>Advanced Collaboration</li>
              <li>Priority Support</li>
              <li>Custom Branding</li>
              <li>Analytics Dashboard</li>
            </ul>
          </div>
          {/* Pro Max Subscription */}
          <div className="bg-purple-500 rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Pro Max Subscription
            </h2>
            <ul className="text-left text-white">
              <li>All Pro Features</li>
              <li>Team Management</li>
              <li>Integration with Third-party Apps</li>
              <li>Advanced Security Features</li>
              <li>Personalized Training</li>
            </ul>
          </div>
        </div>
        {/* Contact Form */}
        <div className="bg-gray-100 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="organization-size"
                className="block text-sm font-medium text-gray-700"
              >
                Organization Size
              </label>
              <select
                id="organization-size"
                name="organization-size"
                value={organizationSize}
                onChange={handleOrganizationSizeChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select organization size</option>
                <option value="1-5">1-5 Employees</option>
                <option value="6-20">6-20 Employees</option>
                <option value="21-50">21-50 Employees</option>
                <option value="51-100">51-100 Employees</option>
                <option value="100+">100+ Employees</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
