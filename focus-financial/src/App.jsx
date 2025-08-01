import Navbar from './components/Navbar';
import Intro from './components/Intro';
import StablecoinSelector from './components/StablecoinSelector';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#4B0082] to-[#7E22CE] text-white font-sans">
      <Navbar />
      <main className="px-6 py-12 space-y-12">
        <Intro />
        <StablecoinSelector />
      </main>
    </div>
  );
}
