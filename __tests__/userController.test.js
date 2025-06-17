jest.mock('../models/', () => ({
    Usuario: {
        findByPk: jest.fn()
    }
}));
jest.mock('../utils/mailSerice.js', () => ({
    mailSender: jest.fn()
}));

const userController = require('../controllers/userController');

describe('userController', () => {
    test('deve retornar erro se id não for informado em buscarUsuarioPorId', async () => {
        const req = { body: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await userController.buscarUsuarioPorId(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ erro: 'Id é um campo obrigatório para buscar por Id.' });
    });
});