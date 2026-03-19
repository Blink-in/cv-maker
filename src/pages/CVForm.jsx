import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, GraduationCap, Briefcase, Code, Award, FolderGit2, 
  ChevronLeft, ChevronRight, Save, Eye, CheckCircle, FileText, 
  LayoutTemplate
} from 'lucide-react';
import useCVStore from '../store/cvStore';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import EducationForm from '../components/forms/EducationForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import SkillsForm from '../components/forms/SkillsForm';
import CertificationsForm from '../components/forms/CertificationsForm';
import ProjectsForm from '../components/forms/ProjectsForm';

const templates = [
  { id: 'modern', name: 'Modern Professional', color: '#1783e0' },
  { id: 'classic', name: 'Classic Traditional', color: '#374151' },
  { id: 'executive', name: 'Executive Elite', color: '#1f2937' },
  { id: 'creative', name: 'Creative Designer', color: '#8b5cf6' },
  { id: 'minimal', name: 'Minimalist', color: '#10b981' },
  { id: 'academic', name: 'Academic Scholar', color: '#f59e0b' },
  { id: 'professional', name: 'Corporate Professional', color: '#2563eb' },
  { id: 'elegant', name: 'Elegant Sophisticated', color: '#7c3aed' },
  { id: 'fresh', name: 'Fresh Modern', color: '#06b6d4' },
  { id: 'timeless', name: 'Timeless Classic', color: '#4b5563' },
  { id: 'bold', name: 'Bold Impact', color: '#dc2626' },
  { id: 'simple', name: 'Simple Clean', color: '#6b7280' },
  { id: 'premium', name: 'Premium Executive', color: '#92400e' },
  { id: 'standard', name: 'Standard Professional', color: '#0d9488' },
  { id: 'functional', name: 'Functional Skills', color: '#7c3aed' },
];

const steps = [
  { id: 0, name: 'Personal Info', icon: User, description: 'Basic information' },
  { id: 1, name: 'Education', icon: GraduationCap, description: 'Academic background' },
  { id: 2, name: 'Experience', icon: Briefcase, description: 'Work history' },
  { id: 3, name: 'Skills', icon: Code, description: 'Your abilities' },
  { id: 4, name: 'Certifications', icon: Award, description: 'Certificates' },
  { id: 5, name: 'Projects', icon: FolderGit2, description: 'Projects' },
];

const CVForm = () => {
  const navigate = useNavigate();
  const { 
    currentStep, 
    setCurrentStep, 
    selectedTemplate,
    setSelectedTemplate 
  } = useCVStore();

  const handleTemplateChange = (e) => {
    const template = templates.find(t => t.id === e.target.value);
    setSelectedTemplate(template);
  };

  // Redirect if no template selected - but keep existing data
  React.useEffect(() => {
    if (!selectedTemplate) {
      navigate('/templates');
    }
  }, [selectedTemplate, navigate]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePreview = () => {
    navigate('/preview');
  };

  const handleChangeTemplate = () => {
    navigate('/templates');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <EducationForm />;
      case 2:
        return <ExperienceForm />;
      case 3:
        return <SkillsForm />;
      case 4:
        return <CertificationsForm />;
      case 5:
        return <ProjectsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create Your CV</h1>
                <p className="text-gray-600">Step {currentStep + 1} of {steps.length}: {steps[currentStep].name}</p>
              </div>
              
              {/* Template Selector */}
              <div className="md:ml-6 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <LayoutTemplate className="w-5 h-5 text-gray-400" />
                  <select
                    value={selectedTemplate?.id || ''}
                    onChange={handleTemplateChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none bg-white min-w-[200px]"
                  >
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleChangeTemplate}
                  className="px-3 py-2 text-sm text-[#1783e0] hover:bg-blue-50 rounded-lg transition-colors"
                >
                  View All Templates
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePreview}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={handlePreview}
                className="flex items-center gap-2 px-4 py-2 bg-[#1783e0] text-white rounded-lg hover:bg-[#1567c4] transition-colors"
              >
                <Save className="w-4 h-4" />
                Save & Download
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-[#1783e0] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Step Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Form Steps
              </h3>
              <nav className="space-y-2">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-[#1783e0] text-white shadow-md' 
                          : isCompleted 
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                      <span className="font-medium">{step.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Template Preview in Sidebar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mt-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Selected Template
              </h3>
              <div 
                className="rounded-lg p-3 text-center"
                style={{ backgroundColor: `${selectedTemplate?.color || '#1783e0'}15` }}
              >
                <div 
                  className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: selectedTemplate?.color || '#1783e0' }}
                >
                  <LayoutTemplate className="w-4 h-4 text-white" />
                </div>
                <p className="font-semibold text-sm" style={{ color: selectedTemplate?.color || '#1783e0' }}>
                  {selectedTemplate?.name || 'Modern Professional'}
                </p>
                <button
                  onClick={handleChangeTemplate}
                  className="text-xs text-gray-500 hover:text-[#1783e0] mt-1"
                >
                  Change Template
                </button>
              </div>
            </div>
          </div>

          {/* Main Form Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 0
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              
              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handlePreview}
                  className="flex items-center gap-2 px-6 py-3 bg-[#1783e0] text-white rounded-lg font-medium hover:bg-[#1567c4] transition-colors shadow-md"
                >
                  Preview CV
                  <Eye className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-[#1783e0] text-white rounded-lg font-medium hover:bg-[#1567c4] transition-colors shadow-md"
                >
                  Next Step
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVForm;
