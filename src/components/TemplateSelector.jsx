import React, { useState } from 'react';
import { Check, ZoomIn, User, Image, Layout, Palette } from 'lucide-react';
import useCVStore from '../store/cvStore';
import CVTemplates from './CVTemplates';
import { colorPresets } from './CVTemplates';

const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate, selectedColor, setSelectedColor } = useCVStore();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showHeadshot, setShowHeadshot] = useState(true);
  const [showGraphics, setShowGraphics] = useState(true);
  const [expandedTemplate, setExpandedTemplate] = useState(null);

  const layoutFilters = [
    { id: 'all', label: 'All' },
    { id: 'single', label: 'Single Column' },
    { id: 'two-column', label: 'Two Column' },
    { id: 'sidebar', label: 'Sidebar' },
  ];

  const sampleData = {
    fullName: 'Alex Johnson',
    professionalTitle: 'Senior Software Engineer',
    email: 'alex@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Experienced software engineer with 8+ years developing scalable applications and leading engineering teams.',
    experience: [
      {
        position: 'Senior Engineer',
        company: 'Tech Corp',
        startDate: '2020',
        endDate: 'Present',
        currentlyWorking: true,
        description: 'Led development of core platform features serving 1M+ users.'
      }
    ],
    skills: {
      technical: [
        { name: 'React' }, { name: 'Node.js' }, { name: 'TypeScript' },
        { name: 'Python' }, { name: 'AWS' }, { name: 'PostgreSQL' }
      ]
    },
    education: [
      { degree: 'B.S. Computer Science', institution: 'Stanford University', endDate: '2018' }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="flex flex-wrap items-center gap-6">
          {/* Layout Filters */}
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4 text-gray-600" />
            <div className="flex gap-1">
              {layoutFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-[#1783e0] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-6 w-px bg-gray-200"></div>

          {/* Toggle Switches */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowHeadshot(!showHeadshot)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                showHeadshot ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <User className="w-4 h-4" />
              Headshot
            </button>

            <button
              onClick={() => setShowGraphics(!showGraphics)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                showGraphics ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Image className="w-4 h-4" />
              Graphics
            </button>
          </div>

          <div className="h-6 w-px bg-gray-200"></div>

          {/* Color Selector */}
          <div className="flex items-center gap-3">
            <Palette className="w-4 h-4 text-gray-600" />
            <div className="flex gap-2">
              {colorPresets.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 ${
                    selectedColor === color.value ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {selectedColor === color.value && (
                    <Check className="w-4 h-4 mx-auto text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CVTemplates.map((template) => {
          const TemplateComponent = template.component;
          const isSelected = selectedTemplate?.id === template.id;
          
          return (
            <div
              key={template.id}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer group ${
                isSelected ? 'ring-4 ring-[#1783e0] ring-offset-2' : ''
              } hover:shadow-xl hover:-translate-y-1`}
              onClick={() => setSelectedTemplate(template)}
            >
              {/* Preview Container */}
              <div className="relative p-2 bg-gray-100">
                <div className="overflow-hidden rounded-lg">
                  <div className="transform scale-[0.18] origin-top-left w-[555%] h-[555%] pointer-events-none">
                    <TemplateComponent 
                      data={sampleData}
                      color={selectedColor}
                    />
                  </div>
                </div>

                {/* Zoom Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedTemplate(expandedTemplate === template.id ? null : template.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <ZoomIn className="w-4 h-4 text-gray-700" />
                </button>

                {/* Selected Badge */}
                {isSelected && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-[#1783e0] text-white text-xs font-medium rounded-full shadow-md flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Selected
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="text-lg">{template.icon}</span>
                  {template.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Preview Modal */}
      {expandedTemplate && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedTemplate(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {CVTemplates.find(t => t.id === expandedTemplate)?.name}
                </h2>
                <button 
                  onClick={() => setExpandedTemplate(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="border rounded-xl overflow-hidden">
                <div className="transform scale-[0.4] origin-top-left w-[250%] h-[250%] pointer-events-none">
                  {React.createElement(CVTemplates.find(t => t.id === expandedTemplate)?.component, { 
                    data: sampleData, 
                    color: selectedColor 
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;