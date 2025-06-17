const router = require('express').Router();
const hospedagemController = require('../controllers/hospedagemController.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

router.post('/', authMiddleware, hospedagemController.criarHospedagem);
router.get('/:numero', authMiddleware, hospedagemController.buscarHospedagensporNumero);