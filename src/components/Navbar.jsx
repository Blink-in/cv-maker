import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Menu, X, BarChart3 } from 'lucide-react';
import useCVStore from '../store/cvStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const resetCV = useCVStore((state) => state.resetCV);

  const handleGetStarted = () => {
    resetCV();
    navigate('/templates');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FileText className="text-[#1783e0] w-8 h-8" />
            <span className="text-xl font-bold text-[#1783e0]">CV-mave</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/analyze" 
              className="flex items-center gap-1 text-gray-600 hover:text-[#1783e0] transition-colors font-medium"
            >
              <BarChart3 className="w-4 h-4" />
              Analyze CV
            </Link>
            <button 
              onClick={handleGetStarted}
              className="bg-[#1783e0] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#1567c4] transition-colors shadow-md"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-4">
              <Link 
                to="/analyze" 
                className="flex items-center gap-2 text-gray-600 hover:text-[#1783e0] transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                <BarChart3 className="w-4 h-4" />
                Analyze CV
              </Link>
              <button 
                onClick={() => {
                  handleGetStarted();
                  setIsOpen(false);
                }}
                className="bg-[#1783e0] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#1567c4] transition-colors shadow-md w-full"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
