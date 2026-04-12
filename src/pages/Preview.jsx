import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Download, Edit3, ArrowLeft, Printer, Share2, FileText,
  CheckCircle, Mail, Phone, MapPin, Linkedin, Globe,
  GraduationCap, Briefcase, Code, Award, FolderGit2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import useCVStore from '../store/cvStore';

const Preview = () => {
  const navigate = useNavigate();
  const cvRef = useRef();
  const { 
    selectedTemplate, 
    personalInfo, 
    education, 
    experience, 
    skills, 
    certifications, 
    projects 
  } = useCVStore();

  const templateColors = {
    classic: '#000000',
    modern: '#000000',
    minimal: '#000000',
    creative: '#000000',
    executive: '#000000',
    technical: '#000000',
    academic: '#000000',
    hybrid: '#000000',
    professional: '#000000',
    timeless: '#000000',
  };

  const color = '#000000';

  const sectionOrders = {
    classic: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
    modern: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications'],
    minimal: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
    creative: ['summary', 'skills', 'experience', 'education', 'projects', 'certifications'],
    executive: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
    technical: ['summary', 'skills', 'experience', 'education', 'projects', 'certifications'],
    academic: ['summary', 'education', 'experience', 'skills', 'projects', 'certifications'],
    hybrid: ['summary', 'skills', 'experience', 'education', 'certifications', 'projects'],
    professional: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
    timeless: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
  };

  const sectionOrder = sectionOrders[selectedTemplate?.id] || sectionOrders.classic;

  const handleDownloadPDF = async () => {
    const element = cvRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${personalInfo.fullName || 'CV'}-Resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Unable to generate PDF. Please try using the DOC export instead.');
    }
  };

  const handleDownloadDOCX = () => {
    const escapeHtml = (text) => {
      if (!text) return '';
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const renderAchievements = (achievements) => {
      if (!achievements || achievements.length === 0) return '';
      return `<ul style="margin-top: 5px;">${achievements.filter(a => a).map(a => `<li>${escapeHtml(a)}</li>`).join('')}</ul>`;
    };

    const cvContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Word.Document"?>
<html xmlns:o='urn:schemas-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${escapeHtml(personalInfo.fullName) || 'CV'} - Resume</title>
<style>
body { font-family: 'Calibri', Arial, sans-serif; font-size: 11pt; }
h1 { color: ${color}; font-size: 24pt; margin-bottom: 5px; }
h2 { color: ${color}; font-size: 14pt; margin-top: 18pt; margin-bottom: 8pt; border-bottom: 1pt solid ${color}; }
h3 { font-size: 12pt; margin-bottom: 3px; }
p { margin-bottom: 8pt; }
table { border-collapse: collapse; width: 100%; }
td { padding: 5px; vertical-align: top; }
</style>
</head>
<body style="padding: 40px; max-width: 800px; margin: 0 auto;">

<table style="width: 100%; border-bottom: 2pt solid ${color}; margin-bottom: 15pt;">
<tr>
<td>
<h1>${escapeHtml(personalInfo.fullName) || 'Your Name'}</h1>
${personalInfo.professionalTitle ? `<p style="font-size: 14pt; color: ${color};"><strong>${escapeHtml(personalInfo.professionalTitle)}</strong></p>` : ''}
</td>
</tr>
</table>

${personalInfo.summary ? `
<p style="margin-top: 10pt;">${escapeHtml(personalInfo.summary)}</p>
` : ''}

<table style="width: 100%; margin-bottom: 10pt;">
${personalInfo.email ? `<tr><td style="width: 100pt;"><strong>Email:</strong></td><td>${escapeHtml(personalInfo.email)}</td></tr>` : ''}
${personalInfo.phone ? `<tr><td style="width: 100pt;"><strong>Phone:</strong></td><td>${escapeHtml(personalInfo.phone)}</td></tr>` : ''}
${personalInfo.address ? `<tr><td style="width: 100pt;"><strong>Location:</strong></td><td>${escapeHtml(personalInfo.address)}</td></tr>` : ''}
${personalInfo.linkedIn ? `<tr><td style="width: 100pt;"><strong>LinkedIn:</strong></td><td>${escapeHtml(personalInfo.linkedIn)}</td></tr>` : ''}
${personalInfo.portfolio ? `<tr><td style="width: 100pt;"><strong>Website:</strong></td><td>${escapeHtml(personalInfo.portfolio)}</td></tr>` : ''}
</table>

${experience.length > 0 ? `
<h2>Work Experience</h2>
${experience.map(exp => `
<div style="margin-bottom: 15pt;">
<h3>${escapeHtml(exp.position) || 'Position'}</h3>
<p><strong>${escapeHtml(exp.company) || 'Company'}</strong> | ${escapeHtml(exp.startDate) || ''} - ${exp.currentlyWorking ? 'Present' : escapeHtml(exp.endDate) || ''}</p>
${exp.description ? `<p>${escapeHtml(exp.description)}</p>` : ''}
${renderAchievements(exp.achievements)}
</div>
`).join('')}
` : ''}

${education.length > 0 ? `
<h2>Education</h2>
${education.map(edu => `
<div style="margin-bottom: 10pt;">
<h3>${escapeHtml(edu.degree) || ''} ${edu.fieldOfStudy ? 'in ' + escapeHtml(edu.fieldOfStudy) : ''}</h3>
<p><strong>${escapeHtml(edu.institution) || 'Institution'}</strong> | ${escapeHtml(edu.startDate) || ''} ${edu.currentlyStudying ? '- Present' : edu.endDate ? '- ' + escapeHtml(edu.endDate) : ''}</p>
${edu.gpa ? `<p>GPA: ${escapeHtml(edu.gpa)}</p>` : ''}
</div>
`).join('')}
` : ''}

${(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) ? `
<h2>Skills</h2>
${skills.technical.length > 0 ? `<p><strong>Technical:</strong> ${skills.technical.map(s => escapeHtml(s.name || s)).join(', ')}</p>` : ''}
${skills.soft.length > 0 ? `<p><strong>Soft Skills:</strong> ${skills.soft.map(s => escapeHtml(s.name || s)).join(', ')}</p>` : ''}
${skills.languages.length > 0 ? `<p><strong>Languages:</strong> ${skills.languages.map(l => escapeHtml(l.name || l)).join(', ')}</p>` : ''}
` : ''}

${projects.length > 0 ? `
<h2>Projects</h2>
${projects.map(p => `
<div style="margin-bottom: 10pt;">
<h3>${escapeHtml(p.name) || 'Project'}</h3>
${p.description ? `<p>${escapeHtml(p.description)}</p>` : ''}
${p.technologies?.length > 0 ? `<p><em>Technologies: ${p.technologies.join(', ')}</em></p>` : ''}
</div>
`).join('')}
` : ''}

${certifications.length > 0 ? `
<h2>Certifications</h2>
${certifications.map(c => `
<div style="margin-bottom: 8pt;">
<p><strong>${escapeHtml(c.name)}</strong>${c.issuer ? ` - ${escapeHtml(c.issuer)}` : ''}${c.date ? ` (${escapeHtml(c.date)})` : ''}</p>
</div>
`).join('')}
` : ''}

</body>
</html>`;

    const blob = new Blob([cvContent], { type: 'application/vnd.ms-word;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personalInfo.fullName || 'CV'}-Resume.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderContactInfo = () => (
    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
      {personalInfo.email && (
        <div className="flex items-center gap-1">
          <Mail className="w-4 h-4" style={{ color }} />
          <span>{personalInfo.email}</span>
        </div>
      )}
      {personalInfo.phone && (
        <div className="flex items-center gap-1">
          <Phone className="w-4 h-4" style={{ color }} />
          <span>{personalInfo.phone}</span>
        </div>
      )}
      {personalInfo.address && (
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" style={{ color }} />
          <span>{personalInfo.address}</span>
        </div>
      )}
      {personalInfo.linkedIn && (
        <div className="flex items-center gap-1">
          <Linkedin className="w-4 h-4" style={{ color }} />
          <span>{personalInfo.linkedIn.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '')}</span>
        </div>
      )}
      {personalInfo.portfolio && (
        <div className="flex items-center gap-1">
          <Globe className="w-4 h-4" style={{ color }} />
          <span>{personalInfo.portfolio.replace(/https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
        </div>
      )}
    </div>
  );

  const renderSummary = () => {
    if (!personalInfo.summary) return null;
    return (
      <div className="mb-6">
        <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
      </div>
    );
  };

  const renderSkills = (templateId) => {
    const hasSkills = skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0;
    if (!hasSkills) return null;

    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-black">Skills</h2>
        {skills.technical.length > 0 && (
          <div className="mb-3">
            <h3 className="font-semibold text-gray-700 mb-2">Technical Skills</h3>
            <div className="text-gray-700 text-sm">
              {skills.technical.map((s, i) => <span key={i}>{(s.name || s)}{i < skills.technical.length - 1 ? ', ' : ''}</span>)}
            </div>
          </div>
        )}
        {skills.soft.length > 0 && (
          <div className="mb-3">
            <h3 className="font-semibold text-gray-700 mb-2">Soft Skills</h3>
            <div className="text-gray-700 text-sm">
              {skills.soft.map((s, i) => <span key={i}>{(s.name || s)}{i < skills.soft.length - 1 ? ', ' : ''}</span>)}
            </div>
          </div>
        )}
        {skills.languages.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Languages</h3>
            <div className="text-gray-700 text-sm">
              {skills.languages.map((l, i) => <span key={i}>{(l.name || l)}{i < skills.languages.length - 1 ? ', ' : ''}</span>)}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderExperience = () => {
    if (experience.length === 0) return null;
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-black">
          Work Experience
        </h2>
        <div className="space-y-4">
          {experience.map((e, i) => (
            <div key={i} className="relative">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{e.position}</h3>
                  <div className="text-gray-600">{e.company}{e.location && `, ${e.location}`}</div>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {e.startDate}{e.currentlyWorking ? ' - Present' : e.endDate && ` - ${e.endDate}`}
                </div>
              </div>
              {e.description && <p className="text-gray-600 mb-2">{e.description}</p>}
              {e.achievements?.filter(a => a).length > 0 && (
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  {e.achievements.filter(a => a).map((a, ai) => (
                    <li key={ai} className="text-sm">{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEducation = () => {
    if (education.length === 0) return null;
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-black">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((e, i) => (
            <div key={i}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold">{e.degree}{e.fieldOfStudy ? ` in ${e.fieldOfStudy}` : ''}</h3>
                  <div className="text-gray-600">{e.institution}</div>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {e.startDate}{e.currentlyStudying ? ' - Present' : e.endDate && ` - ${e.endDate}`}
                </div>
              </div>
              {e.gpa && <div className="text-sm text-gray-500">GPA: {e.gpa}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjects = () => {
    if (projects.length === 0) return null;
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-black">
          Projects
        </h2>
        <div className="space-y-4">
          {projects.map((p, i) => (
            <div key={i}>
              <h3 className="font-semibold">{p.name}</h3>
              {p.description && <p className="text-gray-600 text-sm mt-1">{p.description}</p>}
              {p.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.technologies.map((t, ti) => (
                    <span key={ti} className="text-xs px-2 py-0.5 rounded bg-gray-100">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCertifications = () => {
    if (certifications.length === 0) return null;
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-black">
          Certifications
        </h2>
        <div className="space-y-3">
          {certifications.map((c, i) => (
            <div key={i} className="flex justify-between items-start">
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-gray-500">
                {c.issuer}{c.date && ` | ${c.date}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Template-specific renderers
  const renderClassicTemplate = () => (
    <>
      <div className="text-center border-b border-black pb-8 mb-8">
        <h1 className="text-4xl font-serif font-bold text-black mb-2 uppercase tracking-wider">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-lg font-medium text-gray-700 mb-4">{personalInfo.professionalTitle}</p>}
        <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-4">
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.phone && <span>|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>|</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.linkedIn && <span>|</span>}
          {personalInfo.linkedIn && <span>LinkedIn</span>}
        </div>
      </div>
      {personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-700 italic text-center max-w-3xl mx-auto">{personalInfo.summary}</p>
        </div>
      )}
      {renderExperience()}
      {renderEducation()}
      {renderSkills('classic')}
      {renderCertifications()}
      {renderProjects()}
    </>
  );

  const renderModernTemplate = () => (
    <>
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
          <h1 className="text-5xl font-bold text-black mb-2">{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.professionalTitle && <p className="text-xl font-light text-gray-600">{personalInfo.professionalTitle}</p>}
        </div>
        <div className="text-right text-sm text-gray-600 border-l border-gray-200 pl-6">
          {personalInfo.email && <div className="mb-1">{personalInfo.email}</div>}
          {personalInfo.phone && <div className="mb-1">{personalInfo.phone}</div>}
          {personalInfo.address && <div className="mb-1">{personalInfo.address}</div>}
          {personalInfo.linkedIn && <div className="mb-1">{personalInfo.linkedIn.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</div>}
        </div>
      </div>
      {personalInfo.summary && (
        <div className="mb-8 bg-gray-50 p-6 border-l-4 border-black">
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}
      {renderExperience()}
      {renderSkills('modern')}
      {renderEducation()}
      {renderProjects()}
      {renderCertifications()}
    </>
  );

  const renderMinimalTemplate = () => (
    <>
      <div className="mb-10">
        <h1 className="text-6xl font-extrabold text-black mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-xl text-gray-500 font-light">{personalInfo.professionalTitle}</p>}
        <div className="mt-4 text-sm text-gray-500">
          {personalInfo.email}{personalInfo.phone && ` | ${personalInfo.phone}`}
        </div>
      </div>
      {personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-600">{personalInfo.summary}</p>
        </div>
      )}
      <div className="space-y-10">
        {renderExperience()}
        {renderEducation()}
        {skills.technical.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-black mb-4">Skills</h2>
            <p className="text-gray-700">{skills.technical.map(s => s.name || s).join(', ')}</p>
          </div>
        )}
        {renderProjects()}
      </div>
    </>
  );

  const renderCreativeTemplate = () => (
    <>
      <div className="mb-10 border-b-4 border-black pb-6">
        <h1 className="text-6xl font-black text-black">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-2xl font-light text-gray-800 mt-2">{personalInfo.professionalTitle}</p>}
      </div>
      <div className="flex gap-10">
        <div className="w-1/4 bg-gray-50 p-6">
          <div className="text-sm text-gray-700 space-y-3">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.address && <div>{personalInfo.address}</div>}
          </div>
          {skills.technical.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold uppercase text-sm mb-3">Skills</h3>
              <div className="space-y-2">
                {skills.technical.map((s, i) => (
                  <div key={i} className="text-sm">
                    <div className="h-1 bg-gray-200 rounded">
                      <div className="h-1 bg-black rounded" style={{ width: `${60 + Math.random() * 40}%` }}></div>
                    </div>
                    <div className="text-xs mt-1">{s.name || s}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-3/4">
          {personalInfo.summary && (
            <div className="mb-8 text-xl font-light text-gray-700">{personalInfo.summary}</div>
          )}
          {renderExperience()}
          {renderEducation()}
        </div>
      </div>
    </>
  );

  const renderExecutiveTemplate = () => (
    <>
      <div className="text-center border-t-4 border-b-4 border-black py-8 mb-8">
        <h1 className="text-4xl font-serif font-bold text-black mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-xl text-gray-700 font-medium">{personalInfo.professionalTitle}</p>}
        <div className="mt-4 text-sm text-gray-600 flex justify-center gap-6">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
        </div>
      </div>
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-3 border-b border-gray-300 pb-1">Executive Summary</h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}
      {renderExperience()}
      {renderEducation()}
      {renderSkills('executive')}
      {renderCertifications()}
    </>
  );

  const renderTechnicalTemplate = () => (
    <>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-mono font-bold text-black">{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.professionalTitle && <p className="text-xl font-mono text-gray-600">{personalInfo.professionalTitle}</p>}
        </div>
        <div className="text-right text-sm font-mono text-gray-600">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.portfolio && <div>{personalInfo.portfolio.replace(/https?:\/\/(www\.)?/, '')}</div>}
        </div>
      </div>
      {skills.technical.length > 0 && (
        <div className="mb-8">
          <h2 className="font-mono text-sm uppercase tracking-wider text-black mb-4">Technical Skills</h2>
          <div className="grid grid-cols-3 gap-3">
            {skills.technical.map((s, i) => (
              <div key={i} className="bg-gray-100 p-2 text-center text-sm font-mono">{s.name || s}</div>
            ))}
          </div>
        </div>
      )}
      {personalInfo.summary && (
        <div className="mb-8 font-mono text-gray-600 border-l-2 border-black pl-4">
          {personalInfo.summary}
        </div>
      )}
      {renderExperience()}
      {renderProjects()}
      {renderEducation()}
    </>
  );

  const renderAcademicTemplate = () => (
    <>
      <div className="text-center mb-10 border-b-2 border-black pb-6">
        <h1 className="text-4xl font-serif font-bold text-black mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-lg text-gray-700 font-medium">{personalInfo.professionalTitle}</p>}
        <div className="mt-3 text-sm text-gray-600">
          {personalInfo.email} | {personalInfo.phone}
        </div>
      </div>
      {renderEducation()}
      {renderExperience()}
      {skills.technical.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-serif font-bold uppercase tracking-wider text-black mb-4 border-b border-gray-200 pb-2">Technical Skills</h2>
          <div className="text-gray-700">{skills.technical.map(s => s.name || s).join(' • ')}</div>
        </div>
      )}
      {renderProjects()}
      {renderCertifications()}
    </>
  );

  const renderHybridTemplate = () => (
    <>
      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-8">
          <h1 className="text-5xl font-bold text-black">{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.professionalTitle && <p className="text-xl text-gray-600 mt-1">{personalInfo.professionalTitle}</p>}
        </div>
        <div className="col-span-4 bg-black text-white p-4 text-sm">
          {personalInfo.email && <div className="mb-1">{personalInfo.email}</div>}
          {personalInfo.phone && <div className="mb-1">{personalInfo.phone}</div>}
          {personalInfo.address && <div>{personalInfo.address}</div>}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          {renderSkills('hybrid')}
          {renderCertifications()}
        </div>
        <div className="col-span-8">
          {personalInfo.summary && (
            <div className="mb-8 text-gray-700">{personalInfo.summary}</div>
          )}
          {renderExperience()}
          {renderEducation()}
          {renderProjects()}
        </div>
      </div>
    </>
  );

  const renderProfessionalTemplate = () => (
    <>
      <div className="border border-gray-300 p-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-2">{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.professionalTitle && <p className="text-lg text-gray-700">{personalInfo.professionalTitle}</p>}
          <div className="mt-4 flex justify-center gap-4 text-sm text-gray-600">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>|</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.linkedIn && <span>|</span>}
            {personalInfo.linkedIn && <span>LinkedIn</span>}
          </div>
        </div>
      </div>
      {personalInfo.summary && (
        <div className="mb-8 p-6 bg-gray-50">
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}
      {renderExperience()}
      {renderEducation()}
      {renderSkills('professional')}
      {renderProjects()}
    </>
  );

  const renderTimelessTemplate = () => (
    <>
      <div className="text-center border-b-4 border-gray-800 pb-8 mb-8">
        <h1 className="text-5xl font-serif font-bold text-black mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-xl text-gray-700">{personalInfo.professionalTitle}</p>}
        <div className="mt-4 text-sm text-gray-600">
          {personalInfo.address} • {personalInfo.email} • {personalInfo.phone}
        </div>
      </div>
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-3 border-b border-gray-400 pb-1">Career Objective</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}
      {renderExperience()}
      {renderEducation()}
      {renderSkills('timeless')}
      {renderCertifications()}
      {renderProjects()}
    </>
  );

  const renderTemplate = () => {
    switch (selectedTemplate?.id) {
      case 'classic': return renderClassicTemplate();
      case 'modern': return renderModernTemplate();
      case 'minimal': return renderMinimalTemplate();
      case 'creative': return renderCreativeTemplate();
      case 'executive': return renderExecutiveTemplate();
      case 'technical': return renderTechnicalTemplate();
      case 'academic': return renderAcademicTemplate();
      case 'hybrid': return renderHybridTemplate();
      case 'professional': return renderProfessionalTemplate();
      case 'timeless': return renderTimelessTemplate();
      default: return renderClassicTemplate();
    }
  };

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Template Selected</h2>
          <p className="text-gray-500 mb-4">Please select a template to preview your CV</p>
          <button
            onClick={() => navigate('/templates')}
            className="px-6 py-3 bg-[#1783e0] text-white rounded-lg hover:bg-[#1567c4] transition-colors"
          >
            Choose Template
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/create-cv')}
                className="flex items-center gap-2 text-gray-600 hover:text-[#1783e0] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Editor
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-lg font-semibold text-gray-900">CV Preview</h1>
              <span className="text-sm text-gray-500">({selectedTemplate.name})</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleDownloadDOCX}
                className="flex items-center gap-2 px-4 py-2 border border-[#1783e0] text-[#1783e0] rounded-lg hover:bg-[#1783e0] hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                DOC
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-[#1783e0] text-white rounded-lg hover:bg-[#1567c4] transition-colors shadow-md"
              >
                <Download className="w-4 h-4" />
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CV Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          {/* A4 Paper Size: 210mm x 297mm */}
          <div 
            ref={cvRef}
            className="bg-white shadow-2xl"
            style={{ 
              width: '210mm', 
              minHeight: '297mm',
              padding: '20mm',
              boxSizing: 'border-box',
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Preview;