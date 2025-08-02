import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import StablecoinSelector from './components/StablecoinSelector';
import About from './components/About';
import Contact from './components/Contact';
import ConvertForm from './components/ConvertForm'; // NEW

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-[#4B0082] to-[#7E22CE] text-white font-sans">
        <Navbar />
        <main className="px-6 py-12 space-y-12">
          <Routes>
            <Route path="/" element={
              <>
                <Intro />
                <StablecoinSelector />
              </>
            } />
            <Route path="/convert/:pair" element={<ConvertForm />} /> {/* NEW */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
