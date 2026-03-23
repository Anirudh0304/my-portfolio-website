import React from 'react';
import { education } from '../../constants';

const SectionTitle = ({ label, title, subtitle }) => (
  <div className="text-center mb-20">
    <p
      className="text-xs font-medium tracking-widest uppercase mb-3"
      style={{ color: '#7c3aed', letterSpacing: '0.2em' }}
    >
      {label}
    </p>
    <h2
      className="text-4xl sm:text-5xl font-bold mb-4"
      style={{ fontFamily: 'Syne, sans-serif', color: '#f0eeff' }}
    >
      {title}
    </h2>
    <div
      className="w-12 h-0.5 mx-auto mb-5"
      style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)' }}
    />
    <p className="text-base max-w-lg mx-auto" style={{ color: '#9490b5', lineHeight: 1.7 }}>
      {subtitle}
    </p>
  </div>
);

const Education = () => {
  return (
    <section
      id="education"
      className="py-28 px-6 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto font-sans relative"
    >
      <SectionTitle
        label="My background"
        title="Education"
        subtitle="The academic foundations that have shaped my technical and analytical thinking"
      />

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.4) 15%, rgba(124,58,237,0.4) 85%, transparent)' }}
        />

        <div className="flex flex-col gap-14">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              {/* Node */}
              <div
                className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full items-center justify-center z-10 flex-shrink-0"
                style={{
                  background: '#03020f',
                  border: '2px solid rgba(124,58,237,0.6)',
                  boxShadow: '0 0 20px rgba(124,58,237,0.2)',
                }}
              >
                <img
                  src={edu.img}
                  alt={edu.school}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>

              {/* Card */}
              <div className="w-full md:w-[calc(50%-3.5rem)]">
                <div
                  className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
                  style={{
                    background: 'rgba(13,11,34,0.9)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
                    e.currentTarget.style.boxShadow = '0 12px 50px rgba(124,58,237,0.15)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Top accent */}
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)' }}
                  />

                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div
                      className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                      style={{
                        background: '#fff',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '2px',
                      }}
                    >
                      <img src={edu.img} alt={edu.school} className="w-full h-full object-cover rounded-lg" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base font-bold leading-tight mb-1"
                        style={{ fontFamily: 'Syne, sans-serif', color: '#f0eeff' }}
                      >
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-medium mb-1" style={{ color: '#a855f7' }}>
                        {edu.school}
                      </p>
                      <p className="text-xs" style={{ color: '#4e4a6a' }}>{edu.date}</p>
                    </div>
                  </div>

                  {/* Grade badge */}
                  <div className="mt-5 flex items-center gap-3">
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                      style={{
                        background: 'rgba(124,58,237,0.1)',
                        border: '1px solid rgba(124,58,237,0.25)',
                        color: '#c084fc',
                      }}
                    >
                      <span className="text-xs" style={{ color: '#7c3aed' }}>◆</span>
                      Grade: {edu.grade}
                    </div>
                  </div>

                  {edu.desc && (
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: '#9490b5' }}>
                      {edu.desc}
                    </p>
                  )}
                </div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block w-[calc(50%-3.5rem)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;