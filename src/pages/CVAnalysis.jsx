import React, { useState, useMemo } from 'react';
import { 
  BarChart3, CheckCircle, XCircle, AlertTriangle, 
  TrendingUp, FileText, Target, Zap, RefreshCw, 
  Award, Briefcase, GraduationCap, Code, Users, Mail, Upload,
  Eye, AlertCircle, Lightbulb, Star, Loader
} from 'lucide-react';
import useCVStore from '../store/cvStore';
import { parseCVFile, analyzeCVText } from '../utils/fileParser';

const CVAnalysis = () => {
  const { personalInfo, education, experience, skills, certifications, projects } = useCVStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [analysisMode, setAnalysisMode] = useState('store'); // 'store' or 'upload'
  const [parsingError, setParsingError] = useState(null);
  const [isParsing, setIsParsing] = useState(false);

  // Handle file upload with actual text extraction
  const handleFileUpload = async (file) => {
    if (!file) return;
    
    // Check if file type is supported
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    const validExtensions = ['.pdf', '.docx', '.txt'];
    const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!validTypes.includes(file.type) && !hasValidExtension) {
      setParsingError('Please upload a PDF, DOCX, or TXT file');
      return;
    }

    setUploadedFile(file);
    setAnalysisMode('upload');
    setParsingError(null);
    setIsParsing(true);

    try {
      const text = await parseCVFile(file);
      setExtractedText(text);
      setIsParsing(false);
    } catch (error) {
      console.error('File parsing error:', error);
      setParsingError(error.message || 'Failed to parse file. Please try a different file.');
      setIsParsing(false);
      // Fall back to analyzing current CV
      setAnalysisMode('store');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // Calculate CV score based on actual analysis
  const analysis = useMemo(() => {
    const results = {
      score: 0,
      maxScore: 100,
      categories: [],
      suggestions: [],
      strengths: [],
      missing: [],
      improvements: [],
    };

    let parsedData;
    
    if (analysisMode === 'upload' && extractedText) {
      // Analyze uploaded file
      parsedData = analyzeCVText(extractedText);
      const completeness = parsedData.completeness;
      const metrics = parsedData.metrics;
      const keywords = parsedData.keywords;

      // 1. Contact Information (15 points)
      let contactScore = 0;
      if (completeness.hasEmail) contactScore += 5;
      if (completeness.hasPhone) contactScore += 4;
      if (completeness.hasLinkedIn) contactScore += 3;
      if (completeness.hasLocation) contactScore += 3;

      results.categories.push({
        name: 'Contact Information',
        icon: Mail,
        score: contactScore,
        maxScore: 15,
        items: [
          { name: 'Email Address', check: completeness.hasEmail, weight: 5 },
          { name: 'Phone Number', check: completeness.hasPhone, weight: 4 },
          { name: 'LinkedIn Profile', check: completeness.hasLinkedIn, weight: 3 },
          { name: 'Location', check: completeness.hasLocation, weight: 3 },
        ],
      });

      // 2. Professional Summary (15 points)
      let summaryScore = 0;
      if (completeness.hasSummary) summaryScore += 10;
      if (metrics.wordCount > 50) summaryScore += 5;

      results.categories.push({
        name: 'Professional Summary',
        icon: FileText,
        score: summaryScore,
        maxScore: 15,
        items: [
          { name: 'Summary Section', check: completeness.hasSummary, weight: 10 },
          { name: 'Substantial Content', check: metrics.wordCount > 50, weight: 5 },
        ],
      });

      // 3. Work Experience (30 points)
      let expScore = 0;
      if (completeness.hasExperience) expScore += 10;
      if (metrics.bulletCount > 5) expScore += 5;
      if (metrics.hasNumbers) expScore += 5;
      if (keywords.actionVerbs.length > 3) expScore += 5;
      if (metrics.hasPercentages || metrics.hasCurrency) expScore += 5;

      results.categories.push({
        name: 'Work Experience',
        icon: Briefcase,
        score: expScore,
        maxScore: 30,
        items: [
          { name: 'Experience Section', check: completeness.hasExperience, weight: 10 },
          { name: 'Bullet Points', check: metrics.bulletCount > 5, weight: 5 },
          { name: 'Quantifiable Results', check: metrics.hasNumbers, weight: 5 },
          { name: 'Action Verbs', check: keywords.actionVerbs.length > 3, weight: 5 },
          { name: 'Metrics (%, $)', check: metrics.hasPercentages || metrics.hasCurrency, weight: 5 },
        ],
      });

      // 4. Education (10 points)
      let eduScore = 0;
      if (completeness.hasEducation) eduScore += 10;

      results.categories.push({
        name: 'Education',
        icon: GraduationCap,
        score: eduScore,
        maxScore: 10,
        items: [
          { name: 'Education Section', check: completeness.hasEducation, weight: 10 },
        ],
      });

      // 5. Skills (15 points)
      let skillScore = 0;
      if (completeness.hasSkills) skillScore += 8;
      if (keywords.techKeywords.length > 2) skillScore += 4;
      if (keywords.softSkills.length > 1) skillScore += 3;

      results.categories.push({
        name: 'Skills',
        icon: Code,
        score: skillScore,
        maxScore: 15,
        items: [
          { name: 'Skills Section', check: completeness.hasSkills, weight: 8 },
          { name: 'Technical Keywords', check: keywords.techKeywords.length > 2, weight: 4 },
          { name: 'Soft Skills', check: keywords.softSkills.length > 1, weight: 3 },
        ],
      });

      // 6. Additional Sections (15 points)
      let additionalScore = 0;
      if (completeness.hasProjects) additionalScore += 8;
      if (completeness.hasCertifications) additionalScore += 7;

      results.categories.push({
        name: 'Additional Sections',
        icon: Award,
        score: additionalScore,
        maxScore: 15,
        items: [
          { name: 'Projects', check: completeness.hasProjects, weight: 8 },
          { name: 'Certifications', check: completeness.hasCertifications, weight: 7 },
        ],
      });

      // Calculate total
      results.score = contactScore + summaryScore + expScore + eduScore + skillScore + additionalScore;

      // Generate specific suggestions based on analysis
      if (!completeness.hasEmail) {
        results.missing.push('Email address is missing');
      }
      if (!completeness.hasPhone) {
        results.missing.push('Phone number is missing');
      }
      if (!completeness.hasLinkedIn) {
        results.suggestions.push({ priority: 'medium', text: 'Add your LinkedIn profile URL' });
      }
      if (!completeness.hasSummary) {
        results.suggestions.push({ priority: 'high', text: 'Add a professional summary section' });
      }
      if (!completeness.hasExperience) {
        results.missing.push('Work experience section is missing');
      }
      if (metrics.bulletCount < 5) {
        results.suggestions.push({ priority: 'high', text: 'Add more bullet points to describe your achievements' });
      }
      if (!metrics.hasNumbers) {
        results.suggestions.push({ priority: 'high', text: 'Include quantifiable results (numbers, percentages, metrics)' });
      }
      if (keywords.actionVerbs.length < 3) {
        results.suggestions.push({ priority: 'medium', text: 'Use more action verbs to describe your achievements' });
      }
      if (!completeness.hasSkills) {
        results.missing.push('Skills section is missing');
      }
      if (keywords.techKeywords.length < 3) {
        results.suggestions.push({ priority: 'medium', text: 'Add more relevant technical skills for your industry' });
      }
      if (!completeness.hasProjects) {
        results.suggestions.push({ priority: 'low', text: 'Consider adding a projects section to showcase your work' });
      }
      if (!completeness.hasCertifications) {
        results.suggestions.push({ priority: 'low', text: 'Add relevant certifications to strengthen your profile' });
      }

      // Generate strengths
      if (completeness.hasEmail && completeness.hasPhone && completeness.hasLinkedIn) {
        results.strengths.push('Complete contact information');
      }
      if (completeness.hasSummary) {
        results.strengths.push('Professional summary included');
      }
      if (metrics.bulletCount > 10) {
        results.strengths.push('Detailed work experience with multiple bullet points');
      }
      if (metrics.hasNumbers) {
        results.strengths.push('Quantifiable achievements');
      }
      if (keywords.actionVerbs.length > 5) {
        results.strengths.push('Strong action verbs usage');
      }
      if (keywords.techKeywords.length > 5) {
        results.strengths.push('Comprehensive technical skills');
      }

    } else {
      // Analyze store data (current CV being created)
      
      // 1. Personal Information (15 points)
      let personalScore = 0;
      const personalChecks = [
        { name: 'Full Name', check: !!personalInfo.fullName, weight: 3 },
        { name: 'Email Address', check: !!personalInfo.email, weight: 3 },
        { name: 'Phone Number', check: !!personalInfo.phone, weight: 2 },
        { name: 'Location', check: !!personalInfo.address, weight: 2 },
        { name: 'LinkedIn Profile', check: !!personalInfo.linkedIn, weight: 2 },
        { name: 'Portfolio/Website', check: !!personalInfo.portfolio, weight: 1 },
        { name: 'Professional Summary', check: !!personalInfo.summary && personalInfo.summary.length > 50, weight: 2 },
      ];

      personalChecks.forEach(item => {
        if (item.check) personalScore += item.weight;
      });

      results.categories.push({
        name: 'Personal Information',
        icon: Mail,
        score: personalScore,
        maxScore: 15,
        items: personalChecks,
      });

      // 2. Work Experience (30 points)
      let expScore = 0;
      const expChecks = [
        { name: 'Has Work Experience', check: experience.length > 0, weight: 10 },
        { name: 'Multiple Positions', check: experience.length >= 2, weight: 5 },
        { name: 'Job Descriptions', check: experience.some(e => e.description), weight: 5 },
        { name: 'Achievements Listed', check: experience.some(e => e.achievements?.length > 0), weight: 5 },
        { name: 'Dates Included', check: experience.every(e => e.startDate), weight: 5 },
      ];

      expChecks.forEach(item => {
        if (item.check) expScore += item.weight;
      });

      results.categories.push({
        name: 'Work Experience',
        icon: Briefcase,
        score: expScore,
        maxScore: 30,
        items: expChecks,
      });

      // 3. Education (15 points)
      let eduScore = 0;
      const eduChecks = [
        { name: 'Education Listed', check: education.length > 0, weight: 8 },
        { name: 'Degree Information', check: education.some(e => e.degree), weight: 4 },
        { name: 'Institution Names', check: education.every(e => e.institution), weight: 3 },
      ];

      eduChecks.forEach(item => {
        if (item.check) eduScore += item.weight;
      });

      results.categories.push({
        name: 'Education',
        icon: GraduationCap,
        score: eduScore,
        maxScore: 15,
        items: eduChecks,
      });

      // 4. Skills (20 points)
      let skillScore = 0;
      const skillChecks = [
        { name: 'Technical Skills', check: skills.technical.length >= 3, weight: 8 },
        { name: 'Soft Skills', check: skills.soft.length >= 2, weight: 6 },
        { name: 'Languages', check: skills.languages.length > 0, weight: 6 },
      ];

      skillChecks.forEach(item => {
        if (item.check) skillScore += item.weight;
      });

      results.categories.push({
        name: 'Skills',
        icon: Code,
        score: skillScore,
        maxScore: 20,
        items: skillChecks,
      });

      // 5. Additional Sections (20 points)
      let additionalScore = 0;
      const additionalChecks = [
        { name: 'Certifications', check: certifications.length > 0, weight: 10 },
        { name: 'Projects', check: projects.length > 0, weight: 10 },
      ];

      additionalChecks.forEach(item => {
        if (item.check) additionalScore += item.weight;
      });

      results.categories.push({
        name: 'Additional Sections',
        icon: Award,
        score: additionalScore,
        maxScore: 20,
        items: additionalChecks,
      });

      // Calculate total score
      results.score = personalScore + expScore + eduScore + skillScore + additionalScore;

      // Generate suggestions based on store data
      if (!personalInfo.summary || personalInfo.summary.length < 50) {
        results.suggestions.push({ priority: 'high', text: 'Add a compelling professional summary (50+ characters)' });
      }
      if (!personalInfo.linkedIn) {
        results.suggestions.push({ priority: 'high', text: 'Add your LinkedIn profile URL' });
      }
      if (experience.length === 0) {
        results.missing.push('Work experience is missing');
      }
      if (!experience.some(e => e.achievements?.length > 0)) {
        results.suggestions.push({ priority: 'high', text: 'Add quantifiable achievements to your experience' });
      }
      if (skills.technical.length < 3) {
        results.suggestions.push({ priority: 'medium', text: 'Add more technical skills relevant to your field' });
      }
      if (certifications.length === 0) {
        results.suggestions.push({ priority: 'low', text: 'Consider adding relevant certifications' });
      }
      if (projects.length === 0) {
        results.suggestions.push({ priority: 'low', text: 'Add relevant projects to showcase your work' });
      }

      // Generate strengths
      if (personalInfo.summary && personalInfo.summary.length > 50) {
        results.strengths.push('Strong professional summary');
      }
      if (experience.length >= 2) {
        results.strengths.push('Diverse work experience');
      }
      if (experience.some(e => e.achievements?.length > 0)) {
        results.strengths.push('Quantifiable achievements');
      }
      if (skills.technical.length >= 5) {
        results.strengths.push('Comprehensive technical skills');
      }
      if (certifications.length > 0) {
        results.strengths.push('Relevant certifications');
      }
    }

    return results;
  }, [personalInfo, education, experience, skills, certifications, projects, extractedText, analysisMode]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setShowResults(false);
    setAnalysisMode('store');
    setUploadedFile(null);
    setExtractedText('');
    
    // Simulate real analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return { grade: 'A+', label: 'Excellent' };
    if (score >= 80) return { grade: 'A', label: 'Great' };
    if (score >= 70) return { grade: 'B', label: 'Good' };
    if (score >= 60) return { grade: 'C', label: 'Fair' };
    if (score >= 50) return { grade: 'D', label: 'Needs Work' };
    return { grade: 'F', label: 'Poor' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1783e0] to-[#10b981] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              CV Analysis & Scoring
            </h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Get a comprehensive score and feedback on how job-ready your CV is
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* File Upload Section */}
        {!showResults && (
          <div className="space-y-8">
            {/* Upload Area */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#1783e0]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Upload Your CV</h2>
                  <p className="text-gray-600">Upload an existing CV to analyze and get a score</p>
                </div>
              </div>

              {/* Error Message */}
              {parsingError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{parsingError}</span>
                </div>
              )}

              {/* Drop Zone */}
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragActive 
                    ? 'border-[#1783e0] bg-blue-50' 
                    : 'border-gray-300 hover:border-[#1783e0]'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {isParsing ? (
                  <div className="flex flex-col items-center">
                    <Loader className="w-12 h-12 text-[#1783e0] animate-spin mb-3" />
                    <p className="font-medium text-gray-700 mb-1">Parsing your CV file...</p>
                    <p className="text-sm text-gray-500">This may take a few seconds</p>
                  </div>
                ) : uploadedFile ? (
                  <div className="flex flex-col items-center">
                    <FileText className="w-12 h-12 text-green-500 mb-3" />
                    <p className="font-medium text-gray-900 mb-1">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                    {extractedText && (
                      <p className="text-sm text-green-600 mb-4">
                        ✓ Successfully parsed! Click "Analyze Uploaded CV" below.
                      </p>
                    )}
                    <button
                      onClick={() => { setUploadedFile(null); setExtractedText(''); setAnalysisMode('store'); }}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Remove and upload different file
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Drag and drop your CV here
                    </p>
                    <p className="text-gray-500 mb-4">or</p>
                    <label className="inline-flex items-center gap-2 px-6 py-3 bg-[#1783e0] text-white rounded-lg hover:bg-[#1567c4] transition-colors cursor-pointer">
                      <Upload className="w-5 h-5" />
                      Browse Files
                      <input 
                        type="file" 
                        className="hidden"
                        accept=".pdf,.docx,.txt"
                        onChange={handleInputChange}
                      />
                    </label>
                    <p className="text-xs text-gray-400 mt-4">
                      Supports PDF, DOCX, and TXT files
                    </p>
                  </>
                )}
              </div>

              {/* Analyze Uploaded CV Button */}
              {extractedText && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-center">
                    <button
                      onClick={() => { setIsAnalyzing(true); setShowResults(false); setTimeout(() => { setIsAnalyzing(false); setShowResults(true); }, 2000); }}
                      disabled={isAnalyzing}
                      className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                        isAnalyzing
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#1783e0] to-[#10b981] text-white hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <BarChart3 className="w-5 h-5" />
                          Analyze Uploaded CV
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Or use current CV */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-500 mb-4">Or analyze the CV you're creating with us</p>
                <div className="flex justify-center">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                      isAnalyzing
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#1783e0] to-[#10b981] text-white hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Analyzing Your CV...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-5 h-5" />
                        Analyze My CV
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">How CV Analysis Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1783e0] font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Upload CV or Use Current</h4>
                    <p className="text-sm text-gray-500">Upload PDF, DOCX, or TXT file or analyze your current CV</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1783e0] font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">AI Analysis</h4>
                    <p className="text-sm text-gray-500">Our system checks content, format, keywords and completeness</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1783e0] font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Get Detailed Score</h4>
                    <p className="text-sm text-gray-500">Receive a score with specific improvement suggestions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="space-y-8">
            {/* Score Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Score Circle */}
                <div className="relative">
                  <div className={`w-48 h-48 rounded-full flex items-center justify-center ${getScoreBg(analysis.score)}`}>
                    <div className="text-center">
                      <div className={`text-5xl font-bold ${getScoreColor(analysis.score)}`}>
                        {analysis.score}
                      </div>
                      <div className="text-gray-500">out of {analysis.maxScore}</div>
                    </div>
                  </div>
                </div>

                {/* Score Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
                      {getScoreGrade(analysis.score).grade}
                    </span>
                    <span className="text-xl text-gray-600">
                      - {getScoreGrade(analysis.score).label}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Your CV has a {getScoreGrade(analysis.score).label.toLowerCase()} score. 
                    {analysis.score >= 80 
                      ? " Great job! It's ready for job applications." 
                      : " Follow the suggestions below to improve your CV."}
                  </p>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowResults(false)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Re-analyze
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Analysis</h2>
              <div className="grid gap-6">
                {analysis.categories.map((category, index) => (
                  <div key={index} className="border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <category.icon className="w-5 h-5 text-[#1783e0]" />
                        <span className="font-semibold">{category.name}</span>
                      </div>
                      <span className={`font-bold ${
                        category.score >= category.maxScore * 0.8 ? 'text-green-600' :
                        category.score >= category.maxScore * 0.5 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {category.score}/{category.maxScore}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          category.score >= category.maxScore * 0.8 ? 'bg-green-500' :
                          category.score >= category.maxScore * 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(category.score / category.maxScore) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                      {category.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          {item.check ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                          <span className={item.check ? 'text-gray-700' : 'text-gray-500'}>
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing & Suggestions */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Missing Sections */}
              {analysis.missing.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Missing Sections
                  </h3>
                  <ul className="space-y-3">
                    {analysis.missing.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-red-600">
                        <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {analysis.suggestions.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Suggestions
                  </h3>
                  <ul className="space-y-3">
                    {analysis.suggestions.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          item.priority === 'high' ? 'bg-red-100 text-red-700' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {item.priority}
                        </span>
                        <span className="text-gray-700">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Strengths */}
            {analysis.strengths.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-green-500" />
                  Your Strengths
                </h3>
                <div className="flex flex-wrap gap-3">
                  {analysis.strengths.map((strength, index) => (
                    <span key={index} className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
                      ✓ {strength}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CVAnalysis;
