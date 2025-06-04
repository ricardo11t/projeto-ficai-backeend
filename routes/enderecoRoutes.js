const express = require('express');
const enderecoController = require('../controllers/enderecoController');
const router = express.Router();

router.post('/', enderecoController.registrarEndereco);

module.exports = router;