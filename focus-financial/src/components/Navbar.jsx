import { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown if clicked outside
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
        <img src="/logo.png" alt="Logo" style={{ height: '40px', width: '40px' }} />
      </div>

      {/* Hamburger Menu */}
      <div className="menu-wrapper" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="menu-button"
          aria-label="Toggle menu"
        >
          <Menu size={28} />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="dropdown">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
