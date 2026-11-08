import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Work from './components/Work/Work';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="bg-void relative overflow-hidden min-h-screen" style={{ backgroundColor: '#03020f' }}>

      {/* === Ambient background blobs === */}
      {/* Primary blob — top left */}
      <div
        className="animate-blob fixed pointer-events-none"
        style={{
          top: '5%',
          left: '-5%',
          width: '45vw',
          height: '45vw',
          maxWidth: 600,
          maxHeight: 600,
          background: 'radial-gradient(circle, rgba(109,40,217,0.18) 0%, rgba(124,58,237,0.06) 60%, transparent 75%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />
      {/* Secondary blob — center right */}
      <div
        className="animate-blob fixed pointer-events-none"
        style={{
          top: '40%',
          right: '-10%',
          width: '40vw',
          height: '40vw',
          maxWidth: 520,
          maxHeight: 520,
          background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(124,58,237,0.04) 60%, transparent 75%)',
          filter: 'blur(80px)',
          animationDelay: '-6s',
          zIndex: 0,
        }}
      />
      {/* Tertiary blob — bottom */}
      <div
        className="animate-blob fixed pointer-events-none"
        style={{
          bottom: '0%',
          left: '30%',
          width: '35vw',
          height: '35vw',
          maxWidth: 420,
          maxHeight: 420,
          background: 'radial-gradient(circle, rgba(91,33,182,0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animationDelay: '-12s',
          zIndex: 0,
        }}
      />

      {/* Fine dot grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          zIndex: 0,
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(3,2,15,0.6) 100%)',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="relative pt-20" style={{ zIndex: 1 }}>
        <Navbar />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default App;