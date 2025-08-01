import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="text-2xl font-extrabold text-focusPurpleLight tracking-wide">
        Focus<span className="text-white">Financial</span>
      </div>
      <button className="text-white hover:text-focusPurpleLight transition duration-300">
        <Menu size={28} />
      </button>
    </nav>
  );
}
