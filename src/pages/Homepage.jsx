import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Sparkles, BarChart3, CheckCircle, ArrowRight, 
  Download, Users, Zap, Target, Clock, Shield, Globe, Wand2
} from 'lucide-react';
import Hero from '../components/Hero';

const Homepage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: 'Professional Templates',
      description: 'Choose from 6+ professionally designed CV templates tailored for every industry',
      color: '#1783e0',
    },
    {
      icon: Wand2,
      title: 'AI-Powered Builder',
      description: 'Our AI helps you craft compelling content and suggests improvements',
      color: '#8b5cf6',
    },
    {
      icon: BarChart3,
      title: 'CV Analysis',
      description: 'Upload your existing CV and get a score with detailed feedback',
      color: '#10b981',
    },
    {
      icon: Download,
      title: 'PDF Export',
      description: 'Download your professional CV in PDF format ready to apply',
      color: '#f59e0b',
    },
  ];

  const stats = [
    { value: '50,000+', label: 'CVs Created' },
    { value: '95%', label: 'Success Rate' },
    { value: '500+', label: 'Templates' },
    { value: 'Free', label: 'To Use' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer at Google',
      text: 'Got 3 interview calls within a week of using CV-mave!',
      avatar: 'S',
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Manager',
      text: 'The AI suggestions helped me improve my CV significantly.',
      avatar: 'M',
    },
    {
      name: 'Emily Davis',
      role: 'Product Designer',
      text: 'Beautiful templates and easy to use. Highly recommended!',
      avatar: 'E',
    },
  ];

  return (
    <div>
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Create a Winning CV
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to stand out in your job search
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1783e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Create your professional CV in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1783e0] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose a Template</h3>
              <p className="text-gray-600">Select from our professional CV templates designed for every industry</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1783e0] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fill Your Details</h3>
              <p className="text-gray-600">Enter your information using our easy multi-step form</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1783e0] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Download & Apply</h3>
              <p className="text-gray-600">Download your CV as PDF and start applying for jobs</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/templates')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1783e0] text-white rounded-xl font-semibold hover:bg-[#1567c4] transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#1783e0] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1783e0] to-[#8b5cf6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Create a professional CV in minutes and boost your chances of getting hired
          </p>
          <button
            onClick={() => navigate('/templates')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1783e0] rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Create Your CV Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default Homepage;
