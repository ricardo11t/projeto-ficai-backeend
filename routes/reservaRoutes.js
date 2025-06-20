const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

// Criar nova reserva
router.post('/', reservaController.criar);

// Listar todas com paginação e ordenação
router.get('/', reservaController.listar);

// Buscar reserva por ID
router.get('/:id', reservaController.buscarPorId);

// Atualizar reserva
router.put('/:id', reservaController.atualizar);

// Deletar reserva
router.delete('/:id', reservaController.deletar);

// Buscar por status da reserva
router.get('/status/:status', reservaController.buscarPorStatus);

module.exports = router;
