import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import TemplateSelection from './pages/TemplateSelection';
import CVForm from './pages/CVForm';
import Preview from './pages/Preview';
import CVAnalysis from './pages/CVAnalysis';
import CoverLetterWriter from './pages/AIImprovement';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import RouteExperienceManager from './components/RouteExperienceManager';
import useCVStore from './store/cvStore';

// Route guard: redirect to /templates if no template selected
const RequireTemplate = ({ children }) => {
  const selectedTemplate = useCVStore((state) => state.selectedTemplate);
  if (!selectedTemplate) {
    return <Navigate to="/templates" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <RouteExperienceManager />
      <div className="min-h-screen flex flex-col bg-gray-50 ">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/templates" element={<TemplateSelection />} />
            <Route 
              path="/create-cv" 
              element={
                <RequireTemplate>
                  <CVForm />
                </RequireTemplate>
              } 
            />
            <Route path="/preview" element={<Preview />} />
            <Route path="/analyze" element={<CVAnalysis />} />
            <Route path="/cover-letter" element={<CoverLetterWriter />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
