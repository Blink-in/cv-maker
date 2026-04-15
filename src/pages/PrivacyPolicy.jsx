import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, Cookie, Eye, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-[#1783e0]" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#1783e0]" />
                Information We Collect
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>We collect information you provide directly to us, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal information (name, email, phone number) when you create a CV</li>
                  <li>Educational background and work experience</li>
                  <li>Skills and certifications</li>
                  <li>Any other information you choose to include in your CV</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Cookie className="w-5 h-5 text-[#1783e0]" />
                Cookies and Tracking Technologies
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>We use cookies and similar tracking technologies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Keep you signed in</li>
                  <li>Remember your preferences</li>
                  <li>Understand how you use our service</li>
                  <li>Improve our services</li>
                </ul>
                <p className="mt-4">
                  Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads based on your visit to our site and other sites on the internet.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#1783e0]" />
                How We Use Your Information
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your transactions</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns to improve user experience</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Google AdSense and Advertising
              </h2>
              <div className="text-gray-600 space-y-3">
                <p>We display Google ads on our website. Google uses cookies to show ads based on your interests. You can opt out of personalized advertising by visiting:</p>
                <p className="mt-2">
                  <a 
                    href="https://www.google.com/settings/ads" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#1783e0] hover:underline"
                  >
                    Google Ad Settings
                  </a>
                </p>
                <p className="mt-4">
                  For more information about Google's privacy practices, visit:
                </p>
                <p>
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#1783e0] hover:underline"
                  >
                    Google Privacy & Terms
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#1783e0]" />
                Contact Us
              </h2>
              <div className="text-gray-600">
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p className="mt-2 text-[#1783e0]">support@cv-mave.com</p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-[#1783e0] hover:underline"
            >
              <FileText className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;