import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, ArrowLeft, Mail, User, Briefcase, Building, Code, FolderGit2, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCVStore from '../store/cvStore';

const CoverLetterWriter = () => {
  const navigate = useNavigate();
  const { personalInfo, skills, projects, experience } = useCVStore();
  const [formData, setFormData] = useState({
    recipientName: '',
    companyName: '',
    jobTitle: '',
    experienceLevel: 'mid',
    yourName: personalInfo.fullName || '',
    yourTitle: personalInfo.professionalTitle || '',
  });
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCoverLetter = () => {
    if (!formData.jobTitle || !formData.companyName) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const letter = generateLetter(formData);
      setCoverLetter(letter);
      setIsGenerating(false);
    }, 1500);
  };

  const generateLetter = (data) => {
    const name = data.yourName || '[Your Name]';
    const title = data.yourTitle || '[Your Title]';
    const recipient = data.recipientName || 'Hiring Manager';
    const company = data.companyName;
    const jobTitle = data.jobTitle;
    const level = data.experienceLevel;

    // Extract actual user data
    const technicalSkills = skills.technical.slice(0, 5).map(s => s.name || s).join(', ');
    const relevantProject = projects[0];
    const relevantExperience = experience[0];

    // Generate opening
    const opening = `Dear ${recipient},

I am writing to express my enthusiastic interest in the ${jobTitle} position at ${company}. When I saw this opening, I immediately recognized that my background in building scalable applications and solving complex technical problems aligns perfectly with what your team is looking for.`;

    // Generate skills section
    const skillsSection = `

My technical expertise includes hands-on experience with ${technicalSkills || 'modern software development technologies'}. ${level === 'junior' || level === 'beginner' 
  ? 'As a growing developer, I have focused on building strong fundamentals while consistently delivering high-quality work.' 
  : 'Over my career, I have used these technologies to deliver production-grade systems that meet business requirements.'}`;

    // Generate projects section
    let projectsSection = '';
    if (relevantProject) {
      projectsSection = `

For example, I recently built ${relevantProject.name || 'a full-stack application'} ${relevantProject.description ? `- ${relevantProject.description}` : ''}. This project required me to ${relevantProject.technologies 
  ? `work with ${relevantProject.technologies.slice(0, 3).join(', ')}` 
  : 'design system architecture, implement clean code patterns, and ensure proper testing'}. Through this work, I learned how to translate business needs into technical solutions while maintaining high performance standards.`;
    }

    // Generate experience section
    let experienceSection = '';
    if (relevantExperience) {
      experienceSection = `

In my role as ${relevantExperience.position || 'a software engineer'} at ${relevantExperience.company || 'my previous company'}, I ${relevantExperience.description 
  ? relevantExperience.description 
  : 'contributed to core product features that were used by thousands of users'}. ${relevantExperience.achievements?.[0] 
  ? `Most notably, ${relevantExperience.achievements[0]}` 
  : 'I regularly collaborated with cross-functional teams to deliver features on time while maintaining code quality standards.'}`;
    }

    // Generate company fit
    const companyFit = `

What particularly draws me to ${company} is ${company.includes('tech') || company.includes('software') || company.includes('digital')
  ? 'your reputation for building innovative products that actually move the industry forward. I admire how your team balances technical excellence with user needs.'
  : 'your commitment to quality and innovation. I appreciate companies that value long-term solutions over quick fixes.'} I am particularly excited about the opportunity to grow alongside talented engineers while contributing meaningfully to your mission.`;

    // Generate closing
    const closing = `

I am confident that my technical skills, problem-solving approach, and dedication to continuous learning would make me a valuable addition to your team. I would welcome the chance to discuss how I can help ${company} continue to succeed.

Thank you for considering my application. I look forward to hearing from you.

Sincerely,
${name}`;

    return opening + skillsSection + projectsSection + experienceSection + companyFit + closing;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFormData({
      recipientName: '',
      companyName: '',
      jobTitle: '',
      experienceLevel: 'mid',
      yourName: personalInfo.fullName || '',
      yourTitle: personalInfo.professionalTitle || '',
    });
    setCoverLetter('');
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#1783e0] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[#1783e0] to-[#8b5cf6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Cover Letter Writer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate a professional cover letter tailored to the job you're applying for. 
            Our AI helps you create compelling content that grabs attention.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Your Name
              </label>
              <input
                type="text"
                name="yourName"
                value={formData.yourName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-1" />
                Your Title
              </label>
              <input
                type="text"
                name="yourTitle"
                value={formData.yourTitle}
                onChange={handleChange}
                placeholder="Software Engineer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-1" />
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Google"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-1" />
                Job Title *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Senior Software Engineer"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Recipient Name (Optional)
              </label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                placeholder="John Smith"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Award className="w-4 h-4 inline mr-1" />
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="beginner">Entry Level / Beginner</option>
                <option value="junior">Junior / 1-2 Years</option>
                <option value="mid">Mid Level / 3-5 Years</option>
                <option value="senior">Senior / 5+ Years</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Fill in the details above to generate your cover letter
            </p>
            <button
              onClick={generateCoverLetter}
              disabled={!formData.jobTitle || !formData.companyName || isGenerating}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                formData.jobTitle && formData.companyName && !isGenerating
                  ? 'bg-gradient-to-r from-[#1783e0] to-[#8b5cf6] text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Cover Letter
                </>
              )}
            </button>
          </div>
        </div>

        {coverLetter && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Cover Letter</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1783e0] text-white rounded-lg hover:bg-[#1567c4] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100 leading-relaxed">
                {coverLetter}
              </pre>
            </div>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-[#1783e0]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600">
              Smart generation based on your details and job requirements
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#8b5cf6]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Professional</h3>
            <p className="text-sm text-gray-600">
              Well-structured letters that make a great first impression
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Copy className="w-6 h-6 text-[#10b981]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy to Edit</h3>
            <p className="text-sm text-gray-600">
              Copy and customize your letter for any job application
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterWriter;