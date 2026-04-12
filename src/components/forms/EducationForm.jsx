import React, { useState } from 'react';
import { GraduationCap, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import useCVStore from '../../store/cvStore';

const EducationForm = () => {
  const { education, addEducation, updateEducation, removeEducation } = useCVStore();
  const [expandedId, setExpandedId] = useState(null);

  const emptyEducation = {
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: '',
    currentlyStudying: false,
  };

  const handleAdd = () => {
    addEducation({ ...emptyEducation, id: Date.now() });
  };

  const handleChange = (index, field, value) => {
    const updated = { ...education[index], [field]: value };
    updateEducation(index, updated);
  };

  const handleRemove = (index) => {
    removeEducation(index);
    setExpandedId(null);
  };

  const toggleExpand = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  const degreeTypes = [
    'High School Diploma',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctorate (PhD)',
    'Professional Degree',
    'Certificate',
    'Bootcamp',
    'Other',
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
        <p className="text-gray-600">Add your educational background, starting with the most recent.</p>
      </div>

      {/* Education List */}
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div 
              className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-[#1783e0]" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree || edu.fieldOfStudy || 'New Education'}
                  </h3>
                  <p className="text-sm text-gray-500">{edu.institution}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedId === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === index && (
              <div className="px-6 pb-6 border-t border-gray-200">
                <div className="mt-4 space-y-4">
                  {/* Institution */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution *
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleChange(index, 'institution', e.target.value)}
                      placeholder="Harvard University"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Degree & Field */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree Type
                      </label>
                      <select
                        value={edu.degree}
                        onChange={(e) => handleChange(index, 'degree', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Select degree</option>
                        {degreeTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
                        placeholder="Computer Science"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                        placeholder="2020"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text" placeholder="2024"
                          value={edu.endDate}
                          onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                          disabled={edu.currentlyStudying}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all disabled:opacity-50"
                        />
                      </div>
                      <label className="flex items-center gap-2 mt-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={edu.currentlyStudying}
                          onChange={(e) => handleChange(index, 'currentlyStudying', e.target.checked)}
                          className="w-4 h-4 text-[#1783e0] rounded focus:ring-[#1783e0]"
                        />
                        <span className="text-sm text-gray-600">Currently studying</span>
                      </label>
                    </div>
                  </div>

                  {/* GPA */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GPA (Optional)
                    </label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                      placeholder="3.8 / 4.0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Achievements, coursework, etc.)
                    </label>
                    <textarea
                      value={edu.description}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      rows={3}
                      placeholder="Relevant coursework, achievements, honors..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#1783e0] hover:text-[#1783e0] transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Education
      </button>

      {/* Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• List education in reverse chronological order (most recent first)</li>
          <li>• Include relevant coursework for recent graduates</li>
          <li>• Mention honors, awards, or high GPA if impressive</li>
          <li>• You can omit GPA if it's not strong (below 3.0)</li>
        </ul>
      </div>
    </div>
  );
};

export default EducationForm;
