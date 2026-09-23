-- ============================================================
-- 1. FORMATIONS
-- ============================================================

INSERT INTO formations (nom, type, description) VALUES
('Formation Pilote Privé Avion (PPL)', 'Formation aéronautique',
 'Formation permettant d acquérir les connaissances théoriques et pratiques nécessaires à l obtention de la licence de pilote privé avion.'),

('Formation Pilote Professionnel Avion (CPL)', 'Formation aéronautique',
 'Formation destinée aux pilotes souhaitant exercer professionnellement et poursuivre une carrière dans l aviation civile.'),

('Formation Théorique ATPL', 'Formation aéronautique',
 'Formation théorique avancée couvrant les principales matières nécessaires au parcours de pilote de ligne.'),

('Formation Météorologie Aéronautique', 'Formation spécialisée',
 'Formation consacrée à l interprétation des phénomènes météorologiques et à leur impact sur les opérations aériennes.'),

('Formation Anglais Aéronautique', 'Formation linguistique',
 'Formation permettant aux élèves de développer leur maîtrise de l anglais utilisé dans les communications aéronautiques.');


-- ============================================================
-- 2. CONDITIONS D'ACCÈS
-- ============================================================

INSERT INTO conditions_acces (id_formation, condition) VALUES
(1, 'Être âgé d au moins 17 ans pour l obtention de la licence.'),
(1, 'Présenter un certificat médical aéronautique valide.'),
(1, 'Avoir un niveau scolaire permettant de suivre les cours théoriques.'),

(2, 'Être titulaire d une licence de pilote privé ou satisfaire aux conditions d admission de l établissement.'),
(2, 'Présenter un certificat médical aéronautique valide.'),
(2, 'Avoir effectué le nombre d heures de vol requis par la réglementation.'),

(3, 'Être titulaire ou en cours de formation vers une licence de pilote professionnel.'),
(3, 'Posséder un niveau suffisant en mathématiques, physique et anglais.'),

(4, 'Être inscrit à une formation aéronautique ou exercer dans le domaine de l aviation.'),
(4, 'Avoir des connaissances générales en aviation.'),

(5, 'Être inscrit dans une formation aéronautique.'),
(5, 'Posséder des notions de base en anglais.');


-- ============================================================
-- 3. INFORMATIONS DE L'ÉTABLISSEMENT
-- ============================================================

INSERT INTO informations
(logo, numero_telephone, adresse_email, historique, lieu_code_map,
 agrement, comment_nous_rejoindre, adresse_local, contacts)
VALUES
(
 'logo-ENEAM-2.png',
 '+261 34 01 313 25 | +261 34 21 300 94',
 'contact@eneam.mg',
 'Établissement spécialisé dans la formation aéronautique et météorologique. Il accompagne les élèves dans leur parcours théorique et pratique.',
 '-18.799972485173825, 47.47005719606382',
 'Agrément de formation aéronautique délivré par l Autorité de l Aviation Civile de Madagascar.',
 'Pour rejoindre une formation, le candidat doit remplir les conditions d admission, constituer son dossier, participer au concours si nécessaire et suivre la procédure d inscription de l établissement.',
 'BP 62 Ivato Aéroport, Antananarivo 101, Madagascar',
 '+261 34 01 313 25 | +261 34 21 300 94 | Email : contact@eneam.mg'
);


-- ============================================================
-- 4. TYPES D'ARCHIVES
-- ============================================================

INSERT INTO types_archive (nom) VALUES
('Photo'),
('Vidéo');


-- ============================================================
-- 5. ARCHIVES
-- ============================================================

INSERT INTO archives (id_type, nom) VALUES
(1, 'presentation_ecole.jpg'),
(1, 'salle_de_cours.jpg'),
(1, 'eleves_en_formation.jpg'),
(1, 'seance_simulateur.jpg'),
(1, 'activite_aeronautique.jpg'),

(2, 'presentation_formation.mp4'),
(2, 'seance_simulateur.mp4'),
(2, 'visite_aeroport.mp4');


-- ============================================================
-- 6. PARTENAIRES
-- ============================================================

INSERT INTO partenaires (nom, logo) VALUES
('Aviation Civile de Madagascar', 'aviation_civile_madagascar.png'),
('Aéroport International d Antananarivo', 'aeroport_antananarivo.png'),
('Météo Madagascar', 'meteo_madagascar.png'),
('Air Madagascar', 'air_madagascar.png');


-- ============================================================
-- 7. ACTUALITÉS
-- ============================================================

INSERT INTO actualites (titre, description, date_publication, image) VALUES
(
 'Ouverture des inscriptions pour la nouvelle promotion',
 'Les inscriptions pour la prochaine promotion de pilotes sont ouvertes. Les candidats peuvent déposer leur dossier auprès de l administration.',
 '2026-09-01',
 'inscriptions_2026.jpg'
),

(
 'Début des cours théoriques',
 'Les cours théoriques de la nouvelle promotion débuteront prochainement. Les élèves sont invités à consulter leur calendrier de formation.',
 '2026-09-05',
 'cours_theorique.jpg'
),

(
 'Nouvelle séance de formation pratique',
 'Les élèves pilotes ont participé à une nouvelle séance de formation pratique consacrée aux exercices de navigation et de pilotage.',
 '2026-09-10',
 'formation_vol.jpg'
),

(
 'Sensibilisation à la sécurité aérienne',
 'Une séance de sensibilisation consacrée aux règles de sécurité et aux bonnes pratiques aéronautiques a été organisée pour les élèves.',
 '2026-09-12',
 'securite_aerienne.jpg'
);


-- ============================================================
-- 8. ÉQUIPE
-- ============================================================

INSERT INTO equipe (nom, prenom, fonction, titre, image) VALUES
('Razanamihaja', 'Jean', 'Directeur', 'Directeur de l établissement', 'jean_razanamihaja.jpg'),

('Rakoto', 'Andry', 'Instructeur pilote', 'Instructeur de vol', 'andry_rakoto.jpg'),

('Randrianarisoa', 'Hery', 'Instructeur théorique', 'Instructeur aéronautique', 'hery_randrianarisoa.jpg'),

('Rasoanaivo', 'Mialy', 'Responsable administrative', 'Responsable de la scolarité', 'mialy_rasoanaivo.jpg'),

('Andrianina', 'Toky', 'Instructeur', 'Instructeur météorologie', 'toky_andrianina.jpg');


-- ============================================================
-- 9. CANDIDATS
-- ============================================================

INSERT INTO candidats
(nom, prenom, photo, date_naissance, lieu_naissance, contact,
 adresse_email, droit_concours, est_eleve)
VALUES
(
 'Rakoto',
 'Hery',
 'hery_rakoto.jpg',
 '2003-05-14',
 'Antananarivo',
 '+261 34 11 111 11',
 'hery.rakoto@email.com',
 TRUE,
 TRUE
),

(
 'Ranaivosoa',
 'Mamy',
 'mamy_ranaivosoa.jpg',
 '2002-11-22',
 'Toamasina',
 '+261 32 22 222 22',
 'mamy.ranaivosoa@email.com',
 TRUE,
 TRUE
),

(
 'Andrianjafy',
 'Feno',
 'feno_andrianjafy.jpg',
 '2004-02-08',
 'Antsirabe',
 '+261 33 33 333 33',
 'feno.andrianjafy@email.com',
 TRUE,
 TRUE
),

(
 'Randriamampianina',
 'Sarah',
 'sarah_randriamampianina.jpg',
 '2001-08-19',
 'Antananarivo',
 '+261 34 44 444 44',
 'sarah.randriamampianina@email.com',
 TRUE,
 FALSE
),

(
 'Rakotomalala',
 'Tiana',
 'tiana_rakotomalala.jpg',
 '2005-01-30',
 'Fianarantsoa',
 '+261 32 55 555 55',
 'tiana.rakotomalala@email.com',
 FALSE,
 FALSE
);


-- ============================================================
-- 10. TYPES DE DOSSIERS
-- ============================================================

INSERT INTO types_dossier (nom) VALUES
('Demande de concours'),
('Acte de naissance'),
('Bulletin numéro 3'),
('Diplôme'),
('Certificat médical'),
('Photo d identité');


-- ============================================================
-- 11. DOSSIERS DES CANDIDATS
-- ============================================================

-- Candidat 1 : Hery Rakoto
INSERT INTO dossiers
(id_type_dossier, id_candidat, image, fin_validite, descriptions)
VALUES
(1, 1, 'hery_demande.jpg', NULL, 'Demande de participation au concours signée.'),
(2, 1, 'hery_acte_naissance.jpg', NULL, 'Copie de l acte de naissance.'),
(3, 1, 'hery_bulletin3.jpg', '2027-01-15', 'Bulletin numéro 3 fourni par le candidat.'),
(4, 1, 'hery_diplome.jpg', NULL, 'Copie du diplôme présenté lors de l inscription.'),
(5, 1, 'hery_certificat_medical.jpg', '2027-06-30', 'Certificat médical aéronautique valide.'),
(6, 1, 'hery_photo.jpg', NULL, 'Photo récente du candidat.');

-- Candidat 2 : Mamy Ranaivosoa
INSERT INTO dossiers
(id_type_dossier, id_candidat, image, fin_validite, descriptions)
VALUES
(1, 2, 'mamy_demande.jpg', NULL, 'Demande de participation au concours.'),
(2, 2, 'mamy_acte_naissance.jpg', NULL, 'Copie de l acte de naissance.'),
(3, 2, 'mamy_bulletin3.jpg', '2027-02-20', 'Bulletin numéro 3 fourni par le candidat.'),
(4, 2, 'mamy_diplome.jpg', NULL, 'Diplôme présenté pour le dossier de candidature.'),
(5, 2, 'mamy_certificat_medical.jpg', '2027-08-15', 'Certificat médical aéronautique valide.');

-- Candidat 3 : Feno Andrianjafy
INSERT INTO dossiers
(id_type_dossier, id_candidat, image, fin_validite, descriptions)
VALUES
(1, 3, 'feno_demande.jpg', NULL, 'Demande de participation au concours.'),
(2, 3, 'feno_acte_naissance.jpg', NULL, 'Copie de l acte de naissance.'),
(3, 3, 'feno_bulletin3.jpg', '2027-03-10', 'Bulletin numéro 3.'),
(4, 3, 'feno_diplome.jpg', NULL, 'Diplôme présenté lors de l inscription.');


-- ============================================================
-- 12. UTILISATEURS
-- ============================================================

INSERT INTO utilisateurs
(nom, prenom, adresse_email, mot_de_passe)
VALUES
('Razanamihaja', 'Jean', 'admin@aeroformation.mg', 'admin123'),
('Rasoanaivo', 'Mialy', 'scolarite@aeroformation.mg', 'scolarite123'),
('Rakoto', 'Andry', 'instructeur@aeroformation.mg', 'instructeur123');