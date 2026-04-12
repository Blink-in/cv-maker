import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import TemplateSelection from './pages/TemplateSelection';
import CVForm from './pages/CVForm';
import Preview from './pages/Preview';
import CVAnalysis from './pages/CVAnalysis';
import CoverLetterWriter from './pages/AIImprovement';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/templates" element={<TemplateSelection />} />
            <Route path="/create-cv" element={<CVForm />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/analyze" element={<CVAnalysis />} />
            <Route path="/cover-letter" element={<CoverLetterWriter />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
