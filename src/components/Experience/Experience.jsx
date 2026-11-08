import PropTypes from 'prop-types';
import { experiences } from '../../constants';

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

SectionTitle.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

const ExperienceCard = ({ experience }) => (
  <div
    className="rounded-2xl p-6 sm:p-8 relative overflow-hidden group"
    style={{
      background: 'rgba(13,11,34,0.9)',
      border: '1px solid rgba(255,255,255,0.06)',
      boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
      e.currentTarget.style.boxShadow = '0 12px 50px rgba(124,58,237,0.18)';
      e.currentTarget.style.transform = 'translateY(-4px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
      e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {/* Top gradient accent */}
    <div
      className="absolute inset-x-0 top-0 h-px"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)' }}
    />
    {/* Corner glow */}
    <div
      className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)' }}
    />

    {/* Header */}
    <div className="flex items-start gap-4 mb-5">
      <div
        className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <img src={experience.img} alt={experience.company} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3
          className="text-lg font-bold leading-tight mb-1"
          style={{ fontFamily: 'Syne, sans-serif', color: '#f0eeff' }}
        >
          {experience.role}
        </h3>
        <p className="text-sm font-medium" style={{ color: '#a855f7' }}>{experience.company}</p>
        <p className="text-xs mt-1" style={{ color: '#4e4a6a' }}>{experience.date}</p>
      </div>
    </div>

    {/* Description */}
    <p className="text-sm leading-relaxed mb-5" style={{ color: '#9490b5', lineHeight: 1.75 }}>
      {experience.desc}
    </p>

    {/* Skills */}
    <div>
      <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#4e4a6a' }}>
        Skills used
      </p>
      <div className="flex flex-wrap gap-1.5">
        {experience.skills.map((skill, idx) => (
          <span key={idx} className="tag-chip">{skill.trim()}</span>
        ))}
      </div>
    </div>
  </div>
);

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    img: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-28 px-6 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto font-sans relative"
    >
      <SectionTitle
        label="What I've done"
        title="Experience"
        subtitle="Roles and responsibilities I've held in organisations — from technical management to digital marketing"
      />

      {/* Timeline layout */}
      <div className="relative">
        {/* Center line — visible only md+ */}
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.4) 15%, rgba(124,58,237,0.4) 85%, transparent)' }}
        />

        <div className="flex flex-col gap-16">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              {/* Timeline node */}
              <div
                className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full items-center justify-center z-10 flex-shrink-0"
                style={{
                  background: '#03020f',
                  border: '2px solid rgba(124,58,237,0.6)',
                  boxShadow: '0 0 20px rgba(124,58,237,0.25)',
                }}
              >
                <img
                  src={experience.img}
                  alt={experience.company}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>

              {/* Card — takes up half the width */}
              <div className="w-full md:w-[calc(50%-3.5rem)]">
                <ExperienceCard experience={experience} align={index % 2 === 0 ? 'right' : 'left'} />
              </div>

              {/* Spacer for opposite side */}
              <div className="hidden md:block w-[calc(50%-3.5rem)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;