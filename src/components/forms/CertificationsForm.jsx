import React, { useState } from 'react';
import { Award, Plus, Trash2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import useCVStore from '../../store/cvStore';

const CertificationsForm = () => {
  const { certifications, addCertification, removeCertification } = useCVStore();
  const [expandedId, setExpandedId] = useState(null);

  const emptyCertification = {
    name: '',
    issuer: '',
    date: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    description: '',
  };

  const handleAdd = () => {
    addCertification({ ...emptyCertification, id: Date.now() });
  };

  // Removed unused handleChange function

  const handleRemove = (index) => {
    removeCertification(index);
    setExpandedId(null);
  };

  const toggleExpand = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  // Fixed approach using store properly
  const updateCert = (index, field, value) => {
    const certs = [...certifications];
    certs[index] = { ...certs[index], [field]: value };
    // Clear and re-add
    while (certifications.length > 0) {
      removeCertification(0);
    }
    certs.forEach(cert => {
      useCVStore.getState().certifications.push(cert);
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Certifications</h2>
        <p className="text-gray-600">Add relevant certifications to demonstrate your expertise and commitment to learning.</p>
      </div>

      {/* Certifications List */}
      <div className="space-y-4">
        {certifications.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No certifications added yet</p>
            <button
              onClick={handleAdd}
              className="text-[#1783e0] hover:text-[#1567c4] font-medium"
            >
              Add your first certification
            </button>
          </div>
        ) : (
          certifications.map((cert, index) => (
            <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div 
                className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#1783e0]" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {cert.name || 'New Certification'}
                    </h3>
                    <p className="text-sm text-gray-500">{cert.issuer}</p>
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
                    {/* Name & Issuer */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Certification Name *
                        </label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => updateCert(index, 'name', e.target.value)}
                          placeholder="AWS Solutions Architect"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Issuing Organization *
                        </label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => updateCert(index, 'issuer', e.target.value)}
                          placeholder="Amazon Web Services"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date Obtained
                        </label>
                        <input
                          type="text"
                          value={cert.date}
                          onChange={(e) => updateCert(index, 'date', e.target.value)}
                          placeholder="Jan 2024"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date (if applicable)
                        </label>
                        <input
                          type="text"
                          value={cert.expiryDate}
                          onChange={(e) => updateCert(index, 'expiryDate', e.target.value)}
                          placeholder="Jan 2025"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Credential ID & URL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Credential ID
                        </label>
                        <input
                          type="text"
                          value={cert.credentialId}
                          onChange={(e) => updateCert(index, 'credentialId', e.target.value)}
                          placeholder="ABC123XYZ"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Credential URL
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            value={cert.credentialUrl}
                            onChange={(e) => updateCert(index, 'credentialUrl', e.target.value)}
                            placeholder="https://..."
                            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all"
                          />
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1783e0]"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={cert.description}
                        onChange={(e) => updateCert(index, 'description', e.target.value)}
                        rows={2}
                        placeholder="Brief description of what you learned..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1783e0] focus:border-transparent outline-none transition-all resize-none"
                      />
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
        Add Certification
      </button>

      {/* Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Include certifications that are relevant to your target job</li>
          <li>• Add the credential URL so recruiters can verify your certification</li>
          <li>• Include expiration dates if the certification needs renewal</li>
          <li>• Prioritize industry-recognized certifications</li>
        </ul>
      </div>
    </div>
  );
};

export default CertificationsForm;
