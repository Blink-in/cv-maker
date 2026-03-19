import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCVStore = create(
  persist(
    (set) => ({
      // Selected template
      selectedTemplate: null,
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),

      // Personal Information
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        linkedIn: '',
        portfolio: '',
        summary: '',
      },
      setPersonalInfo: (info) => set((state) => ({ 
        personalInfo: { ...state.personalInfo, ...info } 
      })),

      // Education
      education: [],
      addEducation: (edu) => set((state) => ({ 
        education: [...state.education, edu] 
      })),
      updateEducation: (index, edu) => set((state) => {
        const newEducation = [...state.education];
        newEducation[index] = edu;
        return { education: newEducation };
      }),
      removeEducation: (index) => set((state) => ({
        education: state.education.filter((_, i) => i !== index)
      })),

      // Work Experience
      experience: [],
      addExperience: (exp) => set((state) => ({ 
        experience: [...state.experience, exp] 
      })),
      updateExperience: (index, exp) => set((state) => {
        const newExperience = [...state.experience];
        newExperience[index] = exp;
        return { experience: newExperience };
      }),
      removeExperience: (index) => set((state) => ({
        experience: state.experience.filter((_, i) => i !== index)
      })),

      // Skills
      skills: {
        technical: [],
        soft: [],
        languages: [],
      },
      addSkill: (category, skill) => set((state) => ({
        skills: {
          ...state.skills,
          [category]: [...state.skills[category], skill]
        }
      })),
      removeSkill: (category, index) => set((state) => ({
        skills: {
          ...state.skills,
          [category]: state.skills[category].filter((_, i) => i !== index)
        }
      })),
      setSkills: (skills) => set({ skills }),

      // Certifications
      certifications: [],
      addCertification: (cert) => set((state) => ({ 
        certifications: [...state.certifications, cert] 
      })),
      removeCertification: (index) => set((state) => ({
        certifications: state.certifications.filter((_, i) => i !== index)
      })),

      // Projects
      projects: [],
      addProject: (project) => set((state) => ({ 
        projects: [...state.projects, project] 
      })),
      removeProject: (index) => set((state) => ({
        projects: state.projects.filter((_, i) => i !== index)
      })),

      // Current step in form
      currentStep: 0,
      setCurrentStep: (step) => set({ currentStep: step }),

      // AI Analysis
      aiSuggestions: [],
      setAiSuggestions: (suggestions) => set({ aiSuggestions: suggestions }),
      
      // CV Score
      cvScore: null,
      setCvScore: (score) => set({ cvScore: score }),

      // Reset CV data
      resetCV: () => set({
        selectedTemplate: null,
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          address: '',
          linkedIn: '',
          portfolio: '',
          summary: '',
        },
        education: [],
        experience: [],
        skills: { technical: [], soft: [], languages: [] },
        certifications: [],
        projects: [],
        currentStep: 0,
        aiSuggestions: [],
        cvScore: null,
      }),
    }),
    {
      name: 'cv-storage',
    }
  )
);

export default useCVStore;
