import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { projects } from '../../constants';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink, HiX } from 'react-icons/hi';

const SectionTitle = ({ label, title, subtitle }) => (
  <div className="text-center mb-16">
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

const ProjectCard = ({ project, onClick }) => (
  <button
    onClick={() => onClick(project)}
    className="text-left w-full group relative rounded-2xl overflow-hidden flex flex-col"
    style={{
      background: 'rgba(13,11,34,0.9)',
      border: '1px solid rgba(255,255,255,0.06)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
      e.currentTarget.style.boxShadow = '0 16px 50px rgba(124,58,237,0.18)';
      e.currentTarget.style.transform = 'translateY(-6px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
      e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {/* Image */}
    <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Overlay on hover */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(3,2,15,0.7)', backdropFilter: 'blur(4px)' }}
      >
        <span
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
          style={{
            background: 'rgba(124,58,237,0.9)',
            color: '#fff',
            border: '1px solid rgba(168,85,247,0.5)',
          }}
        >
          View Details <HiExternalLink size={15} />
        </span>
      </div>
      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-16"
        style={{ background: 'linear-gradient(to top, rgba(13,11,34,0.9), transparent)' }}
      />
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 p-5">
      <h3
        className="text-base font-bold mb-2 leading-tight"
        style={{ fontFamily: 'Syne, sans-serif', color: '#f0eeff' }}
      >
        {project.title}
      </h3>
      <p
        className="text-xs leading-relaxed mb-4 flex-1 line-clamp-3"
        style={{ color: '#9490b5', lineHeight: 1.7 }}
      >
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((tag, i) => (
          <span key={i} className="tag-chip">{tag.trim()}</span>
        ))}
        {project.tags.length > 4 && (
          <span className="tag-chip">+{project.tags.length - 4}</span>
        )}
      </div>
    </div>
  </button>
);

const projectShape = PropTypes.shape({
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  github: PropTypes.string.isRequired,
});

ProjectCard.propTypes = {
  project: projectShape.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Modal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(3,2,15,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: 'rgba(13,11,34,0.98)',
          border: '1px solid rgba(124,58,237,0.25)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#9490b5',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.2)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#9490b5'; }}
        >
          <HiX size={18} />
        </button>

        {/* Image */}
        <div className="relative overflow-hidden rounded-t-2xl" style={{ aspectRatio: '16/9' }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(to top, rgba(13,11,34,0.98), transparent)' }}
          />
        </div>

        {/* Body */}
        <div className="p-7">
          {/* Top accent line */}
          <div
            className="w-10 h-0.5 mb-5"
            style={{ background: 'linear-gradient(90deg, #7c3aed, #a855f7)' }}
          />

          <h3
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: 'Syne, sans-serif', color: '#f0eeff' }}
          >
            {project.title}
          </h3>

          <p className="text-sm leading-relaxed mb-6" style={{ color: '#9490b5', lineHeight: 1.8 }}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {project.tags.map((tag, i) => (
              <span key={i} className="tag-chip">{tag.trim()}</span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              color: '#fff',
              boxShadow: '0 0 24px rgba(124,58,237,0.4)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(124,58,237,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <FaGithub size={16} />
            View Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  project: projectShape.isRequired,
  onClose: PropTypes.func.isRequired,
};

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="work"
      className="py-28 px-6 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto font-sans relative"
    >
      <SectionTitle
        label="What I've built"
        title="Projects"
        subtitle="A curated showcase of data engineering, analytics, and ML projects"
      />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
        ))}
      </div>

      {selectedProject && (
        <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Work;