const router = require('express').Router();
const pontoTuristicoController = require('../controllers/pontoTuristicoController');


router.post('/', pontoTuristicoController.criar);
router.get('/', pontoTuristicoController.listar); // suporta paginação e filtro por lat/lng
router.get('/:id', pontoTuristicoController.buscarPorId);
router.put('/:id', pontoTuristicoController.atualizar);
router.delete('/:id', pontoTuristicoController.deletar);

module.exports = router;
