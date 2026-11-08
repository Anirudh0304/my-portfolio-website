import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'work' },
    { name: 'Education', id: 'education' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <footer
      className="relative px-6 sm:px-8 md:px-12 lg:px-16 pt-16 pb-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Top gradient accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3) 40%, rgba(124,58,237,0.3) 60%, transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-10">
          {/* Brand */}
          <div>
            <button
              onClick={() => handleScroll('about')}
              className="text-xl font-bold tracking-tight mb-2 cursor-pointer"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <span style={{ color: '#7c3aed' }}>&lt;</span>
              <span style={{ color: '#f0eeff' }}>Konduri</span>
              <span style={{ color: '#7c3aed' }}>/</span>
              <span style={{ color: '#f0eeff' }}>Anirudh</span>
              <span style={{ color: '#7c3aed' }}>&gt;</span>
            </button>
            <p className="text-sm" style={{ color: '#4e4a6a' }}>Data Scientist · VIT Vellore &apos;26</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="text-sm transition-colors duration-200"
                style={{ color: '#4e4a6a' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#c084fc'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#4e4a6a'; }}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-3">
            {[
              { icon: <FaGithub size={18} />, href: 'https://github.com/Anirudh0304' },
              { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/konduri-anirudh/' },
            ].map(({ icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: '#4e4a6a',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(124,58,237,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
                  e.currentTarget.style.color = '#a855f7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.color = '#4e4a6a';
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 24 }}>
          <p className="text-center text-xs" style={{ color: '#2e2b4a' }}>
            © {new Date().getFullYear()} Konduri Anirudh. Designed & built with care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;