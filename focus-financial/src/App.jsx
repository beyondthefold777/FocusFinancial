import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import StablecoinSelector from './components/StablecoinSelector';
import About from './components/About';
import Contact from './components/Contact';
import ConvertForm from './components/ConvertForm';
import Login from './components/Login';
import Register from './components/Register';

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
            <Route path="/convert/:pair" element={<ConvertForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />           {/* ✅ Added */}
            <Route path="/register" element={<Register />} />     {/* ✅ Added */}
          </Routes>
        </main>

        <footer style={{ textAlign: 'center', padding: '1rem 0', fontSize: '0.9rem', color: '#ccc' }}>
          &copy; {new Date().getFullYear()} Focus Financial. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}