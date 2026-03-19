import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import useCVStore from '../../store/cvStore';

const ExperienceForm = () => {
  const { experience, addExperience, updateExperience, removeExperience } = useCVStore();
  const [expandedId, setExpandedId] = useState(null);

  const emptyExperience = {
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    achievements: [],
    currentlyWorking: false,
  };

  const handleAdd = () => {
    addExperience({ ...emptyExperience, id: Date.now() });
  };

  const handleChange = (index, field, value) => {
    const updated = { ...experience[index], [field]: value };
    updateExperience(index, updated);
  };

  const handleAchievementChange = (expIndex, achievementIndex, value) => {
    const updatedExp = { ...experience[expIndex] };
    const achievements = [...updatedExp.achievements];
    achievements[achievementIndex] = value;
    updatedExp.achievements = achievements;
    updateExperience(expIndex, updatedExp);
  };

  const addAchievement = (expIndex) => {
    const updatedExp = { ...experience[expIndex] };
    updatedExp.achievements = [...(updatedExp.achievements || []), ''];
    updateExperience(expIndex, updatedExp);
  };

  const removeAchievement = (expIndex, achievementIndex) => {
    const updatedExp = { ...experience[expIndex] };
    updatedExp.achievements = updatedExp.achievements.filter((_, i) => i !== achievementIndex);
    updateExperience(expIndex, updatedExp);
  };

  const handleRemove = (index) => {
    removeExperience(index);
    setExpandedId(null);
  };

  const toggleExpand = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
        <p className="text-gray-600">Add your professional work history, starting with the most recent position.</p>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experience.map((exp, index) => (
          <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div 
              className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-[#1783e0]" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {exp.position || 'New Position'}
                  </h3>
                  <p className="text-sm text-gray-500">{exp.company}</p>
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
                  {/* Company & Position */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleChange(index, 'company', e.target.value)}
                        placeholder="Google"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position *
                      </label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleChange(index, 'position', e.target.value)}
                        placeholder="Senior Software Engineer"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleChange(index, 'location', e.target.value)}
                      placeholder="San Francisco, CA"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                        placeholder="Jan 2024"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                        placeholder="Present"
                        disabled={exp.currentlyWorking}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all disabled:opacity-50"
                      />
                      <label className="flex items-center gap-2 mt-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.currentlyWorking}
                          onChange={(e) => handleChange(index, 'currentlyWorking', e.target.checked)}
                          className="w-4 h-4 text-[#1783e0] rounded focus:ring-[#1783e0]"
                        />
                        <span className="text-sm text-gray-600">I currently work here</span>
                      </label>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      rows={3}
                      placeholder="Brief description of your role and responsibilities..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Achievements */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Achievements (Bullet points)
                    </label>
                    <div className="space-y-2">
                      {(exp.achievements || []).map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-center gap-2">
                          <span className="text-[#1783e0]">•</span>
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) => handleAchievementChange(index, achievementIndex, e.target.value)}
                            placeholder="Achieved 20% increase in..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                          />
                          <button
                            onClick={() => removeAchievement(index, achievementIndex)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addAchievement(index)}
                        className="flex items-center gap-2 text-sm text-[#1783e0] hover:text-[#1567c4] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add achievement
                      </button>
                    </div>
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
        Add Experience
      </button>

      {/* Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use action verbs: Led, Developed, Increased, Implemented</li>
          <li>• Quantify achievements: "Increased sales by 25%" vs "Improved sales"</li>
          <li>• Focus on results and impact, not just duties</li>
          <li>• Include relevant keywords from job descriptions</li>
        </ul>
      </div>
    </div>
  );
};

export default ExperienceForm;
