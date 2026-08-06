import { useInView } from '../hooks/useInView.js';
import '../styles/Projects.css';

export default function ProjectCard({ project, delay = 1 }) {
  const [ref, inView] = useInView(0.1);
  const { title, description, tags = [], link, githubLink, image, category, isLive } = project;

  return (
    <div ref={ref} className={`reveal-scale ${inView ? 'in-view' : ''} delay-${delay}`}>
      <article className="project-card">
        <div className="project-image-wrapper">
          <img src={image} alt={title} className="project-image" loading="lazy" />
          {category && (
            <span className={`project-category-badge ${category === 'Software' ? 'badge-software' : 'badge-english'}`}>
              {category === 'Software' ? 'Software' : 'English'}
            </span>
          )}
        </div>
        <div className="project-info">
          <h3 className="project-title">{title}</h3>
          <p className="project-description">{description}</p>

          <div className="project-tags">
            {tags.map((tag, idx) => (
              <span key={idx} className="project-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="project-links">
            {isLive === false ? (
              <a href={githubLink || link} target="_blank" rel="noopener noreferrer" className="project-link-btn repo-only-btn">
                Repository Only ↗
              </a>
            ) : (
              <>
                {link && (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="project-link-btn primary">
                    Live Demo
                  </a>
                )}
                {githubLink && (
                  <a href={githubLink} target="_blank" rel="noopener noreferrer" className="project-link-btn secondary">
                    GitHub
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
