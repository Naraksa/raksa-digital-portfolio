import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView.js';
import Lightbox from './Lightbox.jsx';
import '../styles/Community.css';

// ─── Hero background images ───────────────────────────────────────────────────
import springHeroImg  from '../assets/Spring_Career_Village/spring career village (6).jpg';
import meetupHeroImg  from '../assets/Dmeetup/DigitalConMeetup.jpg';
import unitourHeroImg from '../assets/unitour/unitour.jpg';
import charityHeroImg from '../assets/charity/Charity.jpg';
import webinarHeroImg from '../assets/webinar/webinarr.jpg';
import gradHeroImg    from '../assets/personal/Spring Grad.JPG';

// ─── Spring Halloween ─────────────────────────────────────────────────────────
import hal1 from '../assets/Spring_Halloween/halloween.jpg';
import hal2 from '../assets/Spring_Halloween/halloween (2).jpg';
import hal3 from '../assets/Spring_Halloween/halloween (3).jpg';
import hal4 from '../assets/Spring_Halloween/halloween (4).jpg';
import hal5 from '../assets/Spring_Halloween/halloween (5).jpg';

// ─── Spring Career Village ────────────────────────────────────────────────────
import cv1 from '../assets/Spring_Career_Village/spring career village.jpg';
import cv2 from '../assets/Spring_Career_Village/spring career village (2).jpg';
import cv3 from '../assets/Spring_Career_Village/spring career village (3).jpg';
import cv4 from '../assets/Spring_Career_Village/spring career village (4).jpg';
import cv5 from '../assets/Spring_Career_Village/spring career village (5).jpg';
import cv6 from '../assets/Spring_Career_Village/spring career village (6).jpg';

// ─── Charity ──────────────────────────────────────────────────────────────────
import ch1 from '../assets/charity/Charity.jpg';
import ch2 from '../assets/charity/Charity (2).jpg';
import ch3 from '../assets/charity/Charity (3).jpg';
import ch4 from '../assets/charity/charity (4).jpg';
import ch5 from '../assets/charity/charity (5).jpg';
import ch6 from '../assets/charity/charity (6).jpg';
import ch7 from '../assets/charity/charity (7).jpg';

// ─── Digital Connect Meetup ───────────────────────────────────────────────────
import mu1 from '../assets/Dmeetup/DigitalConMeetup.jpg';
import mu2 from '../assets/Dmeetup/meetup.JPG';
import mu3 from '../assets/Dmeetup/meetup (2).JPG';
import mu4 from '../assets/Dmeetup/meetup (3).jpg';
import mu5 from '../assets/Dmeetup/meetup (4).jpg';
import mu6 from '../assets/Dmeetup/meetup (5).jpg';
import mu7 from '../assets/Dmeetup/meetup (6).jpg';
import mu8 from '../assets/Dmeetup/meetup (7).jpg';

// ─── Unitour ──────────────────────────────────────────────────────────────────
import ut1 from '../assets/unitour/unitour.jpg';
import ut2 from '../assets/unitour/unitour (2).jpg';
import ut3 from '../assets/unitour/unitour (3).jpg';
import ut4 from '../assets/unitour/unitour (4).jpg';

// ─── Webinar ──────────────────────────────────────────────────────────────────
import web1 from '../assets/webinar/webinarr.jpg';
import web2 from '../assets/webinar/webinarrr.jpg';

// ─── English Club ─────────────────────────────────────────────────────────────
import eng1 from '../assets/english club/englishclub.jpg';
import eng2 from '../assets/english club/englishclub (2).jpg';
import eng3 from '../assets/english club/englishclub (3).jpg';
import eng4 from '../assets/english club/englishclub (4).jpg';

// ─── Meet & Greet ─────────────────────────────────────────────────────────────
import mg1 from '../assets/meet&greet/meetandgreet.jpg';
import mg2 from '../assets/meet&greet/meetandgreeet.jpg';
import mg3 from '../assets/meet&greet/meetandgreet (2).jpg';

// ─── Plant Fair ───────────────────────────────────────────────────────────────
import pf1 from '../assets/plantfair/plantfair.jpg';
import pf2 from '../assets/plantfair/plantfair (2).jpg';
import pf3 from '../assets/plantfair/plantfair (3).jpg';
import pf4 from '../assets/plantfair/plantfair (4).jpg';


function ActivitySlideshow({ images = [], title = '', onPhotoClick }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="layout-slideshow-container" onClick={() => onPhotoClick && onPhotoClick(activeIdx)}>
      {images.map((imgSrc, idx) => (
        <div key={idx} className={`slideshow-slide ${idx === activeIdx ? 'active' : ''}`}>
          <img src={imgSrc} alt={`${title} slide ${idx + 1}`} loading="lazy" />
          <div className="slideshow-overlay-info">
            <span>Click to browse full gallery • Photo {idx + 1} of {images.length}</span>
          </div>
        </div>
      ))}
      <div className="slideshow-dots">
        {images.map((_, idx) => (
          <span key={idx} className={`slideshow-dot ${idx === activeIdx ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
}

function CommunityActivityCard({ activity, index, onPhotoClick }) {
  const [ref, inView] = useInView(0.15);
  return (
    <section
      ref={ref}
      className={`community-project-section ${index % 2 === 0 ? 'photo-left' : 'photo-right'} ${inView ? 'in-view' : ''}`}
    >
      <div className="community-section-row">
        <div className="column-photo-collage">
          <ActivitySlideshow images={activity.images} title={activity.title} onPhotoClick={onPhotoClick} />
        </div>
        <div className="column-text-details">
          <span className="duration-tag">{activity.duration}</span>
          <h3 className="project-role">{activity.title}</h3>
          <h4 className="project-org">{activity.role}</h4>
          <p className="project-description">{activity.description}</p>
          {activity.achievements && activity.achievements.length > 0 && (
            <ul className="achievements-list">
              {activity.achievements.map((ach, idx) => (
                <li key={idx} className="achievement-item">
                  <span className="achievement-text">{ach}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Community() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (imgs, idx) => {
    setLightboxImages(imgs);
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const heroSlides = [
    { image: springHeroImg, title: 'Passion in Community Service', caption: 'Leading with empathy and commitment to create educational and technological opportunities.' },
    { image: meetupHeroImg, title: 'Bridging the Tech Community', caption: 'Fostering environments of collaboration, learning, and growth for young developers.' },
    { image: unitourHeroImg, title: 'Empowering Student Success', caption: 'Touring universities to guide peers and inspire next-generation leaders.' },
    { image: charityHeroImg, title: 'Supporting Rural Education', caption: 'Raising educational supplies and funds to make quality learning accessible to children.' },
    { image: webinarHeroImg, title: 'Connecting through Tech & Design', caption: 'Hosting educational webinars, mentoring students, and discussing technical career pathways.' },
    { image: gradHeroImg, title: 'Celebrating Academic Milestones', caption: 'Connecting scholarship, academic excellence, and volunteerism for holistic leadership.' }
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, heroSlides.length]);

  const handlePrev = () => {
    setAutoPlay(false);
    setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const springActivities = [
    {
      id: 'spring-halloween',
      title: 'Spring Halloween',
      role: 'Event Organizer',
      duration: 'October 2024',
      description: 'Led the organization of a spooky, high-energy Halloween community gathering for students. Coordinated thematic stage decoration, creative costume showcases, games, and entertainment programs, fostering community connection and cultural engagement.',
      achievements: [
        'Spearheaded the event design and setup for student attendees.',
        'Organized a successful costume contest and interactive team bonding activities.',
        'Engage with a team of volunteers to coordinate overall flow of the event.'
      ],
      images: [hal1, hal2, hal3, hal4, hal5]
    },
    {
      id: 'spring-career-village',
      title: 'Spring Career Village',
      role: 'Event Organizer',
      duration: 'January 2025',
      description: 'Coordinated and facilitated a massive career exhibition event showcasing professional booths, networking panels, and industry connection zones. Designed to guide students in seeking internships, exploring careers, and connecting with partner companies.',
      achievements: [
        'Managed booth allocations and logistics for multiple corporate and student exhibitors.',
        'Coordinate and manage walk-in interview participants.',
        'Led a team of volunteers to ensure engagement in the event.'
      ],
      images: [cv1, cv2, cv3, cv4, cv5, cv6]
    },
    {
      id: 'spring-charity-2',
      title: 'Spring Hope 2.0',
      role: 'Event Organizer',
      duration: 'March 2025',
      description: 'Managed a high-impact charity campaign aimed at raising educational funds for children in rural areas. Handled logistics, donor engagement, and distribution of school supplies, directly supporting educational access for children in need.',
      achievements: [
        'Raised over $3,000 in educational funds through community contributions and donor outreach.',
        'Coordinated the packing and direct distribution of primary school supply kits.',
        'Manage technical support for the event.'
      ],
      images: [ch1, ch2, ch3, ch4, ch5, ch6, ch7]
    }
  ];

  const bamnangActivities = [
    {
      id: 'digital-connect-meetup',
      title: 'Digital Connect Meet Up',
      role: 'Event Organizer',
      duration: 'Aug 2025 - Nov 2025',
      description: 'Co-hosted Digital Connect Meet Ups as part of the Bamnang Fellowship to build community and share tech opportunities.',
      achievements: [
        'Co-host 6 Digital Connect Meet Up sessions with honored guest from the tech industry.',
        'Coordinated event schedules, logistics, and guest speaker invitations.',
        'Facilitated group work sessions focusing on software project collaboration.'
      ],
      images: [mu1, mu2, mu3, mu4, mu5, mu6, mu7, mu8]
    },
    {
      id: 'digital-connect-unitour',
      title: 'Digital Connect University Tour',
      role: 'Presenter & Event Organizer',
      duration: 'Dec 2025 - Jan 2026',
      description: 'Participated in university tour programs co-hosted under the Bamnang Fellowship, reaching university students across 3 Universities, including AUPP, Paragon, and CADT.',
      achievements: [
        'Co-host 3 University Tours spreading awareness of Digital Community of Cambodia (DCC)',
        'Engaged directly with students in Q&A session regarding Bamnang Company, and DCC'
      ],
      images: [ut1, ut2, ut3, ut4]
    },
    {
      id: 'digital-connect-webinar',
      title: 'Digital Connect Webinar',
      role: 'Webinar Host & Moderator',
      duration: 'Jan 2026 - Feb 2026',
      description: 'Organized and moderated educational webinars to share tech workflows and trending tech skills. Honored guests are professors and tech experts',
      achievements: [
        'Co-host 10 Webinars, gaining more than 100+ audience.',
        'Coordinated technical setup, speaker alignments, and marketing campaigns.',
        'Moderated discussion panels and Q&A sessions with online audiences.'
      ],
      images: [web1, web2]
    }
  ];

  const otherActivities = [
    {
      id: 'bamnang-english-club',
      title: 'Bamnang English Club Leader',
      role: 'English Club Leader & Tutor',
      duration: 'Oct 2025 - Nov 2025',
      description: 'Lead club learning activities by designing lesson plans and materials, providing weekend tutoring on essential English macro skills.',
      achievements: [
        'Lead club learning activities by designing lesson plans and materials.',
        'Weekend tutoring on essential English macro skills.'
      ],
      images: [eng1, eng2, eng3, eng4]
    },
    {
      id: 'logistic-team-lead',
      title: 'Team Lead Logistic, Meet and Greet with Mony',
      role: 'Logistics Team Leader',
      duration: 'Oct 2025',
      description: 'Assist in developing a part of project structure in logistics, ensuring smooth support and successfully leading the team.',
      achievements: [
        'Assist in developing a part of project structure in logistics.',
        'Ensure smooth logistics support.',
        'Successfully leading logistics team under fruitful guidelines from project lead.'
      ],
      images: [mg1, mg2, mg3]
    },
    {
      id: 'plant-fair-support',
      title: 'Event Support',
      role: 'Phnom Penh 3rd Plant Fair Support',
      duration: 'July 2024',
      description: 'Ensured accurate number of participants and provided flexible events assistance and a warm welcoming environment.',
      achievements: [
        'Ensure accurate number of participants for the whole 3-day events.',
        'Flexible events assistance and ensure a warm welcoming for participants.'
      ],
      images: [pf1, pf2, pf3, pf4]
    }
  ];

  const row1Photos = [ut1, ut2, ut3, mu1, mu2, mu3, ch1, ch2, ch3, hal1, hal2, hal3];
  const row2Photos = [cv1, cv2, cv3, eng1, eng2, mg1, mg2, pf1, pf2, web1, web2];

  return (
    <div className="community-page">
      {/* Community Hero Slider */}
      <section className="community-hero-slider" aria-label="Community Service Slideshow">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-slide-bg ${idx === heroIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url("${slide.image}")` }}
          />
        ))}
        <div className="hero-slider-overlay" />
        <div className="hero-slider-content-container">
          <div className="hero-slider-card">
            <span className="hero-badge-tag">Community & Leadership</span>
            <h1 className="hero-title">{heroSlides[heroIndex].title}</h1>
            <p className="hero-subtitle">{heroSlides[heroIndex].caption}</p>
            <div className="hero-actions">
              <button onClick={scrollToSection('spring-ambassador')} className="btn btn-primary">
                View Student Ambassador Work
              </button>
              <button onClick={scrollToSection('bamnang-fellowship')} className="btn btn-secondary">
                View Fellowship Work
              </button>
            </div>
          </div>
        </div>

        <button className="slider-arrow arrow-left" onClick={handlePrev} aria-label="Previous Slide">
          ❮
        </button>
        <button className="slider-arrow arrow-right" onClick={handleNext} aria-label="Next Slide">
          ❯
        </button>

        <div className="slider-dots">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${idx === heroIndex ? 'active' : ''}`}
              onClick={() => { setAutoPlay(false); setHeroIndex(idx); }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Main Community Content */}
      <div className="community-sections-container">
        {/* Spring Ambassador Section */}
        <section id="spring-ambassador" className="role-header-section">
          <div className="role-header-inner">
            <div className="role-top-badge">LEADERSHIP PROFILE</div>
            <h2 className="role-title-main">Spring Student Ambassador</h2>
            <p className="role-description-lead">
              Serving as the Leader of the <strong>Spring Share</strong> department, focusing on content creation, marketing strategies, team management, and student engagement workshops.
            </p>
            <div className="role-accent-bar" />
          </div>
        </section>
        {springActivities.map((act, idx) => (
          <CommunityActivityCard
            key={act.id}
            activity={act}
            index={idx}
            onPhotoClick={(photoIdx) => openLightbox(act.images, photoIdx)}
          />
        ))}

        {/* Bamnang Fellowship Section */}
        <section id="bamnang-fellowship" className="role-header-section margin-top-lg">
          <div className="role-header-inner">
            <div className="role-top-badge gold">DIGITAL INITIATIVE</div>
            <h2 className="role-title-main">Bamnang Fellowship</h2>
            <p className="role-description-lead">
              Contributing to Cambodia's digital ecosystem through active leadership, student university tours, educational webinars, and networking meetups.
            </p>
            <div className="role-accent-bar gold" />
          </div>
        </section>
        {bamnangActivities.map((act, idx) => (
          <CommunityActivityCard
            key={act.id}
            activity={act}
            index={idx + 1}
            onPhotoClick={(photoIdx) => openLightbox(act.images, photoIdx)}
          />
        ))}

        {/* Other Contributions Section */}
        <section id="other-contributions" className="role-header-section margin-top-lg">
          <div className="role-header-inner">
            <div className="role-top-badge purple">VOLUNTEER & COMMUNITY LEADERSHIP</div>
            <h2 className="role-title-main">Other Community Contributions</h2>
            <p className="role-description-lead">
              Engaging in diverse volunteer initiatives and community leadership.
            </p>
            <div className="role-accent-bar purple" />
          </div>
        </section>
        {otherActivities.map((act, idx) => (
          <CommunityActivityCard
            key={act.id}
            activity={act}
            index={idx}
            onPhotoClick={(photoIdx) => openLightbox(act.images, photoIdx)}
          />
        ))}

        {/* Infinite Scrolling Community Engagement Strip */}
        <section className="community-engagement-strip-section">
          <div className="ces-header">
            <h2 className="ces-title">Community Engagement</h2>
            <p className="ces-subtitle">
              A glimpse into the moments that define a life of purposeful service — events, people, and memories that matter.
            </p>
          </div>

          <div className="ces-track-wrapper">
            <div className="ces-track ces-track--ltr">
              {[...row1Photos, ...row1Photos].map((imgSrc, idx) => (
                <div key={`row1-${idx}`} className="ces-photo">
                  <img src={imgSrc} alt={`community moment ${idx + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="ces-track-wrapper">
            <div className="ces-track ces-track--rtl">
              {[...row2Photos, ...row2Photos].map((imgSrc, idx) => (
                <div key={`row2-${idx}`} className="ces-photo">
                  <img src={imgSrc} alt={`community moment ${idx + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Thoughts Section */}
        <section className="community-final-thoughts">
          <div className="final-thoughts-inner">
            <div className="heart-icon">✦</div>
            <h2 className="final-thoughts-title">You Don't Need More Time. You Need One Small Yes.</h2>
            <p className="final-thoughts-text">
              I'm currently chasing two university degrees, building software, running club sessions, and somehow showing up to events on weekends. If you're waiting until life gets quieter to start giving back — that day might never come.
              <br /><br />
              Community service doesn't ask you to be free. It asks you to be present — even briefly, even imperfectly. It's not about how much time you have. It's about what you choose to do with the time you give. One hour of tutoring. One event you showed up to. One person who learned something new because you were there.
              <br /><br />
              <em>That ripple doesn't need your whole schedule. It just needs you to start.</em>
              <br /><br />
              Whether you're a student, a professional, or someone figuring it all out — there's a community somewhere that could use your hands, your voice, or just your presence. Busy is not an excuse. Busy is just the story we're all living. The question is: what story do you want to be part of?
            </p>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <Lightbox images={lightboxImages} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}
