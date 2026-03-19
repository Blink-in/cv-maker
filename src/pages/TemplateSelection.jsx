import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Check, ArrowRight, Briefcase, GraduationCap, Award, Code, PenTool, Users, TrendingUp, Building2, Heart, Stethoscope, Scale, Calculator, Cpu } from 'lucide-react';
import useCVStore from '../store/cvStore';
import AnimatedSection from '../components/AnimatedSection';

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design. Perfect for corporate jobs and modern workplaces.',
    color: '#1783e0',
    icon: <Briefcase className="w-6 h-6" />,
    features: ['Clean layout', 'ATS-friendly', 'Easy to read'],
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 border-b-2" style={{ borderColor: '#1783e0' }}>
          <div className="font-bold text-gray-800">ALEX JOHNSON</div>
          <div className="text-gray-500">Software Engineer</div>
        </div>
        <div className="mt-1.5 space-y-1">
          <div className="text-gray-600 leading-tight">Experienced developer with 5+ years</div>
          <div className="text-gray-500">Building scalable web applications</div>
        </div>
        <div className="mt-1.5 pt-1 border-t">
          <div className="font-semibold text-gray-700">Experience</div>
          <div className="text-gray-600">Senior Developer @ TechCorp</div>
          <div className="text-gray-400">2020 - Present</div>
        </div>
        <div className="mt-1">
          <div className="font-semibold text-gray-700">Skills</div>
          <div className="flex flex-wrap gap-0.5 mt-0.5">
            <span className="bg-blue-100 text-blue-600 px-1 rounded">JavaScript</span>
            <span className="bg-blue-100 text-blue-600 px-1 rounded">React</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'classic',
    name: 'Classic Traditional',
    description: 'Time-honored design that never goes out of style. Ideal for conservative industries.',
    color: '#374151',
    icon: <FileText className="w-6 h-6" />,
    features: ['Traditional layout', 'Conservative', 'Industry standard'],
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 text-center border-b-2 border-gray-800">
          <div className="font-serif font-bold text-gray-900 text-lg">ROBERT SMITH</div>
          <div className="text-gray-600">Financial Analyst</div>
        </div>
        <div className="mt-1.5">
          <div className="font-bold text-gray-800">PROFESSIONAL SUMMARY</div>
          <div className="text-gray-600 mt-0.5">Dedicated analyst with 10+ years</div>
        </div>
        <div className="mt-1.5">
          <div className="font-bold text-gray-800">EXPERIENCE</div>
          <div className="text-gray-700 mt-0.5">Senior Analyst — Bank Corp</div>
          <div className="text-gray-500">2015 — Present</div>
        </div>
        <div className="mt-1">
          <div className="font-bold text-gray-800">EDUCATION</div>
          <div className="text-gray-700">MBA, Harvard Business</div>
        </div>
      </div>
    )
  },
  {
    id: 'executive',
    name: 'Executive Elite',
    description: 'Sophisticated design for senior positions and C-suite executives.',
    color: '#1f2937',
    icon: <Building2 className="w-6 h-6" />,
    features: ['Leadership focused', 'Senior roles', 'Executive presence'],
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 flex items-center" style={{ backgroundColor: '#1f2937' }}>
          <div className="text-white font-serif font-bold pl-1">JAMES WILLIAMS</div>
        </div>
        <div className="mt-1 text-center">
          <div className="font-bold text-gray-900 text-[5px]">CHIEF EXECUTIVE OFFICER</div>
          <div className="text-gray-500 text-[3px]">Executive Leadership & Strategy</div>
        </div>
        <div className="mt-1 p-1 bg-gray-100 rounded">
          <div className="font-bold text-gray-800">Board Experience</div>
          <div className="text-gray-600 text-[3px]">Fortune 500 Leadership</div>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-0.5">
          <div className="bg-gray-800 text-white px-1 rounded text-[3px]">Strategy</div>
          <div className="bg-gray-800 text-white px-1 rounded text-[3px]">M&A</div>
        </div>
      </div>
    )
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Stand out with a creative design. Ideal for design, marketing, and creative roles.',
    color: '#8b5cf6',
    icon: <PenTool className="w-6 h-6" />,
    features: ['Bold header', 'Color accents', 'Showcase personality'],
    sectionOrder: ['summary', 'skills', 'projects', 'experience', 'education', 'certifications'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
          SARAH MITCHELL
        </div>
        <div className="mt-1.5 text-center">
          <div className="font-bold text-gray-800">UX Designer</div>
          <div className="text-purple-600">Creating beautiful experiences</div>
        </div>
        <div className="mt-1.5 p-1 rounded-lg" style={{ backgroundColor: '#f3e8ff' }}>
          <div className="font-semibold text-purple-700">Portfolio</div>
          <div className="text-purple-600">www.sarahdesigns.com</div>
        </div>
        <div className="mt-1">
          <div className="flex gap-0.5 justify-center">
            <span className="bg-purple-500 text-white px-1 rounded">Figma</span>
            <span className="bg-purple-500 text-white px-1 rounded">Sketch</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    description: 'Simple and elegant design that puts focus on your content.',
    color: '#10b981',
    icon: <TrendingUp className="w-6 h-6" />,
    features: ['Minimal design', 'Maximum content', 'Timeless look'],
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8">
          <div className="font-bold text-black text-lg">MICHAEL CHEN</div>
          <div className="text-gray-600">Product Manager</div>
        </div>
        <div className="mt-1 border-t border-black pt-1">
          <div className="font-bold text-black">Summary</div>
          <div className="text-gray-700">Results-driven PM with expertise</div>
        </div>
        <div className="mt-1">
          <div className="font-bold text-black">Experience</div>
          <div className="text-gray-700">Lead Product Manager</div>
          <div className="text-gray-500">Innovate Inc • 2019-Now</div>
        </div>
        <div className="mt-1">
          <div className="font-bold text-black">Education</div>
          <div className="text-gray-700">MBA, Stanford University</div>
        </div>
      </div>
    )
  },
  {
    id: 'academic',
    name: 'Academic Scholar',
    description: 'Designed for academics, researchers, and educators. Emphasizes education and publications.',
    color: '#f59e0b',
    icon: <GraduationCap className="w-6 h-6" />,
    features: ['Publications', 'Research focus', 'Education emphasis'],
    sectionOrder: ['education', 'experience', 'certifications', 'skills', 'projects', 'summary'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 flex items-center gap-1" style={{ backgroundColor: '#f59e0b' }}>
          <div className="w-4 h-4 bg-white rounded-full"></div>
          <div className="text-white font-serif">DR. LISA PARK</div>
        </div>
        <div className="mt-1 text-center">
          <div className="font-bold text-gray-800">Research Scientist</div>
          <div className="text-amber-600">PhD, MIT</div>
        </div>
        <div className="mt-1">
          <div className="font-bold text-amber-700">Publications</div>
          <div className="text-gray-600 text-[3px]">• 15+ Peer-Reviewed Papers</div>
          <div className="text-gray-600 text-[3px]">• Nature, Science Citations</div>
        </div>
        <div className="mt-1">
          <div className="font-bold text-amber-700">Research</div>
          <div className="text-gray-600 text-[3px]">AI & Machine Learning</div>
        </div>
      </div>
    )
  },
  {
    id: 'professional',
    name: 'Corporate Professional',
    description: 'Polished corporate style suitable for any business environment.',
    color: '#2563eb',
    icon: <Users className="w-6 h-6" />,
    features: ['Corporate style', 'Business ready', 'Versatile'],
    sectionOrder: ['summary', 'skills', 'experience', 'education', 'certifications', 'projects'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 flex items-center justify-between bg-blue-600 px-2">
          <div className="text-white font-bold">DAVID WILSON</div>
          <div className="text-white text-[3px]">Marketing Director</div>
        </div>
        <div className="mt-1.5">
          <div className="text-gray-700">Strategic marketing leader with</div>
          <div className="text-gray-500">15 years of experience</div>
        </div>
        <div className="mt-1.5 flex gap-1">
          <span className="bg-blue-100 text-blue-700 px-1 rounded text-[3px]">SEO</span>
          <span className="bg-blue-100 text-blue-700 px-1 rounded text-[3px]">Analytics</span>
          <span className="bg-blue-100 text-blue-700 px-1 rounded text-[3px]">Brand</span>
        </div>
        <div className="mt-1">
          <div className="font-bold text-blue-700">Experience</div>
          <div className="text-gray-700 text-[3px]">Marketing Director @ GlobalCorp</div>
        </div>
      </div>
    )
  },
  {
    id: 'elegant',
    name: 'Elegant Sophisticated',
    description: 'Refined and elegant design for professionals who appreciate subtlety.',
    color: '#7c3aed',
    icon: <Award className="w-6 h-6" />,
    features: ['Elegant design', 'Refined look', 'Premium feel'],
    sectionOrder: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 text-center border-b" style={{ borderColor: '#7c3aed' }}>
          <div className="font-serif text-gray-900 font-bold">EMILY JOHNSON</div>
          <div className="text-purple-600 text-[3px]">Senior Consultant</div>
        </div>
        <div className="mt-1.5 text-center">
          <div className="text-gray-600 italic">"Transforming businesses through</div>
          <div className="text-gray-600 italic">strategic innovation"</div>
        </div>
        <div className="mt-1.5">
          <div className="font-semibold text-gray-800">Key Achievements</div>
          <div className="text-gray-600 text-[3px]">• $2M revenue growth</div>
          <div className="text-gray-600 text-[3px]">• Team leadership</div>
        </div>
      </div>
    )
  },
  {
    id: 'fresh',
    name: 'Fresh Modern',
    description: 'Clean and refreshing design with a modern approach.',
    color: '#06b6d4',
    icon: <Code className="w-6 h-6" />,
    features: ['Fresh look', 'Modern layout', 'Tech-friendly'],
    sectionOrder: ['skills', 'summary', 'experience', 'education', 'projects', 'certifications'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 rounded-lg p-1" style={{ background: 'linear-gradient(90deg, #06b6d4, #0891b2)' }}>
          <div className="text-white font-bold">CHRISTOPHER LEE</div>
          <div className="text-cyan-100 text-[3px]">Software Architect</div>
        </div>
        <div className="mt-1.5 grid grid-cols-3 gap-0.5">
          <span className="bg-cyan-50 text-cyan-700 px-1 rounded text-[3px] text-center">React</span>
          <span className="bg-cyan-50 text-cyan-700 px-1 rounded text-[3px] text-center">Node</span>
          <span className="bg-cyan-50 text-cyan-700 px-1 rounded text-[3px] text-center">AWS</span>
        </div>
        <div className="mt-1">
          <div className="text-gray-700 text-[3px]">Building scalable solutions</div>
        </div>
      </div>
    )
  },
  {
    id: 'timeless',
    name: 'Timeless Classic',
    description: 'A resume that stands the test of time with proven effectiveness.',
    color: '#4b5563',
    icon: <FileText className="w-6 h-6" />,
    features: ['Proven layout', 'Time-tested', 'Effective'],
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 border-b-4 border-gray-600">
          <div className="font-bold text-gray-900">ANDREW MARTINEZ</div>
          <div className="text-gray-600">Operations Manager</div>
        </div>
        <div className="mt-1.5">
          <div className="font-bold text-gray-800">Objective</div>
          <div className="text-gray-600">Seeking leadership role</div>
        </div>
        <div className="mt-1">
          <div className="font-bold text-gray-800">Work History</div>
          <div className="text-gray-700">Operations Manager — 2020</div>
          <div className="text-gray-500">Company ABC</div>
        </div>
      </div>
    )
  },
  {
    id: 'bold',
    name: 'Bold Impact',
    description: 'Strong visual design that makes a powerful statement.',
    color: '#dc2626',
    icon: <TrendingUp className="w-6 h-6" />,
    features: ['Bold design', 'High impact', 'Memorable'],
    sectionOrder: ['summary', 'experience', 'projects', 'skills', 'education', 'certifications'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 text-white font-bold flex items-center justify-center" style={{ backgroundColor: '#dc2626' }}>
          JENNIFER BROWN
        </div>
        <div className="mt-1.5 text-center">
          <div className="text-red-700 font-bold">SALES DIRECTOR</div>
          <div className="text-gray-600 text-[3px]">Driving revenue growth</div>
        </div>
        <div className="mt-1.5 bg-red-50 p-1 rounded">
          <div className="font-bold text-red-700">$5M+</div>
          <div className="text-red-600 text-[3px]">Annual Revenue</div>
        </div>
      </div>
    )
  },
  {
    id: 'simple',
    name: 'Simple Clean',
    description: 'Straightforward design that gets straight to the point.',
    color: '#6b7280',
    icon: <FileText className="w-6 h-6" />,
    features: ['Simple', 'Clean', 'Straightforward'],
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8">
          <div className="font-bold text-gray-900 text-lg">MARK TAYLOR</div>
          <div className="text-gray-500">Project Manager</div>
        </div>
        <div className="mt-1">
          <div className="text-gray-700">Experienced project manager</div>
        </div>
        <div className="mt-1">
          <div className="text-gray-700">Project Manager — 2018-Present</div>
          <div className="text-gray-500">Tech Solutions Inc</div>
        </div>
      </div>
    )
  },
  {
    id: 'premium',
    name: 'Premium Executive',
    description: 'High-end design for top-level professionals and executives.',
    color: '#92400e',
    icon: <Award className="w-6 h-6" />,
    features: ['Premium look', 'Executive style', 'Luxury feel'],
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 border-b-2" style={{ borderColor: '#92400e' }}>
          <div className="font-serif font-bold text-amber-900">WILLIAM ANDERSON</div>
          <div className="text-amber-700">Chief Financial Officer</div>
        </div>
        <div className="mt-1.5">
          <div className="text-gray-700">Strategic financial leader with</div>
          <div className="text-gray-500">20+ years experience</div>
        </div>
        <div className="mt-1 bg-amber-50 p-1 rounded">
          <div className="text-amber-800 font-semibold">Finance & Strategy</div>
        </div>
      </div>
    )
  },
  {
    id: 'standard',
    name: 'Standard Professional',
    description: 'Reliable and professional design that works for any job.',
    color: '#0d9488',
    icon: <Briefcase className="w-6 h-6" />,
    features: ['Standard layout', 'Professional', 'Reliable'],
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 bg-teal-600 px-2 flex items-center">
          <div className="text-white font-bold">SARAH DAVIS</div>
        </div>
        <div className="mt-1.5">
          <div className="font-bold text-teal-700">Human Resources Manager</div>
        </div>
        <div className="mt-1">
          <div className="text-gray-600">HR professional with expertise in</div>
          <div className="text-gray-500">talent acquisition & development</div>
        </div>
        <div className="mt-1">
          <div className="text-gray-700">HR Manager — 2015-Present</div>
        </div>
      </div>
    )
  },
  {
    id: 'functional',
    name: 'Functional Skills',
    description: 'Skills-focused design that highlights your capabilities first.',
    color: '#7c3aed',
    icon: <Cpu className="w-6 h-6" />,
    features: ['Skills-first', 'Capability focused', 'Transferable skills'],
    sectionOrder: ['skills', 'summary', 'experience', 'education', 'certifications', 'projects'],
    preview: (
      <div className="w-full h-full bg-white p-2 text-[4px]">
        <div className="h-8 text-center">
          <div className="font-bold text-purple-800">NICHOLAS HARRIS</div>
          <div className="text-purple-600">IT Specialist</div>
        </div>
        <div className="mt-1">
          <div className="font-bold text-purple-700 bg-purple-50 p-1 rounded">CORE COMPETENCIES</div>
          <div className="flex flex-wrap gap-0.5 mt-0.5">
            <span className="bg-purple-100 text-purple-700 px-1 rounded text-[3px]">Networking</span>
            <span className="bg-purple-100 text-purple-700 px-1 rounded text-[3px]">Security</span>
          </div>
        </div>
        <div className="mt-1">
          <div className="text-gray-600 text-[3px]">Systems administration expert</div>
        </div>
      </div>
    )
  },
];

const TemplateSelection = () => {
  const navigate = useNavigate();
  const setSelectedTemplate = useCVStore((state) => state.setSelectedTemplate);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    navigate('/create-cv');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1783e0] to-[#1567c4] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Perfect CV Template
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Select from our professionally designed templates to create your job-winning CV
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <AnimatedSection key={template.id} delay={index * 0.1}>
              <div 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => handleSelectTemplate(template)}
              >
                {/* Template Preview */}
                <div 
                  className="h-64 p-4 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${template.color}10, ${template.color}25)` }}
                >
                  {/* Realistic CV Preview */}
                  <div className="bg-white shadow-2xl rounded-sm w-40 h-52 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    {template.preview}
                  </div>
                  {/* Hover checkmark */}
                  <div 
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: template.color }}
                  >
                    <Check className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Select Button */}
                <div className="px-6 pb-6">
                  <button 
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-300 group-hover:bg-[#1783e0] group-hover:text-white"
                    style={{ backgroundColor: `${template.color}15`, color: template.color }}
                  >
                    Use This Template
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

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
                <Check className="w-5 h-5 text-[#1783e0] mt-0.5 flex-shrink-0" />
                <span>Consider your industry - corporate roles suit executive/classic templates, creative roles suit creative designs</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#1783e0] mt-0.5 flex-shrink-0" />
                <span>All our templates are ATS-friendly and will pass through applicant tracking systems</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[#1783e0] mt-0.5 flex-shrink-0" />
                <span>You can always change your template later if needed</span>
              </li>
            </ul>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default TemplateSelection;
