import { useState } from 'react';
import { useInView } from '../hooks/useInView.js';
import ProjectCard from './ProjectCard.jsx';
import '../styles/Projects.css';

const categories = ['All', 'Software', 'English'];

export default function Projects({ projects = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [titleRef, titleInView] = useInView(0.1);
  const [filterRef, filterInView] = useInView(0.1);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="projects-section">
      {/* Background ambient depth aura */}
      <div className="projects-header-bg" aria-hidden="true" />

      <div className="projects-container">
        {/* Header Block */}
        <div className={`projects-header-wrapper reveal ${titleInView ? 'in-view' : ''}`} ref={titleRef}>
          <div className="projects-header-left">
            <span className="badge-category">Portfolio Work</span>
            <h1 className="projects-hero-heading">
              Featured <span className="highlight-text">Projects</span>
            </h1>
            <p className="projects-subtitle">
              A curated collection of intelligent software applications, machine learning models, and web architecture. Click any card to explore live demos or source repositories.
            </p>
          </div>

          {/* Filters */}
          <div
            ref={filterRef}
            className={`projects-filters reveal delay-1 ${filterInView ? 'in-view' : ''}`}
            role="tablist"
            aria-label="Filter projects by category"
          >
            {categories.map((cat) => {
              const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id || idx} project={project} delay={Math.min((idx % 4) + 1, 6)} />
            ))
          ) : (
            <div className="projects-placeholder-card">
              <div className="placeholder-icon-wrapper">
                <svg
                  className="placeholder-pulse-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="placeholder-title">Content Will Be Updated Soon</h3>
              <p className="placeholder-desc">
                English language education materials, communicative ESL curriculum designs, and teaching methodologies are currently being compiled and will be updated here shortly. Stay tuned!
              </p>
              <div className="placeholder-actions">
                <button className="btn btn-primary" onClick={() => setActiveCategory('Software')}>
                  View Software Projects
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
