import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import useCVStore from '../store/cvStore';
import AnimatedSection from '../components/AnimatedSection';
import TemplateSelector from '../components/TemplateSelector';

const TemplateSelection = () => {
  const navigate = useNavigate();
  const { selectedTemplate } = useCVStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1783e0] to-[#1567c4] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Perfect CV Template
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Select from our professionally designed CV templates. All templates are ATS-friendly and export perfectly to PDF.
          </p>
        </div>
      </div>

      {/* Template Selector */}
      <TemplateSelector />

      {/* Tips Section */}
      <AnimatedSection delay={0.3}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="text-[#1783e0]" />
              Tips for Choosing a Template
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1783e0] text-white flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                <span>Consider your industry - corporate roles suit classic/executive templates, creative roles suit modern designs</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1783e0] text-white flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                <span>All our templates are ATS-friendly and will pass through applicant tracking systems</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#1783e0] text-white flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                <span>Use the color selector to match your personal brand or industry standards</span>
              </li>
            </ul>
            
            {selectedTemplate && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate('/create-cv')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1783e0] text-white rounded-xl font-semibold hover:bg-[#1567c4] transition-colors shadow-lg hover:shadow-xl"
                >
                  Continue with this Template
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default TemplateSelection;