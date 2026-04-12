import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap, Award, Code, FolderGit2, User } from 'lucide-react';

// Base CV Data types
const CVTemplateWrapper = ({ children, color = '#1783e0' }) => (
  <div className="bg-white shadow-xl rounded-xl overflow-hidden w-full" style={{ width: '210mm', minHeight: '297mm' }}>
    {children}
  </div>
);

// Shared Section Components
const SectionTitle = ({ title, icon: Icon, color }) => (
  <div className="flex items-center gap-2 mb-3">
    {Icon && <Icon className="w-4 h-4" style={{ color }} />}
    <h2 className="font-bold uppercase tracking-wider text-sm" style={{ color }}>
      {title}
    </h2>
    <div className="flex-1 h-px ml-2" style={{ backgroundColor: `${color}30` }} />
  </div>
);

// Template 1: Minimal Single Column
export const Template1 = ({ data, color }) => (
  <CVTemplateWrapper color={color}>
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b" style={{ borderColor: `${color}20` }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color }}>{data.fullName || 'Your Name'}</h1>
        {data.professionalTitle && <p className="text-lg text-gray-600 mb-3">{data.professionalTitle}</p>}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          {data.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {data.email}</span>}
          {data.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {data.phone}</span>}
          {data.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {data.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <SectionTitle title="Professional Summary" icon={User} color={color} />
          <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="mb-6">
          <SectionTitle title="Experience" icon={Briefcase} color={color} />
          <div className="space-y-4">
            {data.experience.slice(0, 3).map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-sm text-gray-600">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.technical?.length > 0 && (
        <div className="mb-6">
          <SectionTitle title="Skills" icon={Code} color={color} />
          <div className="flex flex-wrap gap-2">
            {data.skills.technical.slice(0, 12).map((skill, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${color}15`, color }}>
                {skill.name || skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div>
          <SectionTitle title="Education" icon={GraduationCap} color={color} />
          <div className="space-y-3">
            {data.education.slice(0, 2).map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-500">{edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </CVTemplateWrapper>
);

// Template 2: Two Column Sidebar
export const Template2 = ({ data, color }) => (
  <CVTemplateWrapper color={color}>
    <div className="flex min-h-full">
      {/* Sidebar */}
      <div className="w-1/3 p-6 text-white" style={{ backgroundColor: color }}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-1">{data.fullName || 'Your Name'}</h1>
          {data.professionalTitle && <p className="text-sm opacity-90">{data.professionalTitle}</p>}
        </div>
        
        <div className="space-y-4 text-sm opacity-90">
          {data.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {data.email}</div>}
          {data.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {data.phone}</div>}
          {data.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {data.location}</div>}
          {data.linkedIn && <div className="flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</div>}
        </div>

        {data.skills?.technical?.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold uppercase text-xs tracking-wider mb-3 opacity-80">Skills</h3>
            <div className="space-y-2 text-sm">
              {data.skills.technical.slice(0, 10).map((skill, i) => (
                <div key={i}>{skill.name || skill}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6">
        {data.summary && (
          <div className="mb-6">
            <h2 className="font-bold uppercase tracking-wider text-sm mb-3" style={{ color }}>Professional Summary</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {data.experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold uppercase tracking-wider text-sm mb-3" style={{ color }}>Experience</h2>
            <div className="space-y-4">
              {data.experience.slice(0, 3).map((exp, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-sm text-gray-600 mb-1">{exp.company} | {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</p>
                  {exp.description && <p className="text-sm text-gray-600">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education?.length > 0 && (
          <div>
            <h2 className="font-bold uppercase tracking-wider text-sm mb-3" style={{ color }}>Education</h2>
            <div className="space-y-3">
              {data.education.slice(0, 2).map((edu, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.institution} | {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </CVTemplateWrapper>
);

// Template 3: Header Focused
export const Template3 = ({ data, color }) => (
  <CVTemplateWrapper color={color}>
    {/* Header Banner */}
    <div className="p-8 text-white" style={{ backgroundColor: color }}>
      <h1 className="text-4xl font-bold mb-1">{data.fullName || 'Your Name'}</h1>
      {data.professionalTitle && <p className="text-xl opacity-90 mb-3">{data.professionalTitle}</p>}
      <div className="flex flex-wrap gap-4 text-sm opacity-80">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>| {data.phone}</span>}
        {data.location && <span>| {data.location}</span>}
      </div>
    </div>

    <div className="p-8">
      {data.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed border-l-4 pl-4" style={{ borderColor: color }}>
            {data.summary}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          {data.experience?.length > 0 && (
            <div className="mb-6">
              <h2 className="font-bold uppercase tracking-wider text-sm mb-4 border-b pb-2" style={{ color, borderColor: `${color}30` }}>Experience</h2>
              <div className="space-y-4">
                {data.experience.slice(0, 2).map((exp, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-xs text-gray-500 mb-1">{exp.company} | {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</p>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {data.skills?.technical?.length > 0 && (
            <div className="mb-6">
              <h2 className="font-bold uppercase tracking-wider text-sm mb-4 border-b pb-2" style={{ color, borderColor: `${color}30` }}>Skills</h2>
              <div className="grid grid-cols-2 gap-2">
                {data.skills.technical.slice(0, 8).map((skill, i) => (
                  <div key={i} className="text-sm text-gray-700">• {skill.name || skill}</div>
                ))}
              </div>
            </div>
          )}

          {data.education?.length > 0 && (
            <div>
              <h2 className="font-bold uppercase tracking-wider text-sm mb-4 border-b pb-2" style={{ color, borderColor: `${color}30` }}>Education</h2>
              <div className="space-y-3">
                {data.education.slice(0, 2).map((edu, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </CVTemplateWrapper>
);

// Template 4: Left Sidebar Profile
export const Template4 = ({ data, color }) => (
  <CVTemplateWrapper color={color}>
    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-2/5 bg-gray-50 p-6">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: color, color: 'white' }}>
          {(data.fullName || 'YN').split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">{data.fullName || 'Your Name'}</h1>
          {data.professionalTitle && <p className="text-sm text-gray-600">{data.professionalTitle}</p>}
        </div>

        <div className="space-y-3 text-sm text-gray-600">
          {data.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4" style={{ color }} /> {data.email}</div>}
          {data.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" style={{ color }} /> {data.phone}</div>}
          {data.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" style={{ color }} /> {data.location}</div>}
        </div>

        {data.skills?.technical?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold uppercase text-xs tracking-wider mb-3 text-gray-700">Skills</h3>
            <div className="space-y-2">
              {data.skills.technical.slice(0, 8).map((skill, i) => (
                <div key={i} className="text-sm">
                  <div className="text-gray-700 mb-1">{skill.name || skill}</div>
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div className="h-1 rounded-full" style={{ width: `${70 + Math.random() * 30}%`, backgroundColor: color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-3/5 p-6">
        {data.summary && (
          <div className="mb-6">
            <h2 className="font-bold uppercase tracking-wider text-sm mb-3" style={{ color }}>About Me</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {data.experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold uppercase tracking-wider text-sm mb-4" style={{ color }}>Work Experience</h2>
            <div className="space-y-4">
              {data.experience.slice(0, 3).map((exp, i) => (
                <div key={i} className="relative pl-4 border-l-2" style={{ borderColor: color }}>
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-xs text-gray-500 mb-1">{exp.company} | {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</p>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education?.length > 0 && (
          <div>
            <h2 className="font-bold uppercase tracking-wider text-sm mb-4" style={{ color }}>Education</h2>
            <div className="space-y-3">
              {data.education.slice(0, 2).map((edu, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.institution} | {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </CVTemplateWrapper>
);

// Template 5: Right Sidebar
export const Template5 = ({ data, color }) => (
  <CVTemplateWrapper color={color}>
    <div className="flex">
      {/* Main Content */}
      <div className="w-3/4 p-6">
        <div className="mb-6 pb-4 border-b" style={{ borderColor: `${color}20` }}>
          <h1 className="text-4xl font-bold mb-2" style={{ color }}>{data.fullName || 'Your Name'}</h1>
          {data.professionalTitle && <p className="text-xl text-gray-600">{data.professionalTitle}</p>}
        </div>

        {data.summary && (
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {data.experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold uppercase tracking-wider text-sm mb-4" style={{ color }}>Professional Experience</h2>
            <div className="space-y-5">
              {data.experience.slice(0, 3).map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="text-sm text-gray-600">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education?.length > 0 && (
          <div>
            <h2 className="font-bold uppercase tracking-wider text-sm mb-4" style={{ color }}>Education</h2>
            <div className="space-y-3">
              {data.education.slice(0, 2).map((edu, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-500">{edu.endDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-1/4 p-6 bg-gray-50">
        <div className="space-y-4 text-sm text-gray-600 mb-6">
          {data.email && <div><span className="block font-semibold text-gray-700">Email</span> {data.email}</div>}
          {data.phone && <div><span className="block font-semibold text-gray-700">Phone</span> {data.phone}</div>}
          {data.location && <div><span className="block font-semibold text-gray-700">Location</span> {data.location}</div>}
        </div>

        {data.skills?.technical?.length > 0 && (
          <div>
            <h3 className="font-bold uppercase text-xs tracking-wider mb-3 text-gray-700">Technical Skills</h3>
            <div className="space-y-2 text-sm">
              {data.skills.technical.slice(0, 10).map((skill, i) => (
                <div key={i} className="text-gray-600">{skill.name || skill}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </CVTemplateWrapper>
);

// Template 6: Minimal Grayscale
export const Template6 = ({ data, color }) => (
  <CVTemplateWrapper color={color}>
    <div className="p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2">{data.fullName || 'Your Name'}</h1>
        {data.professionalTitle && <p className="text-xl text-gray-500 font-light">{data.professionalTitle}</p>}
        <div className="mt-4 text-sm text-gray-500">
          {[data.email, data.phone, data.location].filter(Boolean).join(' • ')}
        </div>
      </div>

      {data.summary && (
        <div className="mb-8">
          <p className="text-gray-600">{data.summary}</p>
        </div>
      )}

      {data.experience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-5 border-b border-gray-200 pb-2">Experience</h2>
          <div className="space-y-6">
            {data.experience.slice(0, 3).map((exp, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
                <div className="text-xs text-gray-500 pt-1">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</div>
                <div className="col-span-3">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
                  {exp.description && <p className="text-sm text-gray-600">{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills?.technical?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-200 pb-2">Skills</h2>
          <p className="text-gray-600">{data.skills.technical.map(s => s.name || s).join(', ')}</p>
        </div>
      )}

      {data.education?.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-200 pb-2">Education</h2>
          <div className="space-y-4">
            {data.education.slice(0, 2).map((edu, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
                <div className="text-xs text-gray-500 pt-1">{edu.endDate}</div>
                <div className="col-span-3">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </CVTemplateWrapper>
);

// Template 7: Creative Modern
export const Template7 = ({ data, color }) => (
  <CVTemplateWrapper color={color}>
    <div className="relative">
      {/* Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}></div>
      
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color }}>{data.fullName || 'Your Name'}</h1>
            {data.professionalTitle && <p className="text-xl text-gray-600">{data.professionalTitle}</p>}
          </div>
          <div className="text-right text-sm text-gray-600 space-y-1">
            {data.email && <div>{data.email}</div>}
            {data.phone && <div>{data.phone}</div>}
            {data.location && <div>{data.location}</div>}
          </div>
        </div>

        {/* Skills Banner */}
        {data.skills?.technical?.length > 0 && (
          <div className="mb-8 p-4 rounded-xl" style={{ backgroundColor: `${color}10` }}>
            <div className="flex flex-wrap gap-2">
              {data.skills.technical.slice(0, 10).map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: color, color: 'white' }}>
                  {skill.name || skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Experience */}
          <div>
            {data.experience?.length > 0 && (
              <div>
                <h2 className="font-bold uppercase tracking-wider text-sm mb-4" style={{ color }}>Experience</h2>
                <div className="space-y-4">
                  {data.experience.slice(0, 2).map((exp, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-xs text-gray-500 mb-2">{exp.company} • {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</p>
                      <p className="text-sm text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Education & More */}
          <div>
            {data.education?.length > 0 && (
              <div className="mb-6">
                <h2 className="font-bold uppercase tracking-wider text-sm mb-4" style={{ color }}>Education</h2>
                <div className="space-y-3">
                  {data.education.slice(0, 2).map((edu, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-xs text-gray-500">{edu.institution} • {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.summary && (
              <div>
                <h2 className="font-bold uppercase tracking-wider text-sm mb-3" style={{ color }}>About</h2>
                <p className="text-sm text-gray-600">{data.summary}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </CVTemplateWrapper>
);

// Template 8: Compact Dense
export const Template8 = ({ data, color }) => (
  <CVTemplateWrapper color={color}>
    <div className="p-6 text-sm">
      {/* Header */}
      <div className="text-center mb-6 pb-3 border-b-2" style={{ borderColor: color }}>
        <h1 className="text-3xl font-bold mb-1" style={{ color }}>{data.fullName || 'Your Name'}</h1>
        {data.professionalTitle && <p className="text-gray-600 mb-2">{data.professionalTitle}</p>}
        <div className="flex justify-center gap-3 text-gray-500">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>| {data.phone}</span>}
          {data.location && <span>| {data.location}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-5">
          <p className="text-gray-700 text-center">{data.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-12 gap-5">
        {/* Main Content */}
        <div className="col-span-8">
          {data.experience?.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold uppercase tracking-wider text-xs mb-3" style={{ color }}>Professional Experience</h2>
              <div className="space-y-3">
                {data.experience.slice(0, 4).map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                    </div>
                    {exp.description && <p className="text-gray-600">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-4">
          {data.skills?.technical?.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold uppercase tracking-wider text-xs mb-3" style={{ color }}>Skills</h2>
              <div className="space-y-1">
                {data.skills.technical.slice(0, 12).map((skill, i) => (
                  <div key={i} className="text-gray-600">• {skill.name || skill}</div>
                ))}
              </div>
            </div>
          )}

          {data.education?.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold uppercase tracking-wider text-xs mb-3" style={{ color }}>Education</h2>
              <div className="space-y-2">
                {data.education.slice(0, 2).map((edu, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.certifications?.length > 0 && (
            <div>
              <h2 className="font-bold uppercase tracking-wider text-xs mb-3" style={{ color }}>Certifications</h2>
              <div className="space-y-1">
                {data.certifications.slice(0, 3).map((cert, i) => (
                  <div key={i} className="text-gray-600">{cert.name}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </CVTemplateWrapper>
);

// Template 9: Elegant Corporate
export const Template9 = ({ data, color }) => (
  <CVTemplateWrapper color={color}>
    <div className="p-8">
      {/* Header */}
      <div className="border-t-4 border-b-4 py-6 mb-8 text-center" style={{ borderColor: color }}>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">{data.fullName || 'Your Name'}</h1>
        {data.professionalTitle && <p className="text-lg text-gray-700">{data.professionalTitle}</p>}
        <div className="mt-3 flex justify-center gap-6 text-sm text-gray-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>• {data.phone}</span>}
          {data.location && <span>• {data.location}</span>}
        </div>
      </div>

      {data.summary && (
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 italic">{data.summary}</p>
        </div>
      )}

      {data.experience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-center mb-6 pb-2 border-b" style={{ color, borderColor: `${color}30` }}>Professional Experience</h2>
          <div className="space-y-5">
            {data.experience.slice(0, 3).map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-end mb-1">
                  <h3 className="font-semibold text-lg text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-500">{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company}</p>
                {exp.description && <p className="text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {data.education?.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b" style={{ color, borderColor: `${color}30` }}>Education</h2>
            <div className="space-y-3">
              {data.education.slice(0, 2).map((edu, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills?.technical?.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b" style={{ color, borderColor: `${color}30` }}>Core Competencies</h2>
            <div className="grid grid-cols-2 gap-2">
              {data.skills.technical.slice(0, 8).map((skill, i) => (
                <div key={i} className="text-gray-700">• {skill.name || skill}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </CVTemplateWrapper>
);

// Template 10: Modern Tech Style
export const Template10 = ({ data, color }) => (
  <CVTemplateWrapper color={color}>
    <div className="relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10" style={{ 
        background: `radial-gradient(circle at top right, ${color}, transparent 70%)` 
      }}></div>
      
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color }}>{data.fullName || 'Your Name'}</h1>
            {data.professionalTitle && <p className="text-xl text-gray-600 font-light">{data.professionalTitle}</p>}
          </div>
          <div className="text-right text-sm text-gray-600 space-y-1">
            {data.email && <div className="flex items-center justify-end gap-2"><Mail className="w-3 h-3" /> {data.email}</div>}
            {data.phone && <div className="flex items-center justify-end gap-2"><Phone className="w-3 h-3" /> {data.phone}</div>}
            {data.location && <div className="flex items-center justify-end gap-2"><MapPin className="w-3 h-3" /> {data.location}</div>}
          </div>
        </div>

        {/* Summary Card */}
        {data.summary && (
          <div className="mb-8 p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-700">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold uppercase tracking-wider text-sm mb-5 flex items-center gap-2" style={{ color }}>
              <Briefcase className="w-4 h-4" /> Experience
            </h2>
            <div className="space-y-6">
              {data.experience.slice(0, 3).map((exp, i) => (
                <div key={i} className="relative pl-6 border-l-2" style={{ borderColor: `${color}40` }}>
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full border-2" style={{ borderColor: color, backgroundColor: 'white' }}></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded font-medium" style={{ backgroundColor: `${color}15`, color }}>
                      {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-sm text-gray-600">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6">
          {data.skills?.technical?.length > 0 && (
            <div>
              <h2 className="font-bold uppercase tracking-wider text-sm mb-3 flex items-center gap-2" style={{ color }}>
                <Code className="w-4 h-4" /> Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.technical.slice(0, 9).map((skill, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${color}10`, color }}>
                    {skill.name || skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.education?.length > 0 && (
            <div>
              <h2 className="font-bold uppercase tracking-wider text-sm mb-3 flex items-center gap-2" style={{ color }}>
                <GraduationCap className="w-4 h-4" /> Education
              </h2>
              <div className="space-y-2">
                {data.education.slice(0, 2).map((edu, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-sm text-gray-900">{edu.degree}</h3>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.certifications?.length > 0 && (
            <div>
              <h2 className="font-bold uppercase tracking-wider text-sm mb-3 flex items-center gap-2" style={{ color }}>
                <Award className="w-4 h-4" /> Certifications
              </h2>
              <div className="space-y-1">
                {data.certifications.slice(0, 3).map((cert, i) => (
                  <div key={i} className="text-sm text-gray-600">{cert.name}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </CVTemplateWrapper>
);

// Color Presets
export const colorPresets = [
  { name: 'Gray', value: '#374151' },
  { name: 'Blue', value: '#1783e0' },
  { name: 'Light Blue', value: '#0ea5e9' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Green', value: '#10b981' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Beige', value: '#a16207' },
];

// Export all templates
export const CVTemplates = [
  { id: 1, name: 'Minimal Single Column', component: Template1, icon: '📄' },
  { id: 2, name: 'Two Column Sidebar', component: Template2, icon: '📊' },
  { id: 3, name: 'Header Focused', component: Template3, icon: '🎯' },
  { id: 4, name: 'Profile Sidebar', component: Template4, icon: '👤' },
  { id: 5, name: 'Right Sidebar', component: Template5, icon: '📝' },
  { id: 6, name: 'Minimal Grayscale', component: Template6, icon: '⚪' },
  { id: 7, name: 'Creative Modern', component: Template7, icon: '✨' },
  { id: 8, name: 'Compact Dense', component: Template8, icon: '📦' },
  { id: 9, name: 'Elegant Corporate', component: Template9, icon: '💼' },
  { id: 10, name: 'Modern Tech', component: Template10, icon: '🚀' },
];

export default CVTemplates;