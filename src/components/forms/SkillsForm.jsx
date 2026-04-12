import React, { useState } from 'react';
import { Code, Users, Languages, Plus, X, Sparkles } from 'lucide-react';
import useCVStore from '../../store/cvStore';

const SkillsForm = () => {
  const { skills, addSkill, removeSkill } = useCVStore();
  const [newTechnical, setNewTechnical] = useState('');
  const [newSoft, setNewSoft] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [proficiency, setProficiency] = useState('Intermediate');

  const handleAddTechnical = () => {
    if (newTechnical.trim()) {
      addSkill('technical', { name: newTechnical.trim(), level: proficiency });
      setNewTechnical('');
    }
  };

  const handleAddSoft = () => {
    if (newSoft.trim()) {
      addSkill('soft', { name: newSoft.trim(), level: proficiency });
      setNewSoft('');
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      addSkill('languages', { name: newLanguage.trim(), level: proficiency });
      setNewLanguage('');
    }
  };

  const handleKeyPress = (e, addFunction) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFunction();
    }
  };

  const commonTechnicalSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 
    'SQL', 'AWS', 'Docker', 'Kubernetes', 'Git', 'HTML/CSS',
    'Machine Learning', 'Data Analysis', 'Excel', 'PowerBI'
  ];

  const commonSoftSkills = [
    'Leadership', 'Communication', 'Teamwork', 'Problem Solving',
    'Time Management', 'Adaptability', 'Critical Thinking', 'Creativity'
  ];

  const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
        <p className="text-gray-600">Showcase your technical and soft skills to stand out to recruiters.</p>
      </div>

      {/* Proficiency Selector */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Default Proficiency Level
        </label>
        <select
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none"
        >
          {proficiencyLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="space-y-8">
        {/* Technical Skills */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-[#1783e0]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Technical Skills</h3>
              <p className="text-sm text-gray-500">Hard skills, tools, and technologies</p>
            </div>
          </div>

          {/* Add Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTechnical}
              onChange={(e) => setNewTechnical(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleAddTechnical)}
              placeholder="Add a technical skill..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none"
            />
            <button
              onClick={handleAddTechnical}
              className="px-4 py-2 bg-[#1783e0] text-white rounded-lg hover:bg-[#1567c4] transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.technical.map((skill, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {skill.name}
                <span className="text-xs text-blue-500">({skill.level})</span>
                <button
                  onClick={() => removeSkill('technical', index)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Quick Add Suggestions */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Quick add:</p>
            <div className="flex flex-wrap gap-2">
              {commonTechnicalSkills.slice(0, 8).map((skill) => (
                <button
                  key={skill}
                  onClick={() => {
                    if (!skills.technical.find(s => s.name === skill)) {
                      addSkill('technical', { name: skill, level: proficiency });
                    }
                  }}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Soft Skills</h3>
              <p className="text-sm text-gray-500">Interpersonal and personal abilities</p>
            </div>
          </div>

          {/* Add Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSoft}
              onChange={(e) => setNewSoft(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleAddSoft)}
              placeholder="Add a soft skill..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none"
            />
            <button
              onClick={handleAddSoft}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.soft.map((skill, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
              >
                {skill.name}
                <button
                  onClick={() => removeSkill('soft', index)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Quick Add Suggestions */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Quick add:</p>
            <div className="flex flex-wrap gap-2">
              {commonSoftSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => {
                    if (!skills.soft.find(s => s.name === skill)) {
                      addSkill('soft', { name: skill, level: proficiency });
                    }
                  }}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Languages className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Languages</h3>
              <p className="text-sm text-gray-500">Languages you can speak or write</p>
            </div>
          </div>

          {/* Add Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleAddLanguage)}
              placeholder="Add a language (e.g., English - Native)..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none"
            />
            <button
              onClick={handleAddLanguage}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Language Tags */}
          <div className="flex flex-wrap gap-2">
            {skills.languages.map((lang, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
              >
                {lang.name}
                <button
                  onClick={() => removeSkill('languages', index)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#1783e0]" />
          <h4 className="font-semibold text-gray-900">AI Suggestion</h4>
        </div>
        <p className="text-sm text-gray-600">
          Include 5-8 technical skills relevant to your target job. Use keywords from job descriptions to pass ATS systems.
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;
