const router = require('express').Router();
const usuarioController = require('../controllers/userController.js');

router.post('/', usuarioController.criarUsuarios);
router.post('/solicitar-verificacao', usuarioController.solicitarVerificacao);
router.post('/verificar-email', usuarioController.verificarEmail);

module.exports = router;