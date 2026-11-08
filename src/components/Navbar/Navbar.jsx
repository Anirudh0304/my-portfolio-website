import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Active section tracking
      const sections = ['about', 'skills', 'experience', 'work', 'education', 'contact'];
      for (const id of sections.slice().reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const menuItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-500 px-6 sm:px-8 md:px-10 lg:px-16"
      style={{
        background: isScrolled
          ? 'rgba(3,2,15,0.85)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(124,58,237,0.12)' : '1px solid transparent',
        boxShadow: isScrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="py-4 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => handleMenuItemClick('about')}
          className="group text-xl font-display font-bold tracking-tight cursor-pointer"
        >
          <span style={{ color: '#7c3aed' }}>&lt;</span>
          <span
            style={{ color: '#f0eeff' }}
            className="transition-colors duration-200 group-hover:text-purple-300"
          >Konduri</span>
          <span style={{ color: '#7c3aed' }}>/</span>
          <span
            style={{ color: '#f0eeff' }}
            className="transition-colors duration-200 group-hover:text-purple-300"
          >Anirudh</span>
          <span style={{ color: '#7c3aed' }}>&gt;</span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuItemClick(item.id)}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg group"
                style={{
                  color: activeSection === item.id ? '#c084fc' : '#9490b5',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                {activeSection === item.id && (
                  <span
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(124,58,237,0.12)' }}
                  />
                )}
                <span className="relative group-hover:text-purple-300 transition-colors duration-200">
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#a855f7' }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/Anirudh0304"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 group"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
          >
            <FaGithub
              size={18}
              className="transition-all duration-200 group-hover:text-purple-400"
              style={{ color: '#9490b5' }}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/konduri-anirudh/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 group"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
          >
            <FaLinkedin
              size={18}
              className="transition-all duration-200 group-hover:text-purple-400"
              style={{ color: '#9490b5' }}
            />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors duration-200"
          style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen
            ? <FiX size={20} style={{ color: '#a855f7' }} />
            : <FiMenu size={20} style={{ color: '#a855f7' }} />
          }
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden absolute top-full left-4 right-4 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(7,5,26,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(124,58,237,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <ul className="py-4 px-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.id)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    color: activeSection === item.id ? '#c084fc' : '#9490b5',
                    background: activeSection === item.id ? 'rgba(124,58,237,0.12)' : 'transparent',
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 px-6 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <a href="https://github.com/Anirudh0304" target="_blank" rel="noopener noreferrer">
              <FaGithub size={20} style={{ color: '#9490b5' }} />
            </a>
            <a href="https://www.linkedin.com/in/konduri-anirudh/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={20} style={{ color: '#9490b5' }} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;