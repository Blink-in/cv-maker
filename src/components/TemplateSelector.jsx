// import React, { useState } from 'react';
// import { Check, ZoomIn, User, Image, Layout, Palette } from 'lucide-react';
// import useCVStore from '../store/cvStore';
// import CVTemplates from './CVTemplates';
// import { colorPresets } from './CVTemplates';

// const TemplateSelector = () => {
//   const { selectedTemplate, setSelectedTemplate, selectedColor, setSelectedColor } = useCVStore();
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [showHeadshot, setShowHeadshot] = useState(true);
//   const [showGraphics, setShowGraphics] = useState(true);
//   const [expandedTemplate, setExpandedTemplate] = useState(null);

//   const layoutFilters = [
//     { id: 'all', label: 'All' },
//     { id: 'single', label: 'Single Column' },
//     { id: 'two-column', label: 'Two Column' },
//     { id: 'sidebar', label: 'Sidebar' },
//   ];

//   const sampleData = {
//     fullName: 'Alex Johnson',
//     professionalTitle: 'Senior Software Engineer',
//     email: 'alex@example.com',
//     phone: '(555) 123-4567',
//     location: 'San Francisco, CA',
//     summary: 'Experienced software engineer with 8+ years developing scalable applications and leading engineering teams.',
//     experience: [
//       {
//         position: 'Senior Engineer',
//         company: 'Tech Corp',
//         startDate: '2020',
//         endDate: 'Present',
//         currentlyWorking: true,
//         description: 'Led development of core platform features serving 1M+ users.'
//       }
//     ],
//     skills: {
//       technical: [
//         { name: 'React' }, { name: 'Node.js' }, { name: 'TypeScript' },
//         { name: 'Python' }, { name: 'AWS' }, { name: 'PostgreSQL' }
//       ]
//     },
//     education: [
//       { degree: 'B.S. Computer Science', institution: 'Stanford University', endDate: '2018' }
//     ]
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Filter Bar */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
//         <div className="flex flex-wrap items-center gap-6">
//           {/* Layout Filters */}
//           <div className="flex items-center gap-2">
//             <Layout className="w-4 h-4 text-gray-600" />
//             <div className="flex gap-1">
//               {layoutFilters.map((filter) => (
//                 <button
//                   key={filter.id}
//                   onClick={() => setSelectedFilter(filter.id)}
//                   className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                     selectedFilter === filter.id
//                       ? 'bg-[#1783e0] text-white'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   {filter.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="h-6 w-px bg-gray-200"></div>

//           {/* Toggle Switches */}
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setShowHeadshot(!showHeadshot)}
//               className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                 showHeadshot ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
//               }`}
//             >
//               <User className="w-4 h-4" />
//               Headshot
//             </button>

//             <button
//               onClick={() => setShowGraphics(!showGraphics)}
//               className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                 showGraphics ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
//               }`}
//             >
//               <Image className="w-4 h-4" />
//               Graphics
//             </button>
//           </div>

//           <div className="h-6 w-px bg-gray-200"></div>

//           {/* Color Selector */}
//           <div className="flex items-center gap-3">
//             <Palette className="w-4 h-4 text-gray-600" />
//             <div className="flex gap-2">
//               {colorPresets.map((color) => (
//                 <button
//                   key={color.value}
//                   onClick={() => setSelectedColor(color.value)}
//                   className={`w-8 h-8 rounded-full border-2 transition-all transform hover:scale-110 ${
//                     selectedColor === color.value ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent'
//                   }`}
//                   style={{ backgroundColor: color.value }}
//                   title={color.name}
//                 >
//                   {selectedColor === color.value && (
//                     <Check className="w-4 h-4 mx-auto text-white" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Templates Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//         {CVTemplates.map((template) => {
//           const TemplateComponent = template.component;
//           const isSelected = selectedTemplate?.id === template.id;
          
//           return (
//             <div
//               key={template.id}
//               className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 cursor-pointer group ${
//                 isSelected ? 'ring-2 ring-[#1783e0] shadow-lg' : 'hover:shadow-xl hover:-translate-y-1'
//               }`}
//               onClick={() => setSelectedTemplate(template)}
//             >
//               {/* Preview Container - Centered and visible */}
//               <div className="relative p-1 bg-gray-50">
//                 <div className="relative w-full" style={{ paddingBottom: '130%' }}>
//                   <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white shadow-sm overflow-hidden">
//                     <div className="transform scale-[0.35] origin-center pointer-events-none">
//                       <TemplateComponent 
//                         data={sampleData}
//                         color={selectedColor}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Zoom Button - Centered bottom */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setExpandedTemplate(expandedTemplate === template.id ? null : template.id);
//                   }}
//                   className="absolute bottom-3 left-1/2 -translate-x-1/2 p-2 bg-white/95 backdrop-blur rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
//                 >
//                   <ZoomIn className="w-4 h-4 text-gray-700" />
//                 </button>

//                 {/* Selected Badge */}
//                 {isSelected && (
//                   <div className="absolute top-2 left-2 px-2 py-1 bg-[#1783e0] text-white text-xs font-medium rounded-full shadow-md flex items-center gap-1">
//                     <Check className="w-3 h-3" />
//                     Selected
//                   </div>
//                 )}
//               </div>

//               {/* Template Info */}
//               <div className="p-3">
//                 <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
//                   <span>{template.icon}</span>
//                   {template.name}
//                 </h3>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Expanded Preview Modal */}
//       {expandedTemplate && (
//         <div 
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//           onClick={() => setExpandedTemplate(null)}
//         >
//           <div 
//             className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {CVTemplates.find(t => t.id === expandedTemplate)?.name}
//                 </h2>
//                 <button 
//                   onClick={() => setExpandedTemplate(null)}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="relative w-full" style={{ paddingBottom: '130%' }}>
//                 <div className="absolute inset-0 flex items-center justify-center border rounded-xl overflow-hidden shadow-lg">
//                   <div className="transform scale-[0.55] origin-center pointer-events-none">
//                     {React.createElement(CVTemplates.find(t => t.id === expandedTemplate)?.component, { 
//                       data: sampleData, 
//                       color: selectedColor
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TemplateSelector;
import React, { useState } from 'react';
import { Check, ZoomIn, User, Image, Layout, Palette } from 'lucide-react';
import useCVStore from '../store/cvStore';
import CVTemplates from './CVTemplates';
import { colorPresets } from './CVTemplates';

const PREVIEW_PAGE_WIDTH = 794;
const PREVIEW_PAGE_HEIGHT = 1123;
const CARD_PREVIEW_SCALE = 0.33;
const MODAL_PREVIEW_SCALE = 0.6;

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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                showHeadshot ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <User className="w-4 h-4" />
              Headshot
            </button>

            <button
              onClick={() => setShowGraphics(!showGraphics)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
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
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.value ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {CVTemplates.map((template) => {
          const TemplateComponent = template.component;
          const isSelected = selectedTemplate?.id === template.id;

          return (
            <div
              key={template.id}
              className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all cursor-pointer group ${
                isSelected
                  ? 'ring-2 ring-[#1783e0] shadow-lg'
                  : 'hover:shadow-xl hover:-translate-y-1'
              }`}
              onClick={() => setSelectedTemplate(template)}
            >
              
              {/* Preview */}
        
              <div className="relative p-3 bg-gray-50">
                <div className="relative aspect-[210/297] w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="absolute inset-0 flex justify-center overflow-hidden p-3">
                    <div
                      className="origin-top pointer-events-none"
                      style={{
                        width: `${PREVIEW_PAGE_WIDTH}px`,
                        height: `${PREVIEW_PAGE_HEIGHT}px`,
                        transform: `scale(${CARD_PREVIEW_SCALE})`,
                      }}
                    >
                      <TemplateComponent
                        data={sampleData}
                        color={selectedColor}
                      />
                    </div>
                  </div>
                </div>


                {/* Zoom Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedTemplate(template.id);
                  }}
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* Selected Badge */}
                {isSelected && (
                  <div className="absolute top-5 left-5 px-2 py-1 bg-[#1783e0] text-white text-xs rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Selected
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  <span>{template.icon}</span>
                  {template.name}
                </h3>
              </div>

            </div>
          );
        })}
      </div>

      {/* Expanded Modal */}
      {expandedTemplate && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6"
          onClick={() => setExpandedTemplate(null)}
        >
          <div
            className="bg-white rounded-xl max-w-6xl w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {CVTemplates.find((t) => t.id === expandedTemplate)?.name}
              </h2>
              <button onClick={() => setExpandedTemplate(null)}>✕</button>
            </div>

            <div className="max-h-[80vh] overflow-auto rounded-xl bg-gray-100 p-4">
              <div className="flex justify-center">
                <div
                  className="relative overflow-hidden rounded-lg bg-white shadow-lg"
                  style={{
                    width: `${PREVIEW_PAGE_WIDTH * MODAL_PREVIEW_SCALE}px`,
                    height: `${PREVIEW_PAGE_HEIGHT * MODAL_PREVIEW_SCALE}px`,
                  }}
                >
                  <div
                    className="origin-top-left pointer-events-none"
                    style={{
                      width: `${PREVIEW_PAGE_WIDTH}px`,
                      height: `${PREVIEW_PAGE_HEIGHT}px`,
                      transform: `scale(${MODAL_PREVIEW_SCALE})`,
                    }}
                  >
                    {React.createElement(
                      CVTemplates.find((t) => t.id === expandedTemplate)?.component,
                      {
                        data: sampleData,
                        color: selectedColor
                      }
                    )}
                  </div>
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
