# Documentation de l'API

## Démarrer le projet

Depuis la racine du projet, lancer `run.bat`, puis ouvrir :

```text
http://localhost:8000/api/
```

L'API utilise les tables PostgreSQL existantes de la base `projet_db`. Les endpoints sont en lecture seule : ils acceptent `GET` et refusent les créations, modifications et suppressions.

## Endpoints

Pour chaque endpoint, `GET /api/nom/` renvoie toutes les lignes et `GET /api/nom/<id>/` renvoie une ligne précise.

| Table | Endpoint | Identifiant |
| --- | --- | --- |
| formations | `/api/formations/` | `id_formation` |
| conditions_acces | `/api/conditions-acces/` | `numero` |
| informations | `/api/informations/` | `id_information` |
| types_archive | `/api/types-archives/` | `id_type` |
| archives | `/api/archives/` | `id_archive` |
| partenaires | `/api/partenaires/` | `id_partenaire` |
| actualites | `/api/actualites/` | `id_actualite` |
| equipe | `/api/equipe/` | `id_equipe` |
| candidats | `/api/candidats/` | `id_candidat` |
| types_dossier | `/api/types-dossiers/` | `id_type_dossier` |
| dossiers | `/api/dossiers/` | `id_dossier` |
| utilisateurs | `/api/utilisateurs/` | `id_utilisateur` |

Pour des raisons de sécurité, le champ `mot_de_passe` n'est jamais renvoyé par l'API.

## Exemples

Depuis un navigateur, ouvrir :

```text
http://localhost:8000/api/formations/
http://localhost:8000/api/formations/1/
http://localhost:8000/api/actualites/
http://localhost:8000/api/candidats/
```

Depuis PowerShell :

```powershell
Invoke-RestMethod http://localhost:8000/api/formations/
Invoke-RestMethod http://localhost:8000/api/formations/1/
```

Exemple de réponse pour `/api/formations/` :

```json
[
  {
    "id_formation": 1,
    "nom": "Formation Pilote Privé Avion (PPL)",
    "type": "Formation aéronautique",
    "description": "..."
  }
]
```

## Relations importantes

- `conditions-acces.id_formation` correspond à `formations.id_formation`.
- `archives.id_type` correspond à `types-archives.id_type`.
- `dossiers.id_type_dossier` correspond à `types-dossiers.id_type_dossier`.
- `dossiers.id_candidat` correspond à `candidats.id_candidat`.

## Vérifier l'API

```powershell
docker compose exec backend python manage.py check
Invoke-RestMethod http://localhost:8000/api/formations/
```