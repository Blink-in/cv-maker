// Utility to parse different file formats for CV analysis

// Parse text file
export const parseTextFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

// Parse PDF file using pdf.js
export const parsePdfFile = async (file) => {
  try {
    // Dynamic import for pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist');
    
    // Set worker source
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF file');
  }
};

// Parse DOCX file
export const parseDocxFile = async (file) => {
  try {
    // Dynamic import for docx library
    const { Document, Packer, Paragraph, TextRun } = await import('docx');
    
    const arrayBuffer = await file.arrayBuffer();
    const doc = await Document.load(arrayBuffer);
    
    let fullText = '';
    
    // Extract text from all paragraphs
    doc.getChildren().forEach((child) => {
      if (child instanceof Paragraph) {
        let paragraphText = '';
        child.getChildren().forEach((textChild) => {
          if (textChild instanceof TextRun) {
            paragraphText += textChild.text;
          }
        });
        fullText += paragraphText + '\n';
      }
    });
    
    return fullText;
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error('Failed to parse DOCX file');
  }
};

// Main parse function that handles all supported formats
export const parseCVFile = async (file) => {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();
  
  if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
    return await parseTextFile(file);
  } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    return await parsePdfFile(file);
  } else if (
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileName.endsWith('.docx')
  ) {
    return await parseDocxFile(file);
  } else {
    throw new Error('Unsupported file format. Please upload PDF, DOCX, or TXT files.');
  }
};

// Analyze the extracted text
export const analyzeCVText = (text) => {
  const lowerText = text.toLowerCase();
  const words = text.split(/\s+/);
  
  // Extract email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : null;
  
  // Extract phone
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : null;
  
  // Find name (usually at the top, looks like ALL CAPS or Title Case)
  const lines = text.split('\n').filter(l => l.trim());
  const potentialName = lines[0]?.trim();
  
  // Check for various sections
  const sections = {
    summary: lowerText.includes('summary') || lowerText.includes('objective') || lowerText.includes('profile') || lowerText.includes('about'),
    experience: lowerText.includes('experience') || lowerText.includes('work history') || lowerText.includes('employment') || lowerText.includes('professional'),
    education: lowerText.includes('education') || lowerText.includes('degree') || lowerText.includes('university') || lowerText.includes('college'),
    skills: lowerText.includes('skill') || lowerText.includes('technolog') || lowerText.includes('competenc') || lowerText.includes('proficien'),
    projects: lowerText.includes('project') || lowerText.includes('portfolio'),
    certifications: lowerText.includes('certification') || lowerText.includes('certificate') || lowerText.includes('license') || lowerText.includes('training'),
    achievements: lowerText.includes('achievement') || lowerText.includes('accomplish') || lowerText.includes('result'),
  };
  
  // Count bullet points
  const bulletCount = (text.match(/[•\-\*]\s/g) || []).length;
  
  // Check for quantifiable achievements (numbers, percentages, etc.)
  const hasNumbers = /\d+/.test(text);
  const hasPercentages = /%\d+|\d+%/.test(text);
  const hasCurrency = /\$\d+|\d+\s*(k|m|b)/i.test(text);
  
  // Check for action verbs
  const actionVerbs = ['managed', 'led', 'developed', 'created', 'implemented', 'achieved', 'increased', 'decreased', 'improved', 'designed', 'built', 'launched', 'established', 'negotiated', 'coordinated'];
  const foundActionVerbs = actionVerbs.filter(verb => lowerText.includes(verb));
  
  // Check for soft skills mentions
  const softSkillWords = ['leadership', 'communication', 'teamwork', 'problem-solving', 'analytical', 'creative', 'adaptable', 'organized'];
  const foundSoftSkills = softSkillWords.filter(skill => lowerText.includes(skill));
  
  // Check for contact info completeness
  const hasLinkedIn = /linkedin\.com/i.test(text);
  const hasLocation = /location|address|city|street/i.test(text);
  
  // Check for keywords in job descriptions
  const techKeywords = ['javascript', 'python', 'java', 'react', 'angular', 'vue', 'node', 'sql', 'nosql', 'aws', 'azure', 'docker', 'kubernetes', 'git', 'agile', 'scrum'];
  const foundTechKeywords = techKeywords.filter(kw => lowerText.includes(kw));
  
  return {
    extracted: {
      name: potentialName,
      email,
      phone,
    },
    sections,
    metrics: {
      wordCount: words.length,
      bulletCount,
      hasNumbers,
      hasPercentages,
      hasCurrency,
    },
    keywords: {
      actionVerbs: foundActionVerbs,
      softSkills: foundSoftSkills,
      techKeywords: foundTechKeywords,
    },
    completeness: {
      hasEmail: !!email,
      hasPhone: !!phone,
      hasLinkedIn,
      hasLocation,
      hasSummary: sections.summary,
      hasExperience: sections.experience,
      hasEducation: sections.education,
      hasSkills: sections.skills,
      hasProjects: sections.projects,
      hasCertifications: sections.certifications,
    }
  };
};
