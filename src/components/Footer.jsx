import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* AdSense Placeholder - Top Ad */}
      <div className="bg-gray-100 py-3 text-center">
        <div className="max-w-728px mx-auto">
          <p className="text-xs text-gray-500 mb-1">Advertisement</p>
          <div className="bg-white h-[90px] flex items-center justify-center border border-gray-200 rounded">
            <span className="text-gray-400 text-sm">Google AdSense - 728x90</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <FileText className="text-[#1783e0] w-8 h-8" />
              <span className="text-xl font-bold text-white">CV-mave</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Create professional, job-winning CVs in minutes with our AI-powered builder.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#1783e0] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#1783e0] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#1783e0] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#1783e0] transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/templates" className="hover:text-[#1783e0] transition-colors">
                  Browse Templates
                </Link>
              </li>
              <li>
                <Link to="/create-cv" className="hover:text-[#1783e0] transition-colors">
                  Create CV
                </Link>
              </li>
              <li>
                <Link to="/preview" className="hover:text-[#1783e0] transition-colors">
                  Preview CV
                </Link>
              </li>
              <li>
                <Link to="/ai-improvement" className="hover:text-[#1783e0] transition-colors">
                  AI Improvement
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#1783e0] transition-colors">
                  CV Writing Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1783e0] transition-colors">
                  Interview Prep
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1783e0] transition-colors">
                  Job Search Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1783e0] transition-colors">
                  ATS Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#1783e0] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1783e0] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1783e0] transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#1783e0] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CV-mave. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Made with ❤️ for job seekers worldwide
          </p>
        </div>
      </div>

      {/* AdSense Placeholder - Bottom Ad */}
      <div className="bg-gray-100 py-3 text-center">
        <div className="max-w-728px mx-auto">
          <p className="text-xs text-gray-500 mb-1">Advertisement</p>
          <div className="bg-white h-[90px] flex items-center justify-center border border-gray-200 rounded">
            <span className="text-gray-400 text-sm">Google AdSense - 728x90</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
