import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blog.css';

const categories = ['All', 'Software', 'Education & TESL', 'AI & Data Science', 'Leadership'];

export default function Blog({ blogItems = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const items = (Array.isArray(blogItems) ? blogItems : []).filter((item) => {
    if (!item) return false;
    const itemCat = item.category || 'General';
    const matchesCat = activeCategory === 'All' || itemCat === activeCategory;
    const title = (item.title || '').toLowerCase();
    const summary = (item.summary || '').toLowerCase();
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch = query === '' || title.includes(query) || summary.includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <header className="blog-header">
          <span className="badge-category">Articles & Publications</span>
          <h2 className="section-title">My Blog & Publications</h2>
          <p className="blog-subtitle">
            Thoughts on software architecture, English language education, artificial intelligence, and youth leadership.
          </p>
        </header>

        <div className="blog-controls">
          <div className="blog-search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search articles by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="blog-search-input"
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                ×
              </button>
            )}
          </div>

          <div className="category-filters">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-grid">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <article key={item.id || idx} className="blog-card">
                <div className="blog-card-meta">
                  <span className="blog-card-category">{item.category || 'General'}</span>
                  <span className="blog-card-readtime">{item.readTime || '3 min read'}</span>
                </div>
                <h3 className="blog-card-title">{item.title}</h3>
                <p className="blog-card-summary">{item.summary}</p>
                <div className="blog-card-footer">
                  <span className="blog-card-date">{item.date}</span>
                </div>
              </article>
            ))
          ) : (
            <div className="blog-placeholder-card">
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
                Articles on modern web development, ESL teaching methodologies, artificial intelligence, and leadership experiences are currently being written and will be published here shortly. Stay tuned!
              </p>
              <div className="placeholder-actions">
                <Link to="/projects" className="btn btn-primary">
                  Explore Featured Projects
                </Link>
                <Link to="/" className="btn btn-secondary">
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
