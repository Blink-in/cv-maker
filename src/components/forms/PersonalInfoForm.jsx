import React from 'react';
import { User, Mail, Phone, MapPin, Globe, Linkedin, FileText } from 'lucide-react';
import useCVStore from '../../store/cvStore';

const PersonalInfoForm = () => {
  const { personalInfo, setPersonalInfo } = useCVStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ [name]: value });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Start with your basic contact information. This is how recruiters will reach you.</p>
      </div>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Email & Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Address & Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Location
          </label>
          <input
            type="text"
            name="address"
            value={personalInfo.address}
            onChange={handleChange}
            placeholder="New York, NY, USA"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* LinkedIn & Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Linkedin className="w-4 h-4 inline mr-2" />
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="linkedIn"
              value={personalInfo.linkedIn}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/johndoe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              Portfolio / Website
            </label>
            <input
              type="url"
              name="portfolio"
              value={personalInfo.portfolio}
              onChange={handleChange}
              placeholder="https://johndoe.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Professional Summary *
          </label>
          <textarea
            name="summary"
            value={personalInfo.summary}
            onChange={handleChange}
            rows={6}
            placeholder="Write a compelling summary that highlights your key qualifications, years of experience, and career goals. This is your chance to make a strong first impression..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all resize-none"
          />
          <p className="text-sm text-gray-500 mt-2">
            {personalInfo.summary.length}/500 characters (recommended)
          </p>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use a professional email address (firstname.lastname@email.com)</li>
            <li>• Keep your summary concise - 3-4 sentences maximum</li>
            <li>• Include keywords relevant to your target job</li>
            <li>• Highlight your unique value proposition</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
