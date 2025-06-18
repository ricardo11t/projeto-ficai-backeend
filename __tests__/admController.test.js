jest.mock('../models/', () => ({
    Usuario: {
        findByPk: jest.fn()
    }
}));
jest.mock('../utils/mailSerice.js', () => ({
    mailSender: jest.fn()
}));

const adminController = require('../controllers/adminController');

describe('adminController', () => {
   const req = {
  params: {} // id não está aqui, mas params existe
};
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};

  it('deve retornar erro 400 se id não for fornecido', async () => {
    await adminController.buscarAdmPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      erro: 'Id é um campo obrigatório para buscar por Id.'
    });
  });

    // Adicione mais testes conforme necessário
});