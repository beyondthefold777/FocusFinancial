import { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/focus.png" alt="Logo" style={{ height: '150px', width: '200px' }} />
      </div>

      {/* Menu */}
      <div className="flex items-center gap-4">
        {/* Login/Register Buttons */}
        <Link to="/login">
          <button className="px-4 py-2 border border-white text-white bg-purple-600 rounded hover:bg-purple-700">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-4 py-2 border border-white text-white bg-purple-600 rounded hover:bg-purple-700">
            Register
          </button>
        </Link>

        {/* Hamburger Menu */}
        <div className="menu-wrapper" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="menu-button"
            aria-label="Toggle menu"
          >
            <Menu size={28} />
          </button>

          {open && (
            <div className="dropdown">
              <Link to="/" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setOpen(false)}>About</Link>
              <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
