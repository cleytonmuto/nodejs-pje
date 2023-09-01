'use strict';

const express = require('express');
const router = express.Router();

// custom routes
const authRoutes = require('./auth.routes');
const usuarioRoutes = require('./usuario.routes');
const processoRoutes = require('./processo.routes');
const relacaoRoutes = require('./relacao.routes');

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to PJE API.' });
});

router.use('/api/auth', authRoutes);
router.use('/api/usuarios', usuarioRoutes );
router.use('/api/processos', processoRoutes );
router.use('/api/relacoes', relacaoRoutes);

module.exports = router;
