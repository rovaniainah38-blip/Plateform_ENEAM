import { useEffect, useState, useRef } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:8000/api';

const getApiItems = (response) => Array.isArray(response) ? response : response.value || [];

const translations = {
  fr: {
    news: 'Actualités',
    contact: 'Contact',
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
    apply: 'Postuler en ligne',
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
    contactTitle: 'Parlons de votre projet',
    contactText: 'Une question sur une formation ou une candidature ? Notre équipe vous répond.',
    firstName: 'Prénom',
    lastName: 'Nom',
    phone: 'Téléphone',
    email: 'Adresse e-mail',
    gender: 'Genre',
    choose: 'Choisir',
    message: 'Votre message',
    send: 'Envoyer le message',
    selected: 'Formations qui vous intéressent',
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

const staticNews = [
  {
    id_actualite: 'news-2026-1',
    date_publication: 'Juin 2026',
    titre: "Mise en conformité et récupération officielle de l'agrément ACM",
    description: "Après un processus rigoureux de restructuration interne et de mise en conformité, l'ENEAM a officiellement récupéré son agrément en juin 2026, sécurisant ainsi la reprise totale de ses activités pédagogiques et de ses vols d'entraînement."
  },
  {
    id_actualite: 'news-2026-2',
    date_publication: 'Avril 2026',
    titre: "Suspension temporaire et audit de mise aux normes",
    description: "En avril 2026, l'ACM avait temporairement suspendu l'agrément de formation de l'école après des audits signalant des non-conformités administratives et pédagogiques, engageant l'école dans un plan d'action correctif immédiat."
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

function App() {
  const [language] = useState('fr');
  const [news, setNews] = useState([]);
  const [information, setInformation] = useState(null);
  const [partners, setPartners] = useState([]);
  const [conditions, setConditions] = useState([]);
  
  // États dynamiques
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const text = translations[language];
  const establishment = information || {};
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=ENEAM+Ivato+A%C3%A9roport+Antananarivo";

  // Fonction pour mettre en pause / lire la vidéo
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
        // Mode dégradé si le serveur backend n'est pas actif
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
          <span style={{ textTransform: 'lowercase' }}>eneam.mg</span>
          <a href="#actualites">{text.news}</a>
          <a href="#contact">{text.contact}</a>
        </div>
      </div>

      {/* EN-TÊTE PRINCIPAL */}
      <header className="main-header container">
        <a className="brand" href="#accueil" aria-label="ENEAM accueil">
          <img src="/images/logo-ENEAM-2.png" alt="ENEAM" />
          <span>ENEAM</span>
        </a>

        {/* Navigation principale responsive */}
        <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`} aria-label="Menu principal">
          <a href="#accueil" onClick={() => setMobileMenuOpen(false)}>{text.home}</a>
          <a href="#etablissement" onClick={() => setMobileMenuOpen(false)}>{text.about}</a>
          <a href="#formations" onClick={() => setMobileMenuOpen(false)}>{text.training}</a>
          <a href="#candidature" onClick={() => setMobileMenuOpen(false)}>{text.application}</a>
          <a href="#actualites" onClick={() => setMobileMenuOpen(false)}>{text.news}</a>
          <a href="#partenariat" onClick={() => setMobileMenuOpen(false)}>{text.partners}</a>
        </nav>

        <div className="header-actions">
          <button 
            className="menu-button" 
            aria-label="Menu" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
          <button className="red-button" onClick={() => scrollTo('contact')}>{text.apply}</button>
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
            <h1>{text.heroTitle}</h1>
            <p className="hero-copy">{text.heroText}</p>
            
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="white-button" onClick={() => scrollTo('formations')}>
                {text.discover} <span>→</span>
              </button>
              
              {/* Bouton Symbole Pause / Play pour la vidéo */}
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
              <a href="#contact" onClick={() => scrollTo('contact')}>{text.contact} <span>↗</span></a>
            </div>
          </div>
        </section>

        {/* SECTION ÉQUIPE */}
        <section className="team-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow dark">02 / {text.team}</p>
                <h2>Les visages qui vous accompagnent</h2>
              </div>
              <a className="text-link" href="#contact" onClick={() => scrollTo('contact')}>{text.contact} <span>↗</span></a>
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
                  <a href="#contact" onClick={() => scrollTo('contact')} style={{ fontWeight: 'bold', color: '#e63946', textDecoration: 'none' }}>
                    {text.formationCta} <span>→</span>
                  </a>
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
                <a href="#contact" onClick={() => scrollTo('contact')}><span>01</span>{text.join}<b>↗</b></a>
                <a href="#conditions"><span>02</span>{text.access}<b>↗</b></a>
                <a href="#contact" onClick={() => scrollTo('contact')}><span>03</span>{text.apply}<b>↗</b></a>
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
                <h2>🛑 Actualité et Régulation</h2>
              </div>
              <a className="text-link" href="#contact" onClick={() => scrollTo('contact')}>Toutes les actualités <span>↗</span></a>
            </div>

            <div className="news-grid" style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
              {staticNews.map((item, index) => (
                <article className="news-card" key={item.id_actualite} style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', borderLeft: index === 0 ? '4px solid #2a9d8f' : '4px solid #e76f51', textAlign: 'left' }}>
                  <div className={`news-image news-image-${index % 3}`} />
                  <div className="news-meta" style={{ marginTop: '1rem', fontWeight: 'bold', color: '#e63946' }}>
                    {item.date_publication} <span>/</span> ENEAM
                  </div>
                  <h3 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>{item.titre}</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#4a5568' }}>{item.description}</p>
                  <a href="#contact" onClick={() => scrollTo('contact')}>{text.read} <span>↗</span></a>
                </article>
              ))}

              {news.length > 0 && news.map((item, index) => (
                <article className="news-card" key={item.id_actualite || index}>
                  <div className={`news-image news-image-${index % 3}`} />
                  <div className="news-meta">{item.date_publication} <span>/</span> ENEAM</div>
                  <h3>{item.titre}</h3>
                  <p>{item.description}</p>
                  <a href="#contact" onClick={() => scrollTo('contact')}>{text.read} <span>↗</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION CONTACT */}
        <section className="contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-intro">
              <p className="eyebrow">06 / CONTACT</p>
              <h2>{text.contactTitle}</h2>
              <p>{text.contactText}</p>
              <div className="contact-details">
                <span>{text.phone}</span><strong>{establishment.numero_telephone || '+261 34 01 313 25 | +261 34 21 300 94'}</strong>
                <span>{text.email}</span><strong style={{ textTransform: 'lowercase' }}>eneam.mg</strong>
                <span>{text.address}</span><strong>Ivato Aéroport, Antananarivo, Madagascar</strong>
              </div>
            </div>
            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <div className="form-row">
                <label>{text.gender}
                  <select defaultValue="">
                    <option value="" disabled>{text.choose}</option>
                    <option>Madame</option>
                    <option>Monsieur</option>
                  </select>
                </label>
                <label>{text.lastName}<input required /></label>
                <label>{text.firstName}<input required /></label>
              </div>
              <div className="form-row">
                <label>{text.phone}<input type="tel" /></label>
                <label>{text.email}<input type="email" required /></label>
              </div>
              <fieldset>
                <legend>{text.selected}</legend>
                {staticFormations.map((item) => (
                  <label className="check-label" key={item.id}>
                    <input type="checkbox" /> <span>{item.nom}</span>
                  </label>
                ))}
              </fieldset>
              <label>{text.message}<textarea rows="4" /></label>
              <button className="red-button submit-button" type="submit">{text.send} <span>↗</span></button>
            </form>
          </div>
        </section>

        {/* SECTION PARTENARIAT */}
        <section className="partners-section" id="partenariat">
          <div className="container partners-inner">
            <p className="eyebrow dark">07 / {text.partners}</p>
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

      {/* PIED DE PAGE */}
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
            <a href="#contact">{text.contact}</a>
          </div>
          <div>
            <p className="footer-title">CONTACT ENEAM</p>
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
          <span>Instagram &nbsp; / &nbsp; Facebook &nbsp; / &nbsp; LinkedIn</span>
        </div>
      </footer>

      <a className="floating-apply" href="#contact" onClick={() => scrollTo('contact')}>
        <span>✦</span>{text.apply}
      </a>
    </div>
  );
}

export default App;