import { useEffect, useState, useRef } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:8000/api';

const getApiItems = (response) => Array.isArray(response) ? response : response.value || [];

const translations = {
  fr: {
    news: 'Actualités',
    search: 'Rechercher',
    home: 'Accueil',
    about: "L'établissement",
    team: "L'équipe",
    training: 'Formations',
    application: 'Candidature',
    partners: 'Partenariat',
    join: 'Comment nous rejoindre',
    access: "Conditions d'accès",
    discover: "Découvrir l'ENEAM",
    elearning: 'E-LEARNING',
    heroKicker: "École Nationale d'Enseignement Aéronautique et Météorologique",
    heroTitle: 'Former les professionnels du ciel',
    heroText: "Un enseignement exigeant, humain et tourné vers les métiers de l'aéronautique.",
    history: 'Notre histoire & Mission',
    historyText: "L'ENEAM accompagne les vocations aéronautiques avec des formations solides, des instructeurs passionnés et un environnement propice à la réussite.",
    accreditation: 'Agrément & Reconnaissance',
    accreditationText: "Un organisme de formation reconnu pour la qualité de son accompagnement et de ses parcours.",
    latest: 'Les dernières actualités',
    read: 'Lire plus',
    formationsTitle: 'Des parcours pour prendre son envol',
    formationsText: "Explorez les formations qui ouvrent les portes de l'aéronautique.",
    formationCta: 'Voir la formation',
    address: 'Adresse',
    slogan: 'Apprendre. S’envoler. Réussir.',
    quick: 'Accès rapide',
    rights: 'Tous droits réservés.',
    map: 'Voir sur la carte',
    noNews: 'Aucune actualité disponible pour le moment.'
  }
};

const staticFormations = [
  {
    id: 1,
    type: "Filière Pilotage",
    nom: "1. Le Cycle Pilote de Ligne / Pilotage",
    details: [
      "PPL(A) : Pilote Privé d’Avion (Private Pilot License)",
      "CPL(A) : Pilote Professionnel (Commercial Pilot License)",
      "ATPL(A) : Pilote de Ligne Théorique (Airline Transport Pilot License)",
      "IR(A) : Qualification de vol aux instruments",
      "FI(A) : Qualification d'Instructeur de vol"
    ]
  },
  {
    id: 2,
    type: "Filière Opérations",
    nom: "2. Le Cycle Agent Technique d'Exploitation (ATE)",
    details: [
      "Formation d'Agent Technique d'Exploitation (technicien de dispatch / opérations aériennes)",
      "Préparation et suivi des vols, gestion des plans de vol, régulation du trafic aérien et assistance au sol."
    ]
  },
  {
    id: 3,
    type: "Filière Météorologie",
    nom: "3. Le Cycle Météorologie",
    details: [
      "Spécialistes en météorologie aéronautique",
      "Analyse des données climatiques, prévisions météorologiques en temps réel et études des phénomènes atmosphériques appliquées à la sécurité de la navigation aérienne."
    ]
  },
  {
    id: 4,
    type: "Filière Maintenance",
    nom: "4. Maintenance Aéronautique",
    details: [
      "Cursus complet en maintenance aéronautique et entretien des aéronefs."
    ]
  }
];

const staticPartnersCategories = [
  {
    category: "1. Partenaires Institutionnels et Réglementaires",
    items: [
      "Aviation Civile de Madagascar (ACM)",
      "Ministère des Transports et de la Météorologie"
    ]
  },
  {
    category: "2. Partenaires Techniques et Professionnels (Stages & Emplois)",
    items: [
      "Météo Madagascar",
      "Compagnies Aériennes",
      "Sociétés de Maintenance et de Services"
    ]
  },
  {
    category: "3. Partenaires Académiques et Internationaux",
    items: [
      "École Supérieure Polytechnique d'Antananarivo (ESPA)",
      "Coopérations Régionales"
    ]
  }
];

// Actualités statiques (affichées même si le backend est hors ligne)
// Les images sont à placer dans public/images/
const staticNews = [
  {
    id: 'modernisation',
    titre: 'Projets de modernisation',
    date_publication: 'Septembre 2026',
    images: ['/images/piste-decollage.png'],
    points: [
      {
        label: 'Transition vers le e-learning',
        texte: "En septembre 2026, la direction a lancé une consultation pour étudier la digitalisation de ses infrastructures pédagogiques, ouvrant la voie à des options d'apprentissage à distance."
      }
    ]
  },
  {
    id: 'rayonnement',
    titre: 'Rayonnement régional',
    date_publication: 'Septembre 2026',
    images: ['/images/pilotes-drapeau.png', '/images/pilote-cessna.png'],
    points: [
      {
        label: 'Attractivité internationale',
        texte: "L'école consolide son rôle de pôle aéronautique dans l'océan Indien en accueillant de nouvelles promotions comprenant un nombre croissant d'étudiants étrangers, attirés par des programmes alignés sur les normes de l'Organisation de l'aviation civile internationale (OACI)."
      }
    ]
  }
];

function App() {
  const [language] = useState('fr');
  const [news, setNews] = useState([]);
  const [information, setInformation] = useState(null);
  const [partners, setPartners] = useState([]);
  const [conditions, setConditions] = useState([]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const fullTitle = translations[language].heroTitle;
  const [typedTitle, setTypedTitle] = useState('');

  useEffect(() => {
    let timer;
    if (typedTitle.length < fullTitle.length) {
      timer = setTimeout(() => {
        setTypedTitle(fullTitle.slice(0, typedTitle.length + 1));
      }, 90);
    } else {
      timer = setTimeout(() => {
        setTypedTitle('');
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [typedTitle, fullTitle]);

  const text = translations[language];
  const establishment = information || {};
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=ENEAM+Ivato+A%C3%A9roport+Antananarivo";

  // Actualités statiques + actualités venant de l'API
  const allNews = [...staticNews, ...news];

  const togglePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [newsResponse, informationResponse, partnerResponse, conditionResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/actualites/`),
          fetch(`${API_BASE_URL}/informations/`),
          fetch(`${API_BASE_URL}/partenaires/`),
          fetch(`${API_BASE_URL}/conditions-acces/`)
        ]);
        if (newsResponse.ok) setNews(getApiItems(await newsResponse.json()).slice(0, 10));
        if (informationResponse.ok) {
          const informationData = getApiItems(await informationResponse.json());
          if (informationData.length) setInformation(informationData[0]);
        }
        if (partnerResponse.ok) setPartners(getApiItems(await partnerResponse.json()));
        if (conditionResponse.ok) setConditions(getApiItems(await conditionResponse.json()));
      } catch (error) {
        // Mode dégradé si le backend est hors ligne
      }
    };
    load();
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site-shell">
      {/* BARRE SUPÉRIEURE */}
      <div className="top-strip">
        <div className="container top-inner">
          <span>{establishment.numero_telephone || '+261 34 01 313 25 | +261 34 21 300 94'}</span>
          <a href="https://eneam.mg" style={{ textTransform: 'lowercase', color: '#ffffff', textDecoration: 'none' }}>eneam.mg</a>
          <a href="#actualites">{text.news}</a>
        </div>
      </div>

      {/* EN-TÊTE PRINCIPAL */}
      <header className="main-header container">
        <a className="brand" href="https://eneam.mg" aria-label="ENEAM accueil">
          <img src="/images/logo-ENEAM-2.png" alt="ENEAM" />
          <span>ENEAM</span>
        </a>

        <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`} aria-label="Menu principal">
          <a href="#accueil" onClick={() => setMobileMenuOpen(false)}>{text.home}</a>
          <a href="#etablissement" onClick={() => setMobileMenuOpen(false)}>{text.about}</a>
          <a href="#formations" onClick={() => setMobileMenuOpen(false)}>{text.training}</a>
          <a href="#candidature" onClick={() => setMobileMenuOpen(false)}>{text.application}</a>
          <a href="#actualites" onClick={() => setMobileMenuOpen(false)}>{text.news}</a>
          <a href="#partenariat" onClick={() => setMobileMenuOpen(false)}>{text.partners}</a>
        </nav>

        <div className="header-actions">
          <a
            href="https://elearning.eneam.mg"
            target="_blank"
            rel="noopener noreferrer"
            className="red-button"
          >
            + {text.elearning}
          </a>
          <button
            className="menu-button"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <main>
        {/* SECTION HERO / ACCUEIL */}
        <section className="hero" id="accueil">
          <video
            ref={videoRef}
            className="hero-video"
            src="/videos/eneam.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="hero-overlay" />

          <div className="container hero-content">
            <p className="eyebrow">{text.heroKicker}</p>
            <h1 className="typewriter-title">
              {typedTitle}
              <span className="typewriter-cursor">|</span>
            </h1>
            <p className="hero-copy">{text.heroText}</p>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="white-button" onClick={() => scrollTo('formations')}>
                {text.discover} <span>→</span>
              </button>

              <button
                onClick={togglePlayVideo}
                className="video-control-btn"
                aria-label={isPlaying ? "Mettre en pause la vidéo" : "Lire la vidéo"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>
          </div>
          <div className="hero-marker">01 <span>/ 03</span></div>
        </section>

        {/* SECTION ÉTABLISSEMENT */}
        <section className="intro-section" id="etablissement">
          <div className="container intro-grid">
            <div className="section-label">01 <span>{text.about}</span></div>
            <div>
              <p className="eyebrow dark">ENEAM / DEPUIS 1975</p>
              <h2>L'École Nationale d'Enseignement de l'Aéronautique et de la Météorologie</h2>
              <p className="large-copy" style={{ marginBottom: '1.5rem', fontWeight: '500' }}>
                L'ENEAM est le centre de formation de référence à Madagascar pour les professionnels de l'air et de la météo.
              </p>

              <div className="about-details-grid" style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div style={{ background: '#f8f9fa', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #1d3557' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1d3557', marginBottom: '0.5rem' }}>🛩️ Identité et Rôle majeur</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Fondée le <strong>12 septembre 1975</strong>, l'ENEAM est un établissement public basé à <strong>Ivato Aéroport (Antananarivo)</strong>. Elle assure la formation initiale et continue des techniciens de l'aviation civile et de la météorologie.
                  </p>
                </div>

                <div style={{ background: '#f8f9fa', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #e63946' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1d3557', marginBottom: '0.5rem' }}>🌍 Reconnaissance Internationale</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Les cursus dispensés suivent rigoureusement les normes internationales fixées par l'<strong>OACI</strong> (Organisation de l'aviation civile internationale).
                  </p>
                </div>

                <div style={{ background: '#f8f9fa', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #457b9d' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1d3557', marginBottom: '0.5rem' }}>👨‍✈️ Gouvernance</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    L'école est actuellement dirigée par son Directeur Général, <strong>Hugues Emmanuel Randriamifidy</strong>.
                  </p>
                </div>
              </div>

              <div className="story-line" style={{ marginTop: '2rem' }}>
                <div><strong>50+</strong><span>ans d'excellence</span></div>
                <div><strong>04</strong><span>filières principales</span></div>
                <div><strong>OACI</strong><span>normes respectées</span></div>
              </div>
            </div>

            <div className="accreditation">
              <span className="stamp">✓</span>
              <h3>Organisme Agréé ACM</h3>
              <p>L'ENEAM est un organisme de formation agréé par l'Aviation Civile de Madagascar (ACM) garantissant une qualification aux normes mondiales.</p>
            </div>
          </div>
        </section>

        {/* SECTION ÉQUIPE (MIVELATRA / FULL WIDTH) */}
        <section className="team-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow dark">02 / {text.team}</p>
                <h2>Les visages qui vous accompagnent</h2>
              </div>
            </div>
            <div className="team-video">
              <img src="/images/air_madagascar.png" alt="Avion ENEAM" />
            </div>
          </div>
        </section>

        {/* SECTION FORMATIONS */}
        <section className="courses-section" id="formations">
          <div className="container">
            <div className="section-heading light">
              <div>
                <p className="eyebrow">03 / {text.training}</p>
                <h2>{text.formationsTitle}</h2>
                <p>{text.formationsText}</p>
              </div>
              <span className="round-arrow">↘</span>
            </div>

            <div className="course-grid" style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
              {staticFormations.map((item, index) => (
                <article className="course-card" key={item.id} style={{ background: '#ffffff', color: '#1d3557', padding: '2rem', borderRadius: '8px', textAlign: 'left' }}>
                  <span className="course-number" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e63946' }}>0{index + 1}</span>
                  <span className="course-type" style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', color: '#6c757d', margin: '0.5rem 0' }}>{item.type}</span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem' }}>{item.nom}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} style={{ marginBottom: '0.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        ✓ {detail}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION CANDIDATURE */}
        <section className="path-section" id="candidature">
          <div className="container path-grid">
            <div>
              <p className="eyebrow dark">04 / {text.application}</p>
              <h2>Votre prochaine altitude commence ici.</h2>
              <p className="large-copy">{establishment.comment_nous_rejoindre || text.join}</p>
              <div className="path-links">
                <a href="#conditions"><span>01</span>{text.access}<b>↗</b></a>
                <a href="https://elearning.eneam.mg" target="_blank" rel="noopener noreferrer"><span>02</span>{text.elearning}<b>↗</b></a>
              </div>
              <div id="conditions" className="conditions-list">
                {conditions.slice(0, 6).map((item) => <p key={item.numero}>✓ {item.condition}</p>)}
              </div>
            </div>
            <div className="path-image">
              <div className="image-caption">ENEAM <span>Ivato Aéroport, Antananarivo</span></div>
            </div>
          </div>
        </section>

        {/* SECTION ACTUALITÉS */}
        <section className="news-section" id="actualites">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow dark">05 / {text.news}</p>
                <h2>Actualités</h2>
              </div>
            </div>

            <div className="news-grid" style={{ marginTop: '2rem' }}>
              {allNews.length > 0 ? allNews.map((item, index) => (
                <article className="news-card" key={item.id || item.id_actualite || index}>
                  {/* Galerie d'images (actualités statiques) ou image par défaut (API) */}
                  {item.images ? (
                    <div className={`news-gallery gallery-${item.images.length}`}>
                      {item.images.map((src, i) => (
                        <img key={i} src={src} alt={item.titre} />
                      ))}
                    </div>
                  ) : (
                    <div className={`news-image news-image-${index % 3}`} />
                  )}

                  <div className="news-meta">{item.date_publication} <span>/</span> ENEAM</div>
                  <h3>{item.titre}</h3>

                  {/* Points détaillés (statique) ou description simple (API) */}
                  {item.points ? (
                    item.points.map((p, i) => (
                      <p key={i}><strong>{p.label} :</strong> {p.texte}</p>
                    ))
                  ) : (
                    <p>{item.description}</p>
                  )}
                </article>
              )) : (
                <p style={{ color: '#4a5568' }}>{text.noNews}</p>
              )}
            </div>
          </div>
        </section>

        {/* SECTION PARTENARIAT */}
        <section className="partners-section" id="partenariat">
          <div className="container partners-inner">
            <p className="eyebrow dark">06 / {text.partners}</p>
            <h2>Des liens solides pour aller plus loin.</h2>

            <div className="partners-categories-grid" style={{ display: 'grid', gap: '2rem', marginTop: '2rem', textAlign: 'left' }}>
              {staticPartnersCategories.map((cat, idx) => (
                <div key={idx} className="partner-category-card" style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #e63946' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1d3557', marginBottom: '1rem' }}>{cat.category}</h3>
                  <div className="partner-items-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {cat.items.map((item, i) => (
                      <span key={i} style={{ background: '#ffffff', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.9rem', fontWeight: '600', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {partners.length > 0 && (
              <div className="partner-logos" style={{ marginTop: '3rem' }}>
                {partners.map((partner) => (
                  <span key={partner.id_partenaire}>
                    {partner.logo && <img src={`/images/${partner.logo}`} alt={partner.nom} />}
                    <b>{partner.nom}</b>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* BOUTON FLOTTANT E-LEARNING */}
      <a
        href="https://elearning.eneam.mg"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-elearning-btn"
        title="Accéder à la plateforme E-Learning"
      >
        <div className="floating-elearning-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        </div>
        <span className="floating-elearning-title">E-LEARNING</span>
      </a>

      {/* PIED DE PAGE (FOOTER) */}
      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/images/logo-ENEAM-2.png" alt="ENEAM" />
            <p>{text.slogan}</p>
          </div>
          <div>
            <p className="footer-title">{text.quick}</p>
            <a href="#accueil">{text.home}</a>
            <a href="#etablissement">{text.about}</a>
            <a href="#formations">{text.training}</a>
          </div>
          <div>
            <p className="footer-title">ENEAM</p>
            <p>Ivato Aéroport, Antananarivo</p>
            <p>{establishment.numero_telephone || '+261 34 01 313 25 | +261 34 21 300 94'}</p>
          </div>
          <div className="map-box">
            <span>Ivato Aéroport, Antananarivo</span>
            <a href={mapUrl} target="_blank" rel="noreferrer">{text.map} ↗</a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© ENEAM. {text.rights}</span>

          {/* Un seul bloc social-links (le doublon a été supprimé) */}
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>INSTAGRAM</span>
            </a>

            <span className="social-sep">/</span>

            <a
              href="https://www.facebook.com/eneam.mada"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link facebook-link"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>FACEBOOK</span>
            </a>

            <span className="social-sep">/</span>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LINKEDIN</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;