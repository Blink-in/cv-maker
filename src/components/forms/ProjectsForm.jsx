import React, { useState } from 'react';
import { FolderGit2, Plus, Trash2, ChevronDown, ChevronUp, ExternalLink, Github } from 'lucide-react';
import useCVStore from '../../store/cvStore';

const ProjectsForm = () => {
  const { projects, addProject, removeProject } = useCVStore();
  const [expandedId, setExpandedId] = useState(null);

  const emptyProject = {
    name: '',
    description: '',
    technologies: [],
    role: '',
    startDate: '',
    endDate: '',
    demoUrl: '',
    repoUrl: '',
  };

  const [newTech, setNewTech] = useState({});

  const handleAdd = () => {
    addProject({ ...emptyProject, id: Date.now() });
  };

  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    // Remove and re-add with updated
    removeProject(index);
    projects.splice(index, 0, updated[index]);
  };

  const addTechnology = (index) => {
    const tech = newTech[index]?.trim();
    if (tech) {
      const updated = [...projects];
      updated[index] = { 
        ...updated[index], 
        technologies: [...updated[index].technologies, tech] 
      };
      removeProject(index);
      projects.splice(index, 0, updated[index]);
      setNewTech({ ...newTech, [index]: '' });
    }
  };

  const removeTechnology = (projIndex, techIndex) => {
    const updated = [...projects];
    updated[projIndex].technologies = updated[projIndex].technologies.filter((_, i) => i !== techIndex);
    removeProject(projIndex);
    projects.splice(projIndex, 0, updated[projIndex]);
  };

  const handleRemove = (index) => {
    removeProject(index);
    setExpandedId(null);
  };

  const toggleExpand = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
        <p className="text-gray-600">Showcase relevant projects to demonstrate your practical skills and experience.</p>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <FolderGit2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No projects added yet</p>
            <button
              onClick={handleAdd}
              className="text-[#1783e0] hover:text-[#1567c4] font-medium"
            >
              Add your first project
            </button>
          </div>
        ) : (
          projects.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div 
                className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center gap-3">
                  <FolderGit2 className="w-5 h-5 text-[#1783e0]" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {project.name || 'New Project'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {project.technologies?.join(', ') || 'No technologies specified'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-gray-400 hover:text-[#1783e0] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-gray-400 hover:text-[#1783e0] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
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
                    {/* Name & Role */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Name *
                        </label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => handleChange(index, 'name', e.target.value)}
                          placeholder="E-commerce Platform"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Role
                        </label>
                        <input
                          type="text"
                          value={project.role}
                          onChange={(e) => handleChange(index, 'role', e.target.value)}
                          placeholder="Full Stack Developer"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                        rows={3}
                        placeholder="Describe what the project does, your contributions, and key features..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Technologies */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Technologies Used
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(project.technologies || []).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                          >
                            {tech}
                            <button
                              onClick={() => removeTechnology(index, techIndex)}
                              className="ml-1 hover:text-red-500"
                            >
                              <Plus className="w-3 h-3 rotate-45" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newTech[index] || ''}
                          onChange={(e) => setNewTech({ ...newTech, [index]: e.target.value })}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTechnology(index);
                            }
                          }}
                          placeholder="Add technology (press Enter)"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none"
                        />
                        <button
                          onClick={() => addTechnology(index)}
                          className="px-4 py-2 bg-[#1783e0] text-white rounded-lg hover:bg-[#1567c4] transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="month"
                          value={project.startDate}
                          onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                          placeholder="2024"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date
                        </label>
                        <input
                          type="month"
                          value={project.endDate}
                          onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                          placeholder="2024"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* URLs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Demo URL
                        </label>
                        <input
                          type="url"
                          value={project.demoUrl}
                          onChange={(e) => handleChange(index, 'demoUrl', e.target.value)}
                          placeholder="https://myproject.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Repository URL
                        </label>
                        <input
                          type="url"
                          value={project.repoUrl}
                          onChange={(e) => handleChange(index, 'repoUrl', e.target.value)}
                          placeholder="https://github.com/username/project"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#1783e0] hover:text-[#1783e0] transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Project
      </button>

      {/* Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Include projects that are relevant to your target job</li>
          <li>• Use action words to describe your contributions</li>
          <li>• Mention technologies used and any notable outcomes</li>
          <li>• Add links to live demos or GitHub repositories</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsForm;
