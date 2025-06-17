const router = require('express').Router();
const adminController = require('../controllers/adminController.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');

router.post('/', authMiddleware, adminController.criarAdmin);
router.get('/listar-admins', authMiddleware, adminController.listarTodosAdminsEContar);
router.post('/recuperar-senha', adminController.enviarEmailRecuperacaoSenha);