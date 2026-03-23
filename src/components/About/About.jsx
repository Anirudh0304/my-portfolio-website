import React, { useEffect, useState } from 'react';
import ReactTypingEffect from 'react-typing-effect';
import Tilt from 'react-parallax-tilt';
import profileImage from '../../assets/profile.jpg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';

const StatBadge = ({ number, label }) => (
  <div
    className="flex flex-col items-center px-5 py-3 rounded-2xl"
    style={{
      background: 'rgba(124,58,237,0.08)',
      border: '1px solid rgba(124,58,237,0.2)',
    }}
  >
    <span
      className="text-2xl font-bold"
      style={{ fontFamily: 'Syne, sans-serif', color: '#c084fc' }}
    >
      {number}
    </span>
    <span className="text-xs mt-0.5" style={{ color: '#9490b5' }}>{label}</span>
  </div>
);

const About = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-8 px-6 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto"
    >
      <div
        className="w-full flex flex-col-reverse md:flex-row gap-16 items-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ── LEFT ── */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">

          {/* Available badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-medium"
            style={{
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.25)',
              color: '#34d399',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: '#10b981',
                boxShadow: '0 0 6px #10b981',
                animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
              }}
            />
            Open to opportunities · April 2026
          </div>

          {/* Greeting */}
          <p
            className="text-base font-medium mb-2 tracking-widest uppercase"
            style={{ color: '#7c3aed', letterSpacing: '0.18em', fontFamily: 'DM Sans, sans-serif' }}
          >
            Hello, world!
          </p>

          {/* Name */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4"
            style={{ fontFamily: 'Syne, sans-serif', color: '#f0eeff', lineHeight: 1.05 }}
          >
            Konduri
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Anirudh
            </span>
          </h1>

          {/* Typing role */}
          <div className="flex items-center gap-3 mb-6 h-10">
            <span
              className="w-8 h-[2px]"
              style={{ background: 'linear-gradient(90deg, #7c3aed, transparent)' }}
            />
            <span className="text-lg font-medium" style={{ color: '#9490b5', fontFamily: 'DM Sans, sans-serif' }}>
              Aspiring{' '}
              <ReactTypingEffect
                text={['Data Analyst', 'Data Scientist', 'ML Engineer']}
                speed={80}
                eraseSpeed={40}
                typingDelay={600}
                eraseDelay={1800}
                cursorRenderer={(cursor) => (
                  <span style={{ color: '#a855f7', marginLeft: 1 }}>{cursor}</span>
                )}
                displayTextRenderer={(text) => (
                  <span style={{ color: '#c084fc', fontWeight: 600 }}>{text}</span>
                )}
              />
            </span>
          </div>

          {/* Bio */}
          <p
            className="text-base leading-relaxed mb-8 max-w-lg"
            style={{ color: '#9490b5', lineHeight: 1.75 }}
          >
            CS & Data Science undergrad at <span style={{ color: '#c084fc' }}>VIT Vellore</span> (Class of 2026).
            I build NLP pipelines, BI dashboards, and XAI systems — turning raw data into decisions.
            Former External Management Head of <span style={{ color: '#c084fc' }}>Team Vyadh</span>, where I led 40+ students and secured 7+ sponsorships.
          </p>

          {/* Stats row */}
          <div className="flex gap-3 mb-10 flex-wrap justify-center md:justify-start">
            <StatBadge number="6+" label="Projects" />
            {/* <StatBadge number="2+" label="Experiences" /> */}
            <StatBadge number="2026" label="Graduating" />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <a
              href="https://drive.google.com/file/d/1U3clhBmbhz-SqR8C2EmsMQVZ0Ou7aaWC/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white overflow-hidden transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                boxShadow: '0 0 24px rgba(124,58,237,0.4)',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(124,58,237,0.65)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Download CV
              <HiArrowDown size={16} />
            </a>

            <a
              href="https://github.com/Anirudh0304"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                color: '#c084fc',
                border: '1px solid rgba(124,58,237,0.3)',
                background: 'rgba(124,58,237,0.06)',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.14)';
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.06)';
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
              }}
            >
              <FaGithub size={16} />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/konduri-anirudh/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                color: '#c084fc',
                border: '1px solid rgba(124,58,237,0.3)',
                background: 'rgba(124,58,237,0.06)',
                fontFamily: 'DM Sans, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.14)';
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.06)';
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
              }}
            >
              <FaLinkedin size={16} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex-shrink-0 flex flex-col items-center gap-4">
          {/* Tilt profile */}
          <Tilt
            tiltMaxAngleX={12}
            tiltMaxAngleY={12}
            perspective={1200}
            scale={1.04}
            transitionSpeed={1200}
            gyroscope={true}
            className="relative"
          >
            {/* Spinning ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #7c3aed, #a855f7, transparent, transparent, #7c3aed)',
                animation: 'spin 8s linear infinite',
                padding: 2,
                zIndex: 0,
              }}
            />

            {/* Glow ring */}
            <div
              className="absolute -inset-3 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 70%)',
                filter: 'blur(12px)',
                animation: 'pulseGlow 3s ease-in-out infinite',
                zIndex: 0,
              }}
            />

            {/* Image */}
            <div
              className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden"
              style={{
                border: '3px solid rgba(124,58,237,0.5)',
                boxShadow: '0 0 40px rgba(124,58,237,0.3), inset 0 0 40px rgba(0,0,0,0.3)',
                zIndex: 1,
              }}
            >
              <img
                src={profileImage}
                alt="Konduri Anirudh"
                className="w-full h-full object-cover"
              />
              {/* Overlay sheen */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.05) 0%, transparent 60%)',
                }}
              />
            </div>
          </Tilt>

          {/* Floating chips */}
          <div
            className="flex gap-2 flex-wrap justify-center max-w-xs"
            style={{ marginTop: 8 }}
          >
            {['Python', 'ML', 'XAI', 'Power BI', 'SQL'].map((tag) => (
              <span key={tag} className="tag-chip">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        style={{ color: '#4e4a6a' }}
        onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>scroll</span>
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '1.5px solid rgba(78,74,106,0.5)' }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{
              background: '#a855f7',
              animation: 'scroll-dot 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes scroll-dot {
          0% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(12px); opacity: 0; }
          81% { transform: translateY(0); opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};

export default About;