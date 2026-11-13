# API REST de Gestion des Projets et des Tâches


**Nom et prénom :** Sirine Dhib

**Classe :** 1ère année Mastère ISIDS

**Année universitaire :** 2026–2027


## Présentation du projet

Ce projet consiste à développer une API REST permettant la gestion des projets et des tâches.

L'application permet aux utilisateurs de créer, consulter, modifier et supprimer leurs projets et leurs tâches. Elle intègre un système d'authentification sécurisé avec JWT ainsi qu'une gestion des droits d'accès selon deux rôles : utilisateur et manager.

## Technologies utilisées

- **Node.js et Express.js** : développement de l'API REST
- **MongoDB Atlas** : base de données
- **Mongoose** : gestion des données
- **JWT** : authentification
- **bcryptjs** : hachage des mots de passe
- **Postman** : test des routes API

## Fonctionnalités

- Inscription et connexion des utilisateurs
- Authentification par JWT
- Gestion des projets (CRUD)
- Gestion des tâches (CRUD)
- Gestion des rôles utilisateur et manager
- Affectation des tâches aux utilisateurs par le manager
- Recherche, filtrage et tri des projets et des tâches
- Protection des routes selon les droits d'accès

## Installation et exécution

**1. Cloner le dépôt**

```bash
git clone https://github.com/sirine-10/dsi-project-management-api.git
cd dsi-project-management-api
```

**2. Installer les dépendances**

```bash
npm install
```

**3. Configurer les variables d'environnement**

Créer un fichier `.env` à la racine du projet :

```env
PORT=5000
MONGO_URI=votre_chaine_de_connexion_mongodb
JWT_SECRET=votre_cle_secrete
```

**4. Démarrer le serveur**

```bash
npm run dev
```

L'API sera accessible à l'adresse `http://localhost:5000`.

## Principales routes API

| Méthode | Route                   | Description                            |
| ------- | ----------------------- | -------------------------------------- |
| POST    | `/api/auth/register`    | Inscription                            |
| POST    | `/api/auth/login`       | Connexion                              |
| GET     | `/api/projects`         | Liste des projets                      |
| POST    | `/api/projects`         | Création d'un projet                   |
| GET     | `/api/projects/:id`     | Consultation d'un projet               |
| PUT     | `/api/projects/:id`     | Modification d'un projet               |
| DELETE  | `/api/projects/:id`     | Suppression d'un projet                |
| GET     | `/api/tasks`            | Liste des tâches                       |
| POST    | `/api/tasks`            | Création d'une tâche                   |
| GET     | `/api/tasks/:id`        | Consultation d'une tâche               |
| PUT     | `/api/tasks/:id`        | Modification d'une tâche               |
| DELETE  | `/api/tasks/:id`        | Suppression d'une tâche                |
| PATCH   | `/api/tasks/:id/assign` | Affectation d'une tâche par un manager |

Les routes protégées nécessitent un token JWT transmis dans l'en-tête `Authorization` sous la forme `Bearer TOKEN`.

## Gestion des rôles

**Utilisateur :** peut créer et gérer ses propres projets ainsi que les tâches associées.

**Manager :** peut consulter l'ensemble des projets et des tâches et affecter des tâches aux utilisateurs.

##

