import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData.js';
import { useInView } from '../hooks/useInView.js';
import '../styles/Hero.css';

const EDGE_THRESHOLD = 0.12; // Outer 12% of screen triggers swap hint
const MAX_TILT_X = 4;        // Soft 4deg vertical tilt
const MAX_TILT_Y = 6;        // Soft 6deg horizontal tilt

export default function Hero({ major = 'software', onSwap }) {
  const [heroMajor, setHeroMajor] = useState(major);
  const [isSwapping, setIsSwapping] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const leftHintRef = useRef(null);
  const rightHintRef = useRef(null);
  const swapTimerRef = useRef(null);
  const endSwapTimerRef = useRef(null);

  const [featuredRef, featuredInView] = useInView(0.1);

  const activeMajor = onSwap ? major : heroMajor;
  const activeData = portfolioData[activeMajor] || portfolioData.software;
  const { bio, projects } = activeData;
  const { name, title, subtitle, avatarUrl, roles, gallery } = bio;

  const [roleIndex, setRoleIndex] = useState(0);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const rolesList = roles && roles.length > 0 ? roles : [title];
  const photoList = gallery && gallery.length > 0 ? gallery : [avatarUrl];

  // Auto-rotate role text
  useEffect(() => {
    const list = roles && roles.length > 0 ? roles : [title];
    if (list.length <= 1) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % list.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles, title]);

  useEffect(() => {
    return () => {
      if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
      if (endSwapTimerRef.current) clearTimeout(endSwapTimerRef.current);
    };
  }, []);

  // ─── Subtle Gentle 3D Tilt ──────────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    if (isSwapping) return;
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const sectionRect = section.getBoundingClientRect();
    const xRatio = (e.clientX - sectionRect.left) / sectionRect.width;
    const yRatio = (e.clientY - sectionRect.top) / sectionRect.height;

    // Gentle 3D tilt
    const rotateX = ((yRatio - 0.5) * -MAX_TILT_X).toFixed(2);
    const rotateY = ((xRatio - 0.5) * MAX_TILT_Y).toFixed(2);

    container.style.transition = 'transform 0.12s ease-out';
    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Edge hint trigger (outer 12% of hero section)
    const leftZone  = xRatio < EDGE_THRESHOLD;
    const rightZone = xRatio > 1 - EDGE_THRESHOLD;

    if (leftHintRef.current)  leftHintRef.current.classList.toggle('visible', leftZone);
    if (rightHintRef.current) rightHintRef.current.classList.toggle('visible', rightZone);
  }, [isSwapping]);

  const handleMouseLeave = useCallback(() => {
    if (isSwapping) return;
    const container = containerRef.current;
    if (container) {
      container.style.transition = 'transform 0.5s ease-out, opacity 0.3s ease';
      container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      container.style.opacity = '1';
    }
    if (leftHintRef.current)  leftHintRef.current.classList.remove('visible');
    if (rightHintRef.current) rightHintRef.current.classList.remove('visible');
  }, [isSwapping]);

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (photoList.length <= 1) return;
    setActivePhotoIdx((prev) => (prev + 1) % photoList.length);
  };

  // ─── Silky Smooth 60fps 3D Card Flip Animation ─────────────────────────
  const triggerSwap = useCallback(() => {
    if (isSwapping) return;
    setIsSwapping(true);

    const container = containerRef.current;

    // Phase 1: Rotate away to 90deg and fade out (220ms)
    if (container) {
      container.style.transition = 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.22s ease';
      container.style.transform = 'perspective(1000px) rotateY(90deg) scale(0.95)';
      container.style.opacity = '0';
    }

    // Phase 2: Swap content while invisible, then rotate back from -90deg to 0deg (280ms)
    swapTimerRef.current = setTimeout(() => {
      if (onSwap) {
        onSwap();
      } else {
        setHeroMajor((prev) => (prev === 'software' ? 'english' : 'software'));
      }

      if (container) {
        container.style.transition = 'none';
        container.style.transform = 'perspective(1000px) rotateY(-90deg) scale(0.95)';
        // Force reflow
        void container.offsetWidth;
        container.style.transition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease';
        container.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
        container.style.opacity = '1';
      }
    }, 220);

    endSwapTimerRef.current = setTimeout(() => {
      setIsSwapping(false);
    }, 520);
  }, [isSwapping, onSwap]);

  const handleClick = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    if (xRatio < EDGE_THRESHOLD || xRatio > 1 - EDGE_THRESHOLD) {
      e.preventDefault();
      triggerSwap();
    }
  }, [triggerSwap]);

  return (
    <>
      <section
        id="hero"
        className={`hero-section ${activeMajor === 'english' ? 'hero-theme-english' : 'hero-theme-software'}`}
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        aria-label="Hero section — gentle 3D tilt, hover outer edges to switch degree profile"
      >
        {/* Deep ambient background aura */}
        <div className="hero-bg" aria-hidden="true" />

        {/* Top Center Profile Pill */}
        <div
          className="top-profile-pill"
          onClick={(e) => { e.stopPropagation(); triggerSwap(); }}
          title="Click to switch degree profile"
        >
          <span className="pill-dot" />
          <span className="pill-title">
            {activeMajor === 'software' ? 'Software Development' : 'English Education (TESL)'}
          </span>
          <span className="pill-divider">|</span>
          <span className="pill-hint">Click edge to switch degree</span>
        </div>

        {/* Left Vertical Edge Swap Indicator (Fixed to outer left screen edge) */}
        <div
          ref={leftHintRef}
          className="edge-hint edge-hint--left"
          onClick={(e) => { e.stopPropagation(); triggerSwap(); }}
          title="Click to swap profile"
        >
          <span className="edge-arrow">‹</span>
          <span className="edge-text">SWAP PROFILE</span>
        </div>

        {/* Right Vertical Edge Swap Indicator (Fixed to outer right screen edge) */}
        <div
          ref={rightHintRef}
          className="edge-hint edge-hint--right"
          onClick={(e) => { e.stopPropagation(); triggerSwap(); }}
          title="Click to swap profile"
        >
          <span className="edge-arrow">›</span>
          <span className="edge-text">SWAP PROFILE</span>
        </div>

        {/* Hero Content Container */}
        <div ref={containerRef} className="hero-container">
          <div className="hero-grid">
            {/* Text Column */}
            <div className="hero-text-col">
              <h1 className="hero-name-heading">{name}</h1>

              <div className="dynamic-role-wrapper" aria-live="polite">
                <span key={roleIndex} className="dynamic-role">
                  {rolesList[roleIndex]}
                </span>
                <span className="typing-cursor">|</span>
              </div>

              <p className="hero-subtitle">{subtitle}</p>
              <p className="hero-tagline-uppercase">BUILD. LEAD. LEARN.</p>

              <div className="hero-actions">
                <Link to="/projects" className="btn btn-primary glow-btn">
                  Explore Featured Work
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Get In Touch
                </Link>
              </div>

              <div className="hero-meta">
                <span className="meta-item">Phnom Penh, Cambodia</span>
                <span className="meta-dot">•</span>
                <span className="meta-item">Dual-Degree Undergraduate</span>
              </div>
            </div>

            {/* Visual Column */}
            <div className="hero-visual-col">
              <div className="photo-card-stack" onClick={handleNextPhoto} title="Click to shift picture card">
                {photoList.map((imgSrc, idx) => {
                  const depth = (idx - activePhotoIdx + photoList.length) % photoList.length;
                  return (
                    <div
                      key={idx}
                      className={`photo-card photo-card--depth-${depth}`}
                      style={{ zIndex: photoList.length - depth }}
                    >
                      <div className="card-image-wrapper">
                        <img src={imgSrc} alt={`${name} gallery ${idx + 1}`} className="stack-image" />
                        <div className="card-overlay-gradient" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="stack-hint">Click photo to shuffle</p>
            </div>
          </div>
        </div>

        {/* Floating PDF Resume Badge */}
        <div className="floating-pdf-btn" title="Download Resume / Credentials">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M12 18v-6" />
            <path d="M9 15l3 3 3-3" />
          </svg>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="featured-work" className="featured-work-section" ref={featuredRef}>
        <div className="featured-container">
          <div className={`featured-header ${featuredInView ? 'in-view' : ''}`}>
            <h2 className="section-title">
              Recent Work & <span className="highlight-text">Innovations</span>
            </h2>
            <p className="section-desc">
              Here is a curated selection of recent projects showcasing my work in{' '}
              {activeMajor === 'software'
                ? 'intelligent software solutions, artificial intelligence, and web architecture'
                : 'English language education, youth leadership, and digital content'}
              .
            </p>
          </div>

          <div className="featured-grid">
            {(projects || []).slice(0, 4).map((project, idx) => (
              <div key={project.id || idx} className={`featured-card ${featuredInView ? 'in-view' : ''}`}>
                <div className="featured-card-image-wrap">
                  <img src={project.image} alt={project.title} className="featured-card-img" />
                  <div className="featured-card-overlay" />
                  <span className="featured-card-category">{project.category || 'Featured'}</span>
                </div>
                <div className="featured-card-body">
                  <h3 className="featured-card-title">{project.title}</h3>
                  <p className="featured-card-desc">{project.description}</p>
                  {project.tags && (
                    <div className="featured-tags">
                      {project.tags.slice(0, 4).map((tag, tIdx) => (
                        <span key={tIdx} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="featured-card-links">
                    {project.isLive === false ? (
                      <a href={project.githubLink || project.link} target="_blank" rel="noopener noreferrer" className="card-link repo-only-link">
                        Repository Only ↗
                      </a>
                    ) : (
                      <>
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="card-link primary-link">
                            Live Demo ↗
                          </a>
                        )}
                        {project.githubLink && (
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="card-link github-link">
                            GitHub
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`featured-footer ${featuredInView ? 'in-view' : ''}`}>
            <Link to="/projects" className="btn btn-primary">
              View All Projects ({projects ? projects.length : 0})
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
