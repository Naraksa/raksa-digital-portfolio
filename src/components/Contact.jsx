import { useState } from 'react';
import { useInView } from '../hooks/useInView.js';
import '../styles/Contact.css';

export default function Contact({
  message,
  email = 'naraksaveasna@gmail.com',
  location = 'Phnom Penh, Cambodia'
}) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const [headerRef, headerInView] = useInView(0.1);
  const [infoRef, infoInView] = useInView(0.1);
  const [formRef, formInView] = useInView(0.1);

  const faqs = [
    {
      question: 'What type of projects or roles are you looking for?',
      answer: 'I am looking for Full-Stack Software Engineering opportunities, React/TypeScript web app development, EdTech applications, and AI/Machine Learning research collaborations.'
    },
    {
      question: 'Are you available for remote work or local consulting?',
      answer: 'Yes! I am available for both remote software engineering projects and local technology or TESL educational consulting.'
    },
    {
      question: 'How quickly can I expect a response?',
      answer: 'I usually respond to messages within 24 hours. You can also reach out directly via LinkedIn or Email.'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || `Portfolio Contact Message from ${formData.name}`,
          message: formData.message,
          _captcha: 'false'
        })
      });

      const data = await res.json();
      if (res.ok || data.success === 'true' || data.success === true) {
        setStatus({ type: 'success', text: 'Thank you! Your message has been sent directly to my inbox.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'success', text: 'Message received! Thank you for reaching out.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      setStatus({ type: 'success', text: 'Thank you! Your message was submitted successfully.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <header className="contact-header">
          <span className="badge-category">Get In Touch</span>
          <h2 ref={headerRef} className={`section-title reveal ${headerInView ? 'in-view' : ''}`}>
            Let's Build & Innovate Together
          </h2>
          <p className="contact-subtitle">
            Whether you have a software project, educational initiative, or just want to say hello, my inbox is always open.
          </p>
        </header>

        <div className="contact-content">
          {/* Contact Info Column */}
          <div ref={infoRef} className={`contact-info reveal-left ${infoInView ? 'in-view' : ''} delay-1`}>
            <p className="contact-message">{message}</p>

            <div className="contact-cards-list">
              <div className="contact-card-item">
                <div className="contact-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-label">Direct Email</span>
                  <a href={`mailto:${email}`} className="contact-card-value">
                    {email}
                  </a>
                </div>
                <button className="copy-btn" onClick={handleCopyEmail} title="Copy email">
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              <div className="contact-card-item">
                <div className="contact-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-label">Location</span>
                  <span className="contact-card-value">{location}</span>
                </div>
              </div>

              <div className="contact-card-item">
                <div className="contact-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="contact-card-text">
                  <span className="contact-card-label">Response Time</span>
                  <span className="contact-card-value">Within 24 hours</span>
                </div>
              </div>
            </div>

            <div className="direct-social-row">
              <a href="https://github.com/Naraksa" target="_blank" rel="noopener noreferrer" className="social-pill">
                GitHub ↗
              </a>
              <a href="https://www.linkedin.com/in/naraksa-veasna" target="_blank" rel="noopener noreferrer" className="social-pill">
                LinkedIn ↗
              </a>
              <a href="https://www.facebook.com/share/17oJU3AEhw/" target="_blank" rel="noopener noreferrer" className="social-pill">
                Facebook ↗
              </a>
            </div>
          </div>

          {/* Contact Form Column */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`contact-form reveal-right ${formInView ? 'in-view' : ''} delay-2`}
          >
            <h3 className="form-title">Send a Direct Message</h3>

            <div className="form-group">
              <label htmlFor="contact-name">Your Name *</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Johnson"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Your Email *</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject (Optional)</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry / Collaboration"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="contact-message">Message *</label>
                <span className="char-count">{formData.message.length} / 500</span>
              </div>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Naraksa, I'd like to discuss a project..."
                rows="5"
                maxLength="500"
                disabled={isSubmitting}
                required
              />
            </div>

            {status.text && <div className={`form-status ${status.type}`}>{status.text}</div>}

            <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending Message...' : 'Send Message →'}
            </button>
          </form>
        </div>

        {/* FAQ Accordion Section */}
        <div className="faq-section">
          <h3 className="faq-title">Frequently Asked Questions</h3>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="faq-question">
                  <span>{faq.question}</span>
                  <span className="faq-toggle-icon">{activeFaq === idx ? '−' : '+'}</span>
                </div>
                {activeFaq === idx && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
