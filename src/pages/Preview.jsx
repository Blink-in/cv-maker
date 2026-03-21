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
    modern: '#1783e0',
    classic: '#374151',
    executive: '#1f2937',
    creative: '#8b5cf6',
    minimal: '#10b981',
    professional: '#2563eb',
    elegant: '#7c3aed',
    timeless: '#4b5563',
    bold: '#dc2626',
    simple: '#6b7280',
    premium: '#92400e',
    functional: '#7c3aed',
  };

  const color = templateColors[selectedTemplate?.id] || '#1783e0';

  // Section order definitions for each template
  const sectionOrders = {
    modern: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
    classic: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
    executive: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
    creative: ['summary', 'skills', 'projects', 'experience', 'education', 'certifications'],
    minimal: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
    professional: ['summary', 'skills', 'experience', 'education', 'certifications', 'projects'],
    elegant: ['summary', 'experience', 'skills', 'education', 'projects', 'certifications'],
    timeless: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
    bold: ['summary', 'experience', 'projects', 'skills', 'education', 'certifications'],
    simple: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
    premium: ['summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
    functional: ['skills', 'summary', 'experience', 'education', 'certifications', 'projects'],
  };

  const sectionOrder = sectionOrders[selectedTemplate?.id] || sectionOrders.modern;

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
<p><strong>${escapeHtml(edu.institution) || 'Institution'}</strong> | ${escapeHtml(edu.startDate) || ''} - ${edu.currentlyStudying ? 'Present' : escapeHtml(edu.endDate) || ''}</p>
${edu.gpa ? `<p>GPA: ${escapeHtml(edu.gpa)}</p>` : ''}
</div>
`).join('')}
` : ''}

${skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0 ? `
<h2>Skills</h2>
${skills.technical.length > 0 ? `<p><strong>Technical:</strong> ${skills.technical.map(s => escapeHtml(s.name)).join(', ')}</p>` : ''}
${skills.soft.length > 0 ? `<p><strong>Soft Skills:</strong> ${skills.soft.map(s => escapeHtml(s.name)).join(', ')}</p>` : ''}
${skills.languages.length > 0 ? `<p><strong>Languages:</strong> ${skills.languages.map(l => escapeHtml(l.name)).join(', ')}</p>` : ''}
` : ''}

${projects.length > 0 ? `
<h2>Projects</h2>
${projects.map(p => `
<div style="margin-bottom: 10pt;">
<h3>${escapeHtml(p.name)}</h3>
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

  // Section renderers
  const renderSummary = () => {
    if (!personalInfo.summary) return null;
    return (
      <div className="mb-6">
        <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
      </div>
    );
  };

  const renderSkills = (templateId) => {
    if (skills.technical.length === 0 && skills.soft.length === 0 && skills.languages.length === 0) return null;
    
    if (templateId === 'functional') {
      return (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 pb-2" style={{ color, borderBottom: `2px solid ${color}` }}>Core Competencies</h2>
          <div className="flex flex-wrap gap-2">
            {skills.technical.map((s, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: `${color}15`, color }}>
                {s.name}
              </span>
            ))}
            {skills.soft.map((s, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: `${color}10`, color: '#666' }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 pb-2" style={{ color, borderBottom: `2px solid ${color}` }}>Skills</h2>
        {skills.technical.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((s, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: `${color}15`, color }}>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {skills.soft.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((s, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {skills.languages.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((l, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  {l.name}
                </span>
              ))}
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
        <h2 className="text-xl font-bold mb-4 pb-2" style={{ color, borderBottom: `2px solid ${color}` }}>Work Experience</h2>
        <div className="space-y-4">
          {experience.map((e, i) => (
            <div key={i} className="relative">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{e.position}</h3>
                  <div className="text-gray-600">{e.company}</div>
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
        <h2 className="text-xl font-bold mb-4 pb-2" style={{ color, borderBottom: `2px solid ${color}` }}>Education</h2>
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
        <h2 className="text-xl font-bold mb-4 pb-2" style={{ color, borderBottom: `2px solid ${color}` }}>Projects</h2>
        <div className="space-y-4">
          {projects.map((p, i) => (
            <div key={i}>
              <h3 className="font-semibold">{p.name}</h3>
              {p.description && <p className="text-gray-600 text-sm mt-1">{p.description}</p>}
              {p.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.technologies.map((t, ti) => (
                    <span key={ti} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${color}15`, color }}>
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
        <h2 className="text-xl font-bold mb-4 pb-2" style={{ color, borderBottom: `2px solid ${color}` }}>Certifications</h2>
        <div className="space-y-3">
          {certifications.map((c, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-gray-500">
                {c.issuer} {c.date && `| ${c.date}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
          <span>{personalInfo.linkedIn.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
        </div>
      )}
      {personalInfo.portfolio && (
        <div className="flex items-center gap-1">
          <Globe className="w-4 h-4" style={{ color }} />
          <span>{personalInfo.portfolio.replace(/https?:\/\/(www\.)?/, '')}</span>
        </div>
      )}
    </div>
  );

  // Template-specific renderers
  const renderModernTemplate = () => (
    <>
      <div className="border-b-4 pb-6 mb-6" style={{ borderColor: color }}>
        <h1 className="text-4xl font-bold mb-1" style={{ color }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-lg font-medium mb-3" style={{ color }}>{personalInfo.professionalTitle}</p>}
        {personalInfo.summary && <p className="text-gray-600 mb-4 text-sm leading-relaxed">{personalInfo.summary}</p>}
        {renderContactInfo()}
      </div>
      <div className="flex gap-8">
        <div className="w-1/3">
          {skills.technical.length > 0 && <div className="mb-6"><h2 className="text-lg font-bold mb-3 pb-2 border-b" style={{ color, borderColor: color }}>Skills</h2><div className="space-y-2">{skills.technical.map((s, i) => <div key={i} className="flex items-center gap-2"><CheckCircle className="w-3 h-3" style={{ color }} /><span className="text-sm">{s.name}</span></div>)}</div></div>}
          {skills.soft.length > 0 && <div className="mb-6"><h2 className="text-lg font-bold mb-3 pb-2 border-b" style={{ color, borderColor: color }}>Soft Skills</h2><div className="flex flex-wrap gap-1">{skills.soft.map((s, i) => <span key={i} className="text-xs px-2 py-1 rounded mr-1 mb-1" style={{ backgroundColor: `${color}20`, color }}>{s.name}</span>)}</div></div>}
          {skills.languages.length > 0 && <div className="mb-6"><h2 className="text-lg font-bold mb-3 pb-2 border-b" style={{ color, borderColor: color }}>Languages</h2><div className="space-y-1">{skills.languages.map((l, i) => <div key={i} className="text-sm"><span className="font-medium">{l.name}</span></div>)}</div></div>}
          {certifications.length > 0 && <div className="mb-6"><h2 className="text-lg font-bold mb-3 pb-2 border-b" style={{ color, borderColor: color }}>Certifications</h2><div className="space-y-3">{certifications.map((c, i) => <div key={i}><div className="font-medium text-sm">{c.name}</div><div className="text-xs text-gray-500">{c.issuer}</div></div>)}</div></div>}
        </div>
        <div className="w-2/3">
          {experience.length > 0 && <div className="mb-6"><h2 className="text-lg font-bold mb-4 pb-2 border-b" style={{ color, borderColor: color }}>Experience</h2><div className="space-y-4">{experience.map((e, i) => <div key={i}><div className="flex justify-between items-start mb-1"><div><h3 className="font-semibold">{e.position}</h3><div className="text-sm text-gray-600">{e.company}</div></div><div className="text-xs text-gray-500 text-right">{e.startDate}{e.currentlyWorking ? ' - Present' : e.endDate && ` - ${e.endDate}`}</div></div>{e.description && <p className="text-sm text-gray-600 mb-1">{e.description}</p>}{e.achievements?.length > 0 && <ul className="text-sm text-gray-600 list-disc list-inside">{e.achievements.filter(a => a).map((a, ai) => <li key={ai}>{a}</li>)}</ul>}</div>)}</div></div>}
          {education.length > 0 && <div className="mb-6"><h2 className="text-lg font-bold mb-4 pb-2 border-b" style={{ color, borderColor: color }}>Education</h2><div className="space-y-4">{education.map((e, i) => <div key={i}><div className="flex justify-between items-start mb-1"><div><h3 className="font-semibold">{e.degree}{e.fieldOfStudy ? ' in ' + e.fieldOfStudy : ''}</h3><div className="text-sm text-gray-600">{e.institution}</div></div><div className="text-xs text-gray-500 text-right">{e.startDate}{e.currentlyStudying ? ' - Present' : e.endDate && ` - ${e.endDate}`}</div></div>{e.gpa && <div className="text-sm text-gray-500">GPA: {e.gpa}</div>}</div>)}</div></div>}
          {projects.length > 0 && <div className="mb-6"><h2 className="text-lg font-bold mb-4 pb-2 border-b" style={{ color, borderColor: color }}>Projects</h2><div className="space-y-4">{projects.map((p, i) => <div key={i}><h3 className="font-semibold">{p.name}</h3>{p.description && <p className="text-sm text-gray-600 mt-1">{p.description}</p>}{p.technologies?.length > 0 && <div className="flex flex-wrap gap-1 mt-2">{p.technologies.map((t, ti) => <span key={ti} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${color}15`, color }}>{t}</span>)}</div>}</div>)}</div></div>}
        </div>
      </div>
    </>
  );

  const renderClassicTemplate = () => (
    <>
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-6">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-lg font-medium text-gray-700 mb-2">{personalInfo.professionalTitle}</p>}
        <div className="text-gray-600 mb-4">{personalInfo.email}{personalInfo.phone && ` | ${personalInfo.phone}`}{personalInfo.address && ` | ${personalInfo.address}`}</div>
        {personalInfo.summary && <p className="text-gray-700 text-sm italic">{personalInfo.summary}</p>}
      </div>
      {renderExperience()}
      {renderEducation()}
      {renderSkills('classic')}
      {renderCertifications()}
    </>
  );

  const renderExecutiveTemplate = () => (
    <>
      <div className="rounded-lg p-6 mb-6 text-white" style={{ backgroundColor: '#1f2937' }}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"><span className="text-2xl font-serif font-bold">{(personalInfo.fullName || 'YN').split(' ').map(n => n[0]).join('')}</span></div>
          <div>
            <h1 className="text-3xl font-serif font-bold">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-gray-300 text-sm uppercase tracking-wider">{personalInfo.professionalTitle || 'Professional Profile'}</p>
          </div>
        </div>
        {personalInfo.summary && <p className="text-gray-300 mt-4 text-sm">{personalInfo.summary}</p>}
      </div>
      <div className="flex gap-6">
        <div className="w-1/3 bg-gray-50 p-4 rounded-lg">
          <h2 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">Contact</h2>
          {personalInfo.email && <div className="mb-3 text-sm"><span className="font-medium">Email:</span> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="mb-3 text-sm"><span className="font-medium">Phone:</span> {personalInfo.phone}</div>}
          {personalInfo.address && <div className="mb-3 text-sm"><span className="font-medium">Location:</span> {personalInfo.address}</div>}
          {skills.technical.length > 0 && <><h2 className="font-bold text-gray-800 mt-6 mb-4 pb-2 border-b border-gray-300">Technical Skills</h2><div className="space-y-2">{skills.technical.map((s, i) => <div key={i} className="text-sm">{s.name}</div>)}</div></>}
          {skills.soft.length > 0 && <><h2 className="font-bold text-gray-800 mt-6 mb-4 pb-2 border-b border-gray-300">Soft Skills</h2><div className="flex flex-wrap gap-1">{skills.soft.map((s, i) => <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">{s.name}</span>)}</div></>}
        </div>
        <div className="w-2/3">
          {experience.length > 0 && <><h2 className="text-xl font-bold text-gray-800 mb-4">Work Experience</h2><div className="space-y-6 mb-6">{experience.map((e, i) => <div key={i} className="border-l-4 border-gray-800 pl-4"><h3 className="font-semibold text-lg">{e.position}</h3><div className="text-gray-600">{e.company} | {e.startDate}{e.currentlyWorking ? ' - Present' : e.endDate && ` - ${e.endDate}`}</div>{e.description && <p className="text-sm text-gray-600 mt-2">{e.description}</p>}{e.achievements?.length > 0 && <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">{e.achievements.filter(a => a).map((a, ai) => <li key={ai}>{a}</li>)}</ul>}</div>)}</div></>}
          {education.length > 0 && <><h2 className="text-xl font-bold text-gray-800 mb-4">Education</h2><div className="space-y-4 mb-6">{education.map((e, i) => <div key={i} className="border-l-4 border-gray-800 pl-4"><h3 className="font-semibold">{e.degree}{e.fieldOfStudy ? ' in ' + e.fieldOfStudy : ''}</h3><div className="text-gray-600">{e.institution} | {e.startDate}{e.currentlyStudying ? ' - Present' : e.endDate && ` - ${e.endDate}`}</div>{e.gpa && <div className="text-sm text-gray-500">GPA: {e.gpa}</div>}</div>)}</div></>}
        </div>
      </div>
    </>
  );

  const renderCreativeTemplate = () => (
    <>
      <div className="rounded-xl p-6 mb-6 text-white" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
        <h1 className="text-4xl font-bold mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-white/90 mb-2 text-lg font-medium">{personalInfo.professionalTitle}</p>}
        <p className="text-white/80 mb-4 text-sm">{personalInfo.summary || 'Creative Professional'}</p>
        <div className="flex flex-wrap gap-4 text-sm text-white/80">
          {personalInfo.email && <div className="flex items-center gap-1"><Mail className="w-4 h-4" /><span>{personalInfo.email}</span></div>}
          {personalInfo.phone && <div className="flex items-center gap-1"><Phone className="w-4 h-4" /><span>{personalInfo.phone}</span></div>}
          {personalInfo.portfolio && <div className="flex items-center gap-1"><Globe className="w-4 h-4" /><span>{personalInfo.portfolio.replace(/https?:\/\/(www\.)?/, '')}</span></div>}
        </div>
      </div>
      {skills.technical.length > 0 && <div className="mb-6"><h2 className="text-2xl font-bold mb-4" style={{ color }}>Skills & Expertise</h2><div className="flex flex-wrap gap-2">{skills.technical.map((s, i) => <span key={i} className="px-3 py-1 rounded-full text-white" style={{ backgroundColor: color }}>{s.name}</span>)}</div></div>}
      {experience.length > 0 && <div className="mb-6"><h2 className="text-2xl font-bold mb-4" style={{ color }}>Professional Journey</h2><div className="space-y-6">{experience.map((e, i) => <div key={i} className="bg-gray-50 p-4 rounded-lg"><div className="flex justify-between items-start"><div><h3 className="font-semibold text-lg">{e.position}</h3><div className="text-gray-600">{e.company}</div></div><span className="text-sm text-gray-500">{e.startDate}{e.currentlyWorking ? ' - Present' : e.endDate && ` - ${e.endDate}`}</span></div>{e.description && <p className="text-sm text-gray-600 mt-2">{e.description}</p>}</div>)}</div></div>}
      {education.length > 0 && <div className="mb-6"><h2 className="text-2xl font-bold mb-4" style={{ color }}>Academic Background</h2><div className="space-y-4">{education.map((e, i) => <div key={i} className="bg-gray-50 p-4 rounded-lg"><h3 className="font-semibold">{e.degree}{e.fieldOfStudy ? ' in ' + e.fieldOfStudy : ''}</h3><div className="text-gray-600">{e.institution}</div></div>)}</div></div>}
      {projects.length > 0 && <div className="mb-6"><h2 className="text-2xl font-bold mb-4" style={{ color }}>Featured Projects</h2><div className="grid grid-cols-2 gap-4">{projects.map((p, i) => <div key={i} className="bg-gray-50 p-4 rounded-lg"><h3 className="font-semibold">{p.name}</h3>{p.description && <p className="text-sm text-gray-600 mt-1">{p.description}</p>}</div>)}</div></div>}
    </>
  );

  const renderMinimalTemplate = () => (
    <>
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-black mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-lg text-gray-700 mb-2">{personalInfo.professionalTitle}</p>}
        <p className="text-gray-500 text-sm mb-4">{personalInfo.email}{personalInfo.phone && ` | ${personalInfo.phone}`}{personalInfo.address && ` | ${personalInfo.address}`}</p>
        {personalInfo.summary && <p className="text-gray-700 text-sm leading-relaxed border-l-2 border-black pl-4">{personalInfo.summary}</p>}
      </div>
      {experience.length > 0 && <div className="mb-6"><h2 className="text-xl font-bold text-black mb-4">Experience</h2><div className="space-y-4">{experience.map((e, i) => <div key={i}><div className="flex justify-between"><h3 className="font-semibold">{e.position}</h3><span className="text-sm text-gray-500">{e.startDate}{e.currentlyWorking ? ' - Present' : e.endDate && ` - ${e.endDate}`}</span></div><div className="text-gray-600">{e.company}</div>{e.description && <p className="text-sm text-gray-600 mt-1">{e.description}</p>}</div>)}</div></div>}
      {education.length > 0 && <div className="mb-6"><h2 className="text-xl font-bold text-black mb-4">Education</h2><div className="space-y-4">{education.map((e, i) => <div key={i}><div className="flex justify-between"><h3 className="font-semibold">{e.degree}{e.fieldOfStudy ? ' in ' + e.fieldOfStudy : ''}</h3><span className="text-sm text-gray-500">{e.startDate}{e.currentlyStudying ? ' - Present' : e.endDate && ` - ${e.endDate}`}</span></div><div className="text-gray-600">{e.institution}</div></div>)}</div></div>}
      {skills.technical.length > 0 && <div className="mb-6"><h2 className="text-xl font-bold text-black mb-4">Skills</h2><p className="text-gray-700">{skills.technical.map(s => s.name).join(', ')}</p></div>}
      {projects.length > 0 && <div className="mb-6"><h2 className="text-xl font-bold text-black mb-4">Projects</h2><div className="space-y-3">{projects.map((p, i) => <div key={i}><h3 className="font-semibold">{p.name}</h3>{p.description && <p className="text-sm text-gray-600">{p.description}</p>}</div>)}</div></div>}
    </>
  );

  const renderProfessionalTemplate = () => (
    <>
      <div className="rounded-lg p-6 mb-6 text-white flex items-center justify-between" style={{ backgroundColor: color }}>
        <div>
          <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.professionalTitle && <p className="text-white/80">{personalInfo.professionalTitle}</p>}
        </div>
        <div className="text-right text-sm">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.address && <div>{personalInfo.address}</div>}
        </div>
      </div>
      {personalInfo.summary && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-bold mb-2" style={{ color }}>Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}
      {renderSkills('professional')}
      {renderExperience()}
      {renderEducation()}
      {renderCertifications()}
    </>
  );

  const renderElegantTemplate = () => (
    <>
      <div className="text-center border-b-2 pb-6 mb-6" style={{ borderColor: color }}>
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-lg font-medium text-gray-700 mb-2">{personalInfo.professionalTitle}</p>}
        {personalInfo.summary && (
          <div className="mt-4">
            <p className="text-gray-600 italic">"{personalInfo.summary}"</p>
          </div>
        )}
        <div className="flex justify-center gap-4 mt-4 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </div>
      {renderExperience()}
      {renderSkills('elegant')}
      {renderEducation()}
      {renderProjects()}
    </>
  );

  const renderTimelessTemplate = () => (
    <>
      <div className="border-b-4 border-gray-600 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-lg font-medium text-gray-700 mb-2">{personalInfo.professionalTitle}</p>}
        <div className="text-gray-600">{personalInfo.email} | {personalInfo.phone} | {personalInfo.address}</div>
      </div>
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Objective</h2>
          <p className="text-gray-600">{personalInfo.summary}</p>
        </div>
      )}
      {renderExperience()}
      {renderEducation()}
      {renderSkills('timeless')}
    </>
  );

  const renderBoldTemplate = () => (
    <>
      <div className="rounded-xl p-6 mb-6 text-white font-bold text-center" style={{ backgroundColor: color }}>
        <h1 className="text-4xl mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-white/90 font-normal mb-1">{personalInfo.professionalTitle}</p>}
        <p className="text-white/80 font-normal">{personalInfo.summary?.substring(0, 60) || 'Professional Summary'}</p>
      </div>
      {renderExperience()}
      {renderProjects()}
      {renderSkills('bold')}
      {renderEducation()}
    </>
  );

  const renderSimpleTemplate = () => (
    <>
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-lg text-gray-700 mb-2">{personalInfo.professionalTitle}</p>}
        <p className="text-gray-500 mb-4">{personalInfo.email} | {personalInfo.phone}</p>
        {personalInfo.summary && <p className="text-gray-700">{personalInfo.summary}</p>}
      </div>
      {renderExperience()}
      {renderEducation()}
      {skills.technical.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Skills</h2>
          <p className="text-gray-700">{skills.technical.map(s => s.name).join(', ')}</p>
        </div>
      )}
      {renderProjects()}
    </>
  );

  const renderPremiumTemplate = () => (
    <>
      <div className="border-b-2 pb-6 mb-6" style={{ borderColor: color }}>
        <h1 className="text-4xl font-serif font-bold mb-1" style={{ color: '#92400e' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-amber-700 font-medium mb-2">{personalInfo.professionalTitle}</p>}
        <p className="text-amber-700 font-medium">{personalInfo.summary?.substring(0, 50) || 'Professional Title'}</p>
        <div className="flex gap-4 mt-3 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </div>
      {renderExperience()}
      {renderEducation()}
      {renderSkills('premium')}
      {renderCertifications()}
    </>
  );

  const renderFunctionalTemplate = () => (
    <>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p className="text-lg font-medium text-gray-700 mb-2">{personalInfo.professionalTitle}</p>}
        <p className="text-gray-600">{personalInfo.email} | {personalInfo.phone}</p>
      </div>
      {renderSkills('functional')}
      {personalInfo.summary && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-bold mb-2" style={{ color }}>Professional Summary</h2>
          <p className="text-gray-600">{personalInfo.summary}</p>
        </div>
      )}
      {renderExperience()}
      {renderEducation()}
      {renderCertifications()}
    </>
  );

  // Main render function that uses section order
  const renderOrderedSections = () => {
    const templateId = selectedTemplate?.id;
    
    // For custom templates, render in order
    return (
      <>
        {sectionOrder.map(section => {
          switch(section) {
            case 'summary':
              return personalInfo.summary ? (
                <div key="summary" className="mb-6">
                  <h2 className="text-xl font-bold mb-3" style={{ color }}>Professional Summary</h2>
                  <p className="text-gray-600">{personalInfo.summary}</p>
                </div>
              ) : null;
            case 'skills':
              return renderSkills(templateId);
            case 'experience':
              return renderExperience();
            case 'education':
              return renderEducation();
            case 'projects':
              return renderProjects();
            case 'certifications':
              return renderCertifications();
            default:
              return null;
          }
        })}
      </>
    );
  };

  const renderTemplate = () => {
    switch (selectedTemplate?.id) {
      case 'modern': return renderModernTemplate();
      case 'classic': return renderClassicTemplate();
      case 'executive': return renderExecutiveTemplate();
      case 'creative': return renderCreativeTemplate();
      case 'minimal': return renderMinimalTemplate();
      case 'professional': return renderProfessionalTemplate();
      case 'elegant': return renderElegantTemplate();
      case 'timeless': return renderTimelessTemplate();
      case 'bold': return renderBoldTemplate();
      case 'simple': return renderSimpleTemplate();
      case 'premium': return renderPremiumTemplate();
      case 'functional': return renderFunctionalTemplate();
      default: return renderModernTemplate();
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

      {/* AdSense Placeholder */}
      <div className="bg-gray-100 py-4 text-center print:hidden">
        <div className="max-w-728px mx-auto">
          <p className="text-gray-400 text-sm">Advertisement</p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
