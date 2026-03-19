import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Download, FileText, Sparkles, Eye, Download as DownloadIcon, FileCheck } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [cvStep, setCvStep] = useState(0);

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100);
    
    // Animate the demo CV steps
    const interval = setInterval(() => {
      setCvStep(prev => (prev + 1) % 6);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const demoCVData = [
    { name: 'ALEX JOHNSON', title: 'Software Engineer', section: 'Header' },
    { name: 'ALEX JOHNSON', title: 'Software Engineer', section: 'Experience', company: 'TechCorp Inc.', position: 'Senior Developer' },
    { name: 'ALEX JOHNSON', title: 'Software Engineer', section: 'Education', school: 'Stanford University', degree: 'BS Computer Science' },
    { name: 'ALEX JOHNSON', title: 'Software Engineer', section: 'Skills', skills: ['React', 'Node.js', 'Python', 'AWS'] },
    { name: 'ALEX JOHNSON', title: 'Software Engineer', section: 'Projects', project: 'E-commerce Platform' },
    { name: 'ALEX JOHNSON', title: 'Software Engineer', section: 'Complete', completed: true },
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-blue-50 py-16 md:py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered CV Builder
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto mb-6">
            Build your CV with an{" "}
            <span className="text-[#1783e0]">AI-powered builder</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Create a job-winning CV in minutes with smart suggestions, ATS optimization, and professional templates.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button 
              onClick={() => navigate('/templates')}
              className="inline-flex items-center justify-center gap-2 bg-[#1783e0] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#1567c4] transition-all transform hover:scale-105 font-semibold text-lg"
            >
              Create CV
              <ArrowRight className="w-5 h-5" />
            </button>

            <button 
              onClick={() => navigate('/cv-analysis')}
              className="inline-flex items-center justify-center gap-2 border-2 border-[#1783e0] text-[#1783e0] px-8 py-4 rounded-xl hover:bg-[#1783e0] hover:text-white transition-all font-semibold text-lg"
            >
              <BarChart3 className="w-5 h-5" />
              Analyze CV
            </button>
          </div>
        </div>

        {/* Demo CV Section */}
        <div className="mb-16">
          <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              See How Your CV Will Look
            </h2>
            <p className="text-gray-600">Create a professional CV in just a few minutes</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* Animated Demo CV */}
            <div className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: '200ms' }}>
              {/* Floating elements around CV */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0s' }}>
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="absolute -top-4 -right-8 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                <DownloadIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
              <div className="absolute -bottom-2 -right-6 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1.5s' }}>
                <FileCheck className="w-6 h-6 text-amber-600" />
              </div>

              {/* CV Preview Card */}
              <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                {/* CV Header */}
                <div className={`h-2 bg-gradient-to-r from-[#1783e0] to-[#10b981] transition-all duration-500 ${cvStep >= 0 ? 'opacity-100' : 'opacity-30'}`}></div>
                <div className="p-6">
                  <div className={`transition-all duration-500 ${cvStep >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                    <h3 className="text-xl font-bold text-gray-900">{demoCVData[cvStep].name}</h3>
                    <p className="text-[#1783e0] font-medium">{demoCVData[cvStep].title}</p>
                  </div>
                  
                  <div className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-500 ${cvStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Experience</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#1783e0]"></div>
                      <p className="text-sm font-medium text-gray-700">{demoCVData[cvStep].company || demoCVData[1].company}</p>
                    </div>
                    <p className="text-xs text-gray-500 ml-4">{demoCVData[cvStep].position || demoCVData[1].position}</p>
                  </div>

                  <div className={`mt-3 transition-all duration-500 ${cvStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Education</p>
                    <p className="text-sm font-medium text-gray-700">{demoCVData[cvStep].degree || demoCVData[2].degree}</p>
                    <p className="text-xs text-gray-500">{demoCVData[cvStep].school || demoCVData[2].school}</p>
                  </div>

                  <div className={`mt-3 transition-all duration-500 ${cvStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {(demoCVData[cvStep].skills || demoCVData[3].skills).map((skill, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Completed Check */}
                  <div className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-500 ${cvStep >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <FileCheck className="w-5 h-5" />
                      <span className="font-medium">CV Ready!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features List with Animation */}
            <div className={`lg:pl-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
              <div className="space-y-4">
                {[
                  { icon: '📄', title: '15+ Professional Templates', desc: 'Choose from modern, classic, creative designs' },
                  { icon: '🎯', title: 'ATS-Friendly', desc: 'Pass through applicant tracking systems' },
                  { icon: '📊', title: 'CV Scoring', desc: 'Get detailed analysis and improvement tips' },
                  { icon: '📥', title: 'PDF Download', desc: 'Export professional PDFs instantly' },
                  { icon: '✨', title: 'AI Suggestions', desc: 'Smart recommendations for better CVs' },
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:translate-x-2"
                    style={{ transitionDelay: `${index * 100 + 500}ms` }}
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={`flex flex-wrap justify-center gap-8 md:gap-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
          <div>
            <div className="text-3xl font-bold text-[#1783e0]">50K+</div>
            <div className="text-gray-500">CVs Created</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#1783e0]">95%</div>
            <div className="text-gray-500">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#1783e0]">15+</div>
            <div className="text-gray-500">Templates</div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className={`mt-12 flex flex-wrap justify-center gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '700ms' }}>
          <span className="px-4 py-2 bg-white/80 rounded-full shadow-sm text-sm text-gray-600">
            📄 15+ Professional Templates
          </span>
          <span className="px-4 py-2 bg-white/80 rounded-full shadow-sm text-sm text-gray-600">
            📊 CV Scoring
          </span>
          <span className="px-4 py-2 bg-white/80 rounded-full shadow-sm text-sm text-gray-600">
            ✨ AI Suggestions
          </span>
          <span className="px-4 py-2 bg-white/80 rounded-full shadow-sm text-sm text-gray-600">
            📥 PDF Export
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
