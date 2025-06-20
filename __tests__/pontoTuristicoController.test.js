const pontoTuristicoController = require('../controllers/pontoTuristicoController');
const { PontoTuristico } = require('../models');

jest.mock('../models', () => ({
  PontoTuristico: {
    findAndCountAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

describe('PontoTuristico Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('listar deve retornar pontos próximos com filtro lat/lng/raio', async () => {
    req.query = { lat: '-3.7', lng: '-38.5', raio: '15', page: '1', limit: '2' };

    const pontosMock = [
      { id: 1, nomePonto: 'Praia do Futuro', latitude: -3.7, longitude: -38.5 },
      { id: 2, nomePonto: 'Beach Park', latitude: -3.8, longitude: -38.6 }
    ];

    PontoTuristico.findAndCountAll.mockResolvedValue({
      count: 2,
      rows: pontosMock
    });

    await pontoTuristicoController.listar(req, res);

    expect(PontoTuristico.findAndCountAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      total: 2,
      pagina: 1,
      pontos: pontosMock
    }));
  });
});
