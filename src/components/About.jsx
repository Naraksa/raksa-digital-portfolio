import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView.js';
import Lightbox from './Lightbox.jsx';
import '../styles/About.css';

// ─── Personal & Graduation ───────────────────────────────────────────────────
import profPhoto         from '../assets/personal/ProfPhoto.jpg';
import memPhoto          from '../assets/personal/IMG_20260618_202919_875.JPG';
import springGradPhoto   from '../assets/personal/Spring Grad.JPG';
import springGrad2       from '../assets/personal/Spring Grad (2).JPG';
import springGrad1       from '../assets/personal/springgrad.JPG';
import personalPhoto     from '../assets/personal/personalphoto.JPG';

// ─── Certificates ─────────────────────────────────────────────────────────────
import awsCert           from '../assets/certificate/aws_cloud_foundation.png';
import aiCert            from '../assets/certificate/Coursera_20Artificial_20Intelligence_20Essentials_20V2.png';
import advReactCert      from '../assets/certificate/advancedReact.jpeg';
import frontendTsCert    from '../assets/certificate/FrontendTS.jpeg';
import advTsCert         from '../assets/certificate/advancedTS.jpeg';
import jsCert            from '../assets/certificate/JS.jpeg';
import uxuiCert          from '../assets/certificate/UXUI.jpeg';
import dataCert          from '../assets/certificate/datascience.jpeg';
import htmlcssCert       from '../assets/certificate/htmlcss.jpeg';
import introFrontendCert from '../assets/certificate/introtofrontend.jpeg';
import mobileCert        from '../assets/certificate/mobiledev.jpeg';
import pythonCert        from '../assets/certificate/python.jpeg';
import gitCert           from '../assets/certificate/versionControl.jpeg';

// ─── AUPP ─────────────────────────────────────────────────────────────────────
import aupp1             from '../assets/Aupp/aupp.jpg';
import aupp2             from '../assets/Aupp/aupp (2).jpg';
import aupp3             from '../assets/Aupp/aupp (3).jpg';
import aupp4             from '../assets/Aupp/aupp (4).jpg';
import aupp5             from '../assets/Aupp/aupp (5).jpg';

// ─── IFL ──────────────────────────────────────────────────────────────────────
import ifl1              from '../assets/IFL/ifl.jpg';
import ifl2              from '../assets/IFL/ifl (2).jpg';
import ifl3              from '../assets/IFL/ifl (3).jpg';
import ifl4              from '../assets/IFL/ifl (4).jpg';
import ifl5              from '../assets/IFL/ifl (5).jpg';
import ifl6              from '../assets/IFL/ifl (6).jpg';
import ifl7              from '../assets/IFL/ifl (7).jpg';
import ifl8              from '../assets/IFL/ifl (8).jpg';

// ─── Highschool ───────────────────────────────────────────────────────────────
import hs1               from '../assets/Highschool/hs.jpg';
import hs2               from '../assets/Highschool/hs (2).jpg';
import hs3               from '../assets/Highschool/hs (3).jpg';
import hs4               from '../assets/Highschool/hs (4).jpg';
import hs5               from '../assets/Highschool/hs (5).jpg';
import hs6               from '../assets/Highschool/hs (6).jpg';

// ─── Spring Career Village ────────────────────────────────────────────────────
import spring1           from '../assets/Spring_Career_Village/spring career village.jpg';
import spring2           from '../assets/Spring_Career_Village/spring career village (2).jpg';
import spring3           from '../assets/Spring_Career_Village/spring career village (3).jpg';
import spring4           from '../assets/Spring_Career_Village/spring career village (4).jpg';
import spring5           from '../assets/Spring_Career_Village/spring career village (5).jpg';
import spring6           from '../assets/Spring_Career_Village/spring career village (6).jpg';

// ─── Spring Halloween ─────────────────────────────────────────────────────────
import hw1               from '../assets/Spring_Halloween/halloween.jpg';
import hw2               from '../assets/Spring_Halloween/halloween (2).jpg';
import hw3               from '../assets/Spring_Halloween/halloween (3).jpg';
import hw4               from '../assets/Spring_Halloween/halloween (4).jpg';
import hw5               from '../assets/Spring_Halloween/halloween (5).jpg';

function AboutSlideshow({ images = [], title = '', onPhotoClick }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="about-slideshow-container" onClick={() => onPhotoClick && onPhotoClick(activeIdx)}>
      {images.map((imgSrc, idx) => (
        <div key={idx} className={`about-slide ${idx === activeIdx ? 'active' : ''}`}>
          <img src={imgSrc} alt={`${title} slide ${idx + 1}`} loading="lazy" />
          <div className="about-slideshow-overlay">
            <span>Click to browse full gallery — Photo {idx + 1} of {images.length}</span>
          </div>
        </div>
      ))}
      <div className="about-slideshow-dots">
        {images.map((_, idx) => (
          <span key={idx} className={`about-dot ${idx === activeIdx ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const [mainRef, mainInView] = useInView(0.1);
  const [edu1Ref, edu1InView] = useInView(0.1);
  const [edu2Ref, edu2InView] = useInView(0.1);
  const [schRef, schInView] = useInView(0.1);
  const [dualRef, dualInView] = useInView(0.1);
  const [skillsRef, skillsInView] = useInView(0.1);
  const [auppRef, auppInView] = useInView(0.1);
  const [iflRef, iflInView] = useInView(0.1);
  const [factsRef, factsInView] = useInView(0.1);
  const [certRef, certInView] = useInView(0.1);
  const [visionRef, visionInView] = useInView(0.1);

  const programmingSkillsData = [
    { name: 'PYTHON', level: '90%', value: 90, gradient: 'gradient-cyan' },
    { name: 'JAVASCRIPT', level: '90%', value: 90, gradient: 'gradient-gold' },
    { name: 'REACT', level: '90%', value: 90, gradient: 'gradient-cyan' },
    { name: 'TYPESCRIPT', level: '70%', value: 70, gradient: 'gradient-yellow' },
    { name: 'HTML & CSS', level: '95%', value: 95, gradient: 'gradient-magenta' },
    { name: 'JAVA', level: '60%', value: 60, gradient: 'gradient-orange' },
    { name: 'GIT & GITHUB', level: '85%', value: 85, gradient: 'gradient-gold' },
    { name: 'FIGMA', level: '75%', value: 75, gradient: 'gradient-pink' }
  ];

  const englishSkillsData = [
    { name: 'READING', level: 'B2', value: 75, gradient: 'gradient-magenta' },
    { name: 'WRITING', level: 'B2', value: 75, gradient: 'gradient-magenta' },
    { name: 'LISTENING', level: 'B2', value: 75, gradient: 'gradient-magenta' },
    { name: 'SPEAKING', level: 'B2', value: 75, gradient: 'gradient-magenta' },
    { name: 'VOCABULARY', level: 'B2', value: 75, gradient: 'gradient-magenta' },
    { name: 'GRAMMAR', level: 'B2', value: 75, gradient: 'gradient-magenta' }
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Accordion state for university skills
  const [expandedSkill, setExpandedSkill] = useState(null);

  const toggleSkill = (id) => {
    setExpandedSkill((prev) => (prev === id ? null : id));
  };

  const openLightbox = (imgs, idx) => {
    setLightboxImages(imgs);
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const lifeSnaps = [
    { url: aupp1, alt: 'Collaborating at AUPP' },
    { url: aupp2, alt: 'Life at AUPP campus' },
    { url: ifl1, alt: 'Institute of Foreign Languages' },
    { url: ifl2, alt: 'IFL campus moments' },
    { url: memPhoto, alt: 'A memorable day' },
    { url: aupp3, alt: 'AUPP community gathering' },
    { url: springGrad1, alt: 'Graduation moment' },
    { url: personalPhoto, alt: 'Personal portrait' }
  ];

  // Designated galleries utilizing ALL asset images
  const hsGallery     = [hs1, hs2, hs3, hs4, hs5, hs6];
  const springGallery = [memPhoto, springGradPhoto, springGrad1, springGrad2];
  const auppGallery   = [aupp1, aupp2, aupp3, aupp4, aupp5];
  const iflGallery    = [ifl1, ifl2, ifl3, ifl4, ifl5, ifl6, ifl7, ifl8];

  const certifications = [
    { title: 'AWS Cloud Foundation', issuer: 'Amazon Web Services (AWS)', img: awsCert },
    { title: 'Artificial Intelligence Essentials', issuer: 'IBM / Coursera', img: aiCert },
    { title: 'Advanced React & Architecture', issuer: 'Meta Frontend Developer', img: advReactCert },
    { title: 'Frontend Development with TypeScript', issuer: 'Meta Frontend Developer', img: frontendTsCert },
    { title: 'Advanced TypeScript Applications', issuer: 'Meta Frontend Developer', img: advTsCert },
    { title: 'JavaScript Programming', issuer: 'Meta Frontend Developer', img: jsCert },
    { title: 'UX/UI Design Fundamentals', issuer: 'Meta Frontend Developer', img: uxuiCert },
    { title: 'Data Science & Analysis', issuer: 'Meta Frontend Developer', img: dataCert },
    { title: 'Responsive Web Design (HTML/CSS)', issuer: 'Meta Frontend Developer', img: htmlcssCert },
    { title: 'Introduction to Frontend Development', issuer: 'Meta Frontend Developer', img: introFrontendCert },
    { title: 'Mobile Application Development', issuer: 'Meta Frontend Developer', img: mobileCert },
    { title: 'Python Programming & AI', issuer: 'Meta Frontend Developer', img: pythonCert },
    { title: 'Version Control with Git & GitHub', issuer: 'Meta Frontend Developer', img: gitCert }
  ];

  // University Skills Data with detailed descriptions
  const softwareSkills = [
    {
      id: 'sw-1',
      title: 'Full Stack Web Architecture',
      desc: 'Mastered building scalable web applications using React.js, Node.js, Express, RESTful APIs, and relational/non-relational database design.'
    },
    {
      id: 'sw-2',
      title: 'AI & Machine Learning Engineering',
      desc: 'Developed computer vision, natural language processing, and predictive ML algorithms using Python, PyTorch, Scikit-Learn, and OpenCV.'
    },
    {
      id: 'sw-3',
      title: 'Cloud Computing & DevOps Infrastructure',
      desc: 'Hands-on experience deploying cloud solutions on AWS, Docker containerization, CI/CD automation pipelines, and serverless architectures.'
    },
    {
      id: 'sw-4',
      title: 'Software Architecture & Design Patterns',
      desc: 'Architecting clean, maintainable software systems adhering to SOLID principles, object-oriented design, and decoupled component trees.'
    },
    {
      id: 'sw-5',
      title: 'Problem-Solving & Data Structures',
      desc: 'Mastering algorithmic optimization, dynamic programming, tree/graph traversals, and rigorous computational complexity analysis.'
    }
  ];

  const englishSkills = [
    {
      id: 'eng-1',
      title: 'Advancing English Macro Skills',
      desc: 'In-depth mastery of second-language acquisition theory, phonetics, advanced syntax, and methodology for teaching reading, writing, listening, and speaking.'
    },
    {
      id: 'eng-2',
      title: 'Global Studies & Cross-Cultural Relations',
      desc: 'Analyzing international relations, global diplomatic history, cross-cultural communication dynamics, and educational policies.'
    },
    {
      id: 'eng-3',
      title: 'Communication & Public Speaking',
      desc: 'Delivering persuasive presentations, mastering audience engagement strategies, debate techniques, and interpersonal leadership.'
    },
    {
      id: 'eng-4',
      title: 'Critical Thinking & Curriculum Design',
      desc: 'Designing outcome-driven lesson plans, educational assessment rubrics, and interactive student-centered learning materials.'
    },
    {
      id: 'eng-5',
      title: 'Advanced Research & Academic Writing',
      desc: 'Conducting empirical qualitative & quantitative educational research, writing formal literature reviews, and thesis methodology.'
    }
  ];

  return (
    <div className="about-page">
      {/* Main Intro Section */}
      <section ref={mainRef} className={`about-main-section reveal ${mainInView ? 'in-view' : ''}`}>
        <div className="row">
          <div className="col-text">
            <span className="badge-category">Who I am</span>
            <h1 className="about-heading">about.</h1>
            <p className="intro-text">
              I'm a software developer, English educator, and community service enthusiast based in Phnom Penh, Cambodia.
            </p>
            <p className="description-text">
              Hello! I'm Naraksa Veasna, a multidisciplinary learner passionate about technology, education, and community development. I believe meaningful impact is created by combining technical expertise, effective communication, and servant leadership.
              <br /><br />
              My journey has been shaped by academic excellence, continuous learning, and active involvement in youth and digital communities across Cambodia. Today, I pursue two complementary degrees while dedicating my time to software development, English education, and community initiatives that empower young people.
            </p>
          </div>
          <div className="col-image align-center">
            <div className="portrait-container">
              <img src={profPhoto} alt="Naraksa Veasna Profile" className="main-portrait" />
              <div className="portrait-glow" />
            </div>
          </div>
        </div>

        {/* Life Snaps Strip */}
        <div className="snaps-strip">
          {lifeSnaps.map((snap, idx) => (
            <div key={idx} className="snap-wrapper" onClick={() => openLightbox(lifeSnaps.map(s => s.url), idx)}>
              <img src={snap.url} alt={snap.alt} className="snap-img" />
              <div className="snap-overlay">
                <span>{snap.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High School Academic Excellence */}
      <section ref={edu1Ref} className={`education-background-section reveal ${edu1InView ? 'in-view' : ''}`}>
        <div className="row flex-align-center">
          <div className="col-text block-text-col">
            <span className="badge-category">Education Background</span>
            <h2>High School Academic Excellence</h2>
            <h4 className="edu-school">Hun Sen Thnal Totoueng High School</h4>
            <p className="description-text" style={{ marginTop: '16px' }}>
              Graduated with an <strong>A Grade</strong> in the Cambodian National Upper Secondary Examination (Baccalaureate). Recognized as one of the school's outstanding students in Mathematics and Physics, graduating first in my cohort.
              <br /><br />
              My time in high school built a strong foundation in analytical problem solving, logical reasoning, and maths, which inspired me to pursue computer engineering and software studies.
            </p>
          </div>
          <div className="col-image half-section-gallery">
            <AboutSlideshow images={hsGallery} title="High School Academic Excellence" onPhotoClick={(idx) => openLightbox(hsGallery, idx)} />
          </div>
        </div>
      </section>

      {/* English & Leadership Discovery */}
      <section ref={edu2Ref} className={`education-background-section dark-section reveal ${edu2InView ? 'in-view' : ''}`}>
        <div className="row reverse-row flex-align-center">
          <div className="col-text block-text-col">
            <span className="badge-category">Education Background</span>
            <h2>English & Leadership Discovery</h2>
            <h4 className="edu-school">Spring Education Center</h4>
            <p className="description-text" style={{ marginTop: '16px' }}>
              Completed the General English Program (GEP 12), ranking Top 3 in the final exit examination. Received a full IELTS preparation scholarship and achieved an IELTS Overall Band Score of 6.5.
              <br /><br />
              Spring became the space where I discovered my passion for leadership, volunteering, and community engagement. Beyond academic lessons, it gave me a platform to collaborate with student ambassadors and lead charity projects.
            </p>
          </div>
          <div className="col-image half-section-gallery">
            <AboutSlideshow images={springGallery} title="English & Leadership Discovery" onPhotoClick={(idx) => openLightbox(springGallery, idx)} />
          </div>
        </div>
      </section>

      {/* Scholarships & Recognition Section with Side Photo */}
      <section ref={schRef} className={`scholarships-section dark-section reveal ${schInView ? 'in-view' : ''}`}>
        <div className="row flex-align-center">
          <div className="col-text text-left">
            <h2 className="scholarships-title">Scholarships & Recognition</h2>
            <p className="scholarships-intro">
              My academic achievements and commitment to learning have been recognized through several highly competitive scholarships:
            </p>
            <div className="scholarship-cards-list">
              <div className="scholarship-card-item">
                <div className="scholarship-card-icon">🏆</div>
                <div className="scholarship-card-content">
                  <h3>AMT Scholarship</h3>
                  <p>Awarded to pursue a Bachelor of Science in Software Development at AUPP.</p>
                </div>
              </div>

              <div className="scholarship-card-item">
                <div className="scholarship-card-icon">🏆</div>
                <div className="scholarship-card-content">
                  <h3>MoEYS Scholarship</h3>
                  <p>Prestigious government scholarship from Ministry of Education, Youth and Sport.</p>
                </div>
              </div>

              <div className="scholarship-card-item">
                <div className="scholarship-card-icon">🏆</div>
                <div className="scholarship-card-content">
                  <h3>100% Scholarship — Acleda University</h3>
                  <p>Full tuition waiver academic award from Acleda University of Business.</p>
                </div>
              </div>

              <div className="scholarship-card-item">
                <div className="scholarship-card-icon">🏆</div>
                <div className="scholarship-card-content">
                  <h3>100% Scholarship — University of Cambodia</h3>
                  <p>Full tuition academic scholarship for undergraduate studies.</p>
                </div>
              </div>

              <div className="scholarship-card-item">
                <div className="scholarship-card-icon">🏆</div>
                <div className="scholarship-card-content">
                  <h3>100% Scholarship — Spring Education</h3>
                  <p>Full academic scholarship award for GEP and IELTS preparation programs.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-image align-center">
            <div className="scholarships-visual">
              <img src={springGradPhoto} alt="Scholarships & Graduation Recognition" className="scholarships-img" />
              <div className="scholarships-glow" />
              <div className="scholarship-image-badge">Academic Honors & Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* University Studies — Dual Degree Skills Breakdown */}
      <section ref={dualRef} className={`university-studies-section reveal ${dualInView ? 'in-view' : ''}`}>
        <div className="row row-full">
          <h2 className="section-title-center">University Studies</h2>

          <div className="split-layout-wrapper">
            {/* Left Column — Software Development */}
            <div className="developer-half">
              <h2>Software Development</h2>
              <div className="company-tag">AMERICAN UNIVERSITY OF PHNOM PENH (AUPP)</div>
              
              <ul className="discipline-list">
                {softwareSkills.map((skill) => {
                  const isExpanded = expandedSkill === skill.id;
                  return (
                    <li
                      key={skill.id}
                      className={`discipline-item ${isExpanded ? 'active' : ''}`}
                      onClick={() => toggleSkill(skill.id)}
                    >
                      <div className="discipline-item-header">
                        <span className="skill-title-text">{skill.title}</span>
                        <span className={`skill-arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
                      </div>
                      {isExpanded && (
                        <div className="skill-desc-expanded">
                          <p>{skill.desc}</p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Central Graphic Dial */}
            <div className="discipline-split-graphic">
              <div className="outer-dial">
                <span className="dial-label left-label">CODE</span>
                <div className="inner-divider" />
                <span className="dial-label right-label">TEACH</span>
              </div>
            </div>

            {/* Right Column — English Education (TESL) */}
            <div className="communicator-half">
              <h2>English Education (TESL)</h2>
              <div className="company-tag">INSTITUTE OF FOREIGN LANGUAGES (IFL)</div>

              <ul className="discipline-list">
                {englishSkills.map((skill) => {
                  const isExpanded = expandedSkill === skill.id;
                  return (
                    <li
                      key={skill.id}
                      className={`discipline-item ${isExpanded ? 'active' : ''}`}
                      onClick={() => toggleSkill(skill.id)}
                    >
                      <div className="discipline-item-header">
                        <span className="skill-title-text">{skill.title}</span>
                        <span className={`skill-arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
                      </div>
                      {isExpanded && (
                        <div className="skill-desc-expanded">
                          <p>{skill.desc}</p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* My Skills Section — Just below Dual University Studies */}
      <section ref={skillsRef} className={`skills-chart-section reveal ${skillsInView ? 'in-view' : ''}`}>
        <div className="skills-section-header">
          <h2 className="skills-main-title">My skills</h2>
        </div>

        <div className="skills-charts-grid">
          {/* Programming Skills Column */}
          <div className="skills-chart-column">
            <h3 className="chart-column-title">PROGRAMMING SKILLS</h3>
            <div className="chart-axis-header">
              <span className="axis-label-item">NEWBIE</span>
              <span className="axis-label-item">GEEK</span>
              <span className="axis-label-item">NINJA</span>
              <span className="axis-label-item">JEDI</span>
            </div>
            <div className="chart-bars-list">
              {programmingSkillsData.map((skill, idx) => (
                <div key={idx} className="bar-item-row">
                  <div className="bar-item-meta">
                    <span className="bar-item-name">{skill.name}</span>
                    <span className="bar-item-value">{skill.level}</span>
                  </div>
                  <div className="bar-track-bg">
                    <div
                      className={`bar-fill-line ${skill.gradient}`}
                      style={{ width: skillsInView ? `${skill.value}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* English Language Proficiency Column */}
          <div className="skills-chart-column">
            <h3 className="chart-column-title">ENGLISH LANGUAGE PROFICIENCY</h3>
            <div className="chart-axis-header">
              <span className="axis-label-item">A1</span>
              <span className="axis-label-item">A2</span>
              <span className="axis-label-item">B1</span>
              <span className="axis-label-item">B2</span>
              <span className="axis-label-item">C1</span>
              <span className="axis-label-item">C2</span>
            </div>
            <div className="chart-bars-list">
              {englishSkillsData.map((skill, idx) => (
                <div key={idx} className="bar-item-row">
                  <div className="bar-item-meta">
                    <span className="bar-item-name">{skill.name}</span>
                    <span className="bar-item-value">{skill.level}</span>
                  </div>
                  <div className="bar-track-bg">
                    <div
                      className={`bar-fill-line ${skill.gradient}`}
                      style={{ width: skillsInView ? `${skill.value}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Life at AUPP */}
      <section ref={auppRef} className={`education-background-section reveal ${auppInView ? 'in-view' : ''}`}>
        <div className="row flex-align-center">
          <div className="col-text block-text-col">
            <span className="badge-category">Campus Experience</span>
            <h2>Life at AUPP</h2>
            <h4 className="edu-school">American University of Phnom Penh</h4>
            <p className="description-text" style={{ marginTop: '16px' }}>
              Being part of AUPP has exposed me to rigorous American-standard software engineering curricula, collaborative team projects, and international academic standards.
              <br /><br />
              Beyond classroom learning, campus life at AUPP provided opportunities to participate in tech hackathons, lead student clubs, and engage in peer tutoring in computer science concepts.
            </p>
          </div>
          <div className="col-image half-section-gallery">
            <AboutSlideshow images={auppGallery} title="Life at AUPP" onPhotoClick={(idx) => openLightbox(auppGallery, idx)} />
          </div>
        </div>
      </section>

      {/* Life at IFL */}
      <section ref={iflRef} className={`education-background-section dark-section reveal ${iflInView ? 'in-view' : ''}`}>
        <div className="row reverse-row flex-align-center">
          <div className="col-text block-text-col">
            <span className="badge-category">Campus Experience</span>
            <h2>Life at IFL</h2>
            <h4 className="edu-school">Institute of Foreign Languages</h4>
            <p className="description-text" style={{ marginTop: '16px' }}>
              At IFL, I immersed myself in the art of pedagogy, linguistics, and cross-cultural communication. The vibrant community at IFL fostered my passion for public speaking, teaching methodology, and educational leadership.
            </p>
          </div>
          <div className="col-image half-section-gallery">
            <AboutSlideshow images={iflGallery} title="Life at IFL" onPhotoClick={(idx) => openLightbox(iflGallery, idx)} />
          </div>
        </div>
      </section>

      {/* Random Facts Section */}
      <section ref={factsRef} className={`random-facts-section reveal ${factsInView ? 'in-view' : ''}`}>
        <div className="row reverse-row flex-align-center">
          <div className="col-text facts-col">
            <h2>Random facts</h2>
            <ul className="facts-list">
              <li>My code works... until someone watches me demo it.</li>
              <li>Some of my best ideas come late at night when I should probably be sleeping.</li>
              <li>Professional bug creator... and bug fixer.</li>
              <li>My code runs on caffeine and questionable life choices.</li>
              <li>I'm convinced that 90% of my job is googling error messages.</li>
              <li>I trust console.log() more than my own eyes.</li>
              <li>Always saying yes to spontaneous adventures.</li>
            </ul>
          </div>
          <div className="col-image align-center">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
              alt="My workspace setup"
              className="facts-illustration"
            />
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section ref={certRef} className={`certifications-section dark-section reveal ${certInView ? 'in-view' : ''}`}>
        <div className="row row-full">
          <h2 className="section-title-center">Certifications</h2>
          <p className="section-subtitle-center">
            Continuously expanding my knowledge, mastering engineering tools, and validating skills through industry-recognized certifications.
          </p>
          <div className="certs-grid">
            {certifications.map((cert, idx) => (
              <div key={idx} className="cert-card" onClick={() => openLightbox([cert.img], 0)}>
                <div className="cert-img-wrapper">
                  <img src={cert.img} alt={cert.title} loading="lazy" className="cert-img" />
                  <div className="cert-overlay">
                    <span>View Certificate</span>
                  </div>
                </div>
                <div className="cert-details-card">
                  <h3>{cert.title}</h3>
                  <span className="cert-issuer">{cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section ref={visionRef} className={`future-vision-section reveal ${visionInView ? 'in-view' : ''}`}>
        <div className="row flex-align-center">
          <div className="col-text block-text-col">
            <h2>Future Vision</h2>
            <p className="description-text" style={{ fontSize: '18px', lineHeight: '1.8' }}>
              I've always believed that the right opportunity — a word learned, a door opened, a connection made — can change someone's entire trajectory. Growing up in Cambodia, I watched brilliant people stay quiet not because they had nothing to say, but because the language felt like a wall they couldn't climb alone.
              <br /><br />
              So here's a thought I keep coming back to: <em>what if that wall could become a bridge?</em> Not built by textbooks or lecture halls, but by people — learning together, stumbling together, slowly getting there together.
              <br /><br />
              I'm a software developer who studies language. Or maybe I'm a language person who builds software. Either way, there's something quietly brewing at the intersection of the two. Consider this a soft spoiler.
            </p>
          </div>
          <div className="col-image align-center">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80"
              alt="Future Vision"
              className="facts-illustration"
            />
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
}
