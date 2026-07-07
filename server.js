const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

// Connexion MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const planningRoutes = require('./routes/planningRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notifRouter, salleRouter } = require('./routes/otherRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/planning', planningRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notifRouter);
app.use('/api/salle', salleRouter);

// Route de test
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🏋️ API Salle de Sport - Backend opérationnel !',
    version: '1.0.0',
    routes: [
      'POST /api/auth/inscription',
      'POST /api/auth/connexion',
      'GET  /api/auth/moi',
      'GET  /api/users',
      'GET  /api/planning',
      'POST /api/messages',
      'GET  /api/notifications',
      'GET  /api/salle',
    ],
  });
});

// Gestion des routes inexistantes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route introuvable.' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
