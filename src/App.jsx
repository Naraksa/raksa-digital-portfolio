import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Blog from './components/Blog.jsx';
import Community from './components/Community.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { portfolioData } from './data/portfolioData.js';
import logoImg from './assets/logo/Raksa_transparent.png';
import './index.css';

function renderHeaderSocialIcon(icon) {
  switch (icon.toLowerCase()) {
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
          />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
          />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return null;
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes({ activeMajor, onSwapMajor, about, allProjects, community, contact, allBlog }) {
  const location = useLocation();
  return (
    <div className="page-transition">
      <ScrollToTop />
      <Routes location={location}>
        <Route
          path="/"
          element={
            <ErrorBoundary sectionName="Hero Section">
              <Hero major={activeMajor} onSwap={onSwapMajor} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/about"
          element={
            <ErrorBoundary sectionName="About Section">
              <About />
            </ErrorBoundary>
          }
        />
        <Route
          path="/projects"
          element={
            <ErrorBoundary sectionName="Projects Section">
              <Projects projects={allProjects} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/blog"
          element={
            <ErrorBoundary sectionName="Blog Section">
              <Blog blogItems={allBlog} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/community"
          element={
            <ErrorBoundary sectionName="Community Section">
              <Community experiences={community} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/contact"
          element={
            <ErrorBoundary sectionName="Contact Section">
              <Contact message={contact.message} email={contact.email} location={contact.location} />
            </ErrorBoundary>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  const [activeMajor, setActiveMajor] = useState('software');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSwapMajor = () => {
    setActiveMajor((prev) => (prev === 'software' ? 'english' : 'software'));
  };

  const { bio, about, contact, community } = portfolioData[activeMajor];
  const allProjects = [...portfolioData.software.projects, ...portfolioData.english.projects];
  const allCommunity = [...portfolioData.software.community, ...portfolioData.english.community];
  const allBlog = [...(portfolioData.software.blog || []), ...(portfolioData.english.blog || [])];

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <Router>
      <div className={`app-container theme-${activeMajor}`}>
        {/* Navigation Bar */}
        <header className="navbar">
          <nav className="nav-container" aria-label="Main Navigation">
            <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
              <img src={logoImg} alt="Raksa Logo" className="nav-logo-img" />
            </Link>

            <button
              className="menu-toggle"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>

            <div className={`mobile-backdrop ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu} />

            <div className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
              <ul className="nav-links">
                <li style={{ '--i': 1 }}>
                  <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                    <span>Home</span>
                  </NavLink>
                </li>
                <li style={{ '--i': 2 }}>
                  <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                    <span>About</span>
                  </NavLink>
                </li>
                <li style={{ '--i': 3 }}>
                  <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                    <span>Projects</span>
                  </NavLink>
                </li>
                <li style={{ '--i': 4 }}>
                  <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                    <span>Blog</span>
                  </NavLink>
                </li>
                <li style={{ '--i': 5 }}>
                  <NavLink to="/community" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                    <span>Community</span>
                  </NavLink>
                </li>
                <li style={{ '--i': 6 }}>
                  <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                    <span>Contact</span>
                  </NavLink>
                </li>
              </ul>

              <div className="mobile-menu-footer">
                <div className="mobile-socials">
                  {bio.socialLinks.slice(0, 3).map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="header-social-btn"
                      aria-label={link.name}
                    >
                      {renderHeaderSocialIcon(link.icon)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="nav-right">
              <div className="header-socials">
                {bio.socialLinks.slice(0, 3).map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header-social-btn"
                    aria-label={link.name}
                  >
                    {renderHeaderSocialIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </header>

        {/* Main Route Content */}
        <main style={{ flex: '1 0 auto' }}>
          <AppRoutes activeMajor={activeMajor} onSwapMajor={handleSwapMajor} about={about} allProjects={allProjects} community={allCommunity} contact={contact} allBlog={allBlog} />
        </main>

        {/* Global Footer */}
        <Footer name={bio.name} socialLinks={bio.socialLinks} />
      </div>
    </Router>
  );
}
