# 🏋️ Backend - Gestion Salle de Sport (MERN)

## Installation

```bash
cd salle-sport-backend
npm install
npm run dev
```

Le serveur démarre sur **http://localhost:5000**

---

## Structure du projet

```
salle-sport-backend/
├── config/
│   └── db.js               # Connexion MongoDB
├── models/
│   ├── User.js             # Modèle de base (abstrait)
│   ├── Admin.js            # Hérite de User
│   ├── Coach.js            # Hérite de User
│   ├── Client.js           # Hérite de User
│   ├── Internaute.js       # Hérite de User
│   ├── Planning.js
│   ├── Message.js
│   ├── Salle.js
│   └── Notification.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── planningController.js
│   ├── messageController.js
│   ├── notificationController.js
│   └── salleController.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── planningRoutes.js
│   ├── messageRoutes.js
│   └── otherRoutes.js
├── middlewares/
│   └── auth.js             # JWT + vérification rôles
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## Variables d'environnement (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://manel:manel1234@cluster0.l9o4cur.mongodb.net/salle_de_sport?retryWrites=true&w=majority
JWT_SECRET=salle_sport_jwt_secret_2025_mern_project
JWT_EXPIRE=7d
```

---

## 📋 Toutes les Routes API

### 🔐 Auth — `/api/auth`

| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| POST | `/api/auth/inscription` | Public | Créer un compte |
| POST | `/api/auth/connexion` | Public | Se connecter |
| GET | `/api/auth/moi` | Privé | Mon profil |
| PUT | `/api/auth/modifier-mot-de-passe` | Privé | Changer mot de passe |

**Exemple inscription :**
```json
POST /api/auth/inscription
{
  "nom": "Dkhili",
  "prenom": "Arwa",
  "email": "arwa@gmail.com",
  "motDePasse": "arwa1234",
  "role": "client",
  "abonnement": "mensuel"
}
```

**Exemple connexion :**
```json
POST /api/auth/connexion
{
  "email": "arwa@gmail.com",
  "motDePasse": "arwa1234"
}
```

---

### 👥 Utilisateurs — `/api/users`

| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| GET | `/api/users` | Admin | Tous les users |
| GET | `/api/users/:id` | Privé | Un user |
| PUT | `/api/users/:id` | Privé | Modifier un user |
| DELETE | `/api/users/:id` | Admin | Supprimer |
| GET | `/api/users/coachs/disponibles` | Public | Coachs disponibles |
| GET | `/api/users/stats` | Admin | Statistiques |

---

### 📅 Planning — `/api/planning`

| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| GET | `/api/planning` | Public | Tous les plannings |
| GET | `/api/planning/:id` | Public | Un planning |
| POST | `/api/planning` | Admin | Créer planning |
| PUT | `/api/planning/:id` | Admin | Modifier |
| DELETE | `/api/planning/:id` | Admin | Supprimer |
| POST | `/api/planning/:id/inscription` | Client | S'inscrire séance |
| DELETE | `/api/planning/:id/inscription` | Client | Se désinscrire |

---

### 💬 Messages — `/api/messages`

| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| POST | `/api/messages` | Privé | Envoyer message |
| GET | `/api/messages/recus` | Privé | Messages reçus |
| GET | `/api/messages/envoyes` | Privé | Messages envoyés |
| PUT | `/api/messages/:id/lu` | Privé | Marquer lu |

---

### 🔔 Notifications — `/api/notifications`

| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| GET | `/api/notifications` | Privé | Mes notifications |
| PUT | `/api/notifications/:id/lu` | Privé | Marquer lue |
| DELETE | `/api/notifications/:id` | Privé | Supprimer |

---

### 🏢 Salle — `/api/salle`

| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| GET | `/api/salle` | Public | Infos salle |
| POST | `/api/salle` | Admin | Créer salle |
| PUT | `/api/salle/:id` | Admin | Modifier salle |

---

## 🔑 Utiliser le token JWT

Après connexion, ajoute le token dans le header de chaque requête protégée :

```
Authorization: Bearer <ton_token>
```

---

## 👤 Rôles disponibles

| Rôle | Description |
|------|-------------|
| `admin` | Accès complet |
| `coach` | Voir planning, profil clients |
| `client` | Inscription séances, abonnement |
| `internaute` | Voir cours, salle, coachs |
