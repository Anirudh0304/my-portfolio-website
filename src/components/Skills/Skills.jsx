import React from 'react';
import { SkillsInfo } from '../../constants';
import Tilt from 'react-parallax-tilt';

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <p
      className="text-xs font-medium tracking-widest uppercase mb-3"
      style={{ color: '#7c3aed', letterSpacing: '0.2em' }}
    >
      What I work with
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

const categoryIcons = {
  'Languages': '{ }',
  'Database': '⬡',
  'Frameworks & Libraries': '◈',
  'Tools': '⚙',
};

const Skills = () => (
  <section
    id="skills"
    className="py-28 px-6 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto font-sans"
  >
    <SectionTitle
      title="Skills"
      subtitle="A curated stack of tools and technologies I use to build data-driven solutions"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {SkillsInfo.map((category) => (
        <Tilt
          key={category.title}
          tiltMaxAngleX={6}
          tiltMaxAngleY={6}
          perspective={1400}
          scale={1.02}
          transitionSpeed={1200}
          gyroscope={false}
        >
          <div
            className="h-full rounded-2xl p-6 relative overflow-hidden group"
            style={{
              background: 'rgba(13,11,34,0.8)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
              e.currentTarget.style.boxShadow = '0 8px 40px rgba(124,58,237,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
            }}
          >
            {/* Background accent */}
            <div
              className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at top right, rgba(124,58,237,0.08), transparent 70%)',
              }}
            />

            {/* Category header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                style={{
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  color: '#a855f7',
                  fontFamily: 'monospace',
                }}
              >
                {categoryIcons[category.title] || '#'}
              </div>
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: 'Syne, sans-serif', color: '#f0eeff' }}
                >
                  {category.title}
                </h3>
                <p className="text-xs" style={{ color: '#4e4a6a' }}>
                  {category.skills.length} technologies
                </p>
              </div>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-badge cursor-default"
                >
                  <img
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    className="w-5 h-5 object-contain flex-shrink-0"
                    style={{ filter: 'brightness(0.9) saturate(0.8)' }}
                  />
                  <span
                    className="text-xs font-medium leading-tight"
                    style={{ color: '#c0bdd8' }}
                  >
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Tilt>
      ))}
    </div>
  </section>
);

export default Skills;