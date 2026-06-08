/**
 * Alerta Bike - Backend Server
 * Sistema de Segurança e Recuperação de Bicicletas
 */

require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./utils/logger');

// Import routes
const authRoutes = require('./routes/auth.routes');
const bikeRoutes = require('./routes/bike.routes');
const alertRoutes = require('./routes/alert.routes');
const userRoutes = require('./routes/user.routes');
const procedenceRoutes = require('./routes/procedence.routes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

// ============================================
// Security Middleware
// ============================================
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000',
  credentials: process.env.CORS_CREDENTIALS === 'true'
}));

// ============================================
// Body Parser Middleware
// ============================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============================================
// Logging Middleware
// ============================================
app.use(requestLogger);

// ============================================
// Health Check Endpoint
// ============================================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime()
  });
});

// ============================================
// API Routes
// ============================================
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/bikes`, bikeRoutes);
app.use(`${API_PREFIX}/alerts`, alertRoutes);
app.use(`${API_PREFIX}/procedence`, procedenceRoutes);

// ============================================
// Documentation Route
// ============================================
app.get(`${API_PREFIX}`, (req, res) => {
  res.json({
    name: 'Alerta Bike API',
    version: '1.0.0',
    description: 'Sistema de Segurança e Recuperação de Bicicletas',
    endpoints: {
      auth: `${API_PREFIX}/auth`,
      users: `${API_PREFIX}/users`,
      bikes: `${API_PREFIX}/bikes`,
      alerts: `${API_PREFIX}/alerts`,
      procedence: `${API_PREFIX}/procedence`
    },
    documentation: 'https://github.com/fabiodmu-ux/Projeto-Alerta-Bike/blob/main/API.md'
  });
});

// ============================================
// 404 Handler
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.path,
    method: req.method
  });
});

// ============================================
// Error Handler Middleware
// ============================================
app.use(errorHandler);

// ============================================
// Server Startup
// ============================================
const server = app.listen(PORT, () => {
  logger.info(`
    🚀 Alerta Bike Backend iniciado!
    
    📍 Server: http://localhost:${PORT}
    📝 API: http://localhost:${PORT}${API_PREFIX}
    🔍 Health: http://localhost:${PORT}/health
    🌍 Ambiente: ${NODE_ENV}
    
    📖 Documentação: https://github.com/fabiodmu-ux/Projeto-Alerta-Bike
  `);
});

// ============================================
// Graceful Shutdown
// ============================================
process.on('SIGTERM', () => {
  logger.warn('SIGTERM recebido. Encerrando servidor gracefully...');
  server.close(() => {
    logger.info('Servidor encerrado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.warn('SIGINT recebido. Encerrando servidor...');
  process.exit(0);
});

// ============================================
// Uncaught Exception Handler
// ============================================
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
