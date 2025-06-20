const reservaController = require('../controllers/reservaController');
const { Reserva } = require('../models');

jest.mock('../models', () => ({
  Reserva: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
  }
}));

describe('Reserva Controller', () => {
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

  // Teste do método criar (já mostrei antes)
  test('deve criar uma nova reserva com sucesso', async () => {
    req.body = {
      dataCheckin: '2025-07-01',
      dataCheckout: '2025-07-05',
      numeroHospedes: 2,
      precoTotalReserva: 800,
      observacoes: 'Quarto com vista',
      statusReserva: 'pendente'
    };

    const reservaCriada = { id: 1, ...req.body, createdAt: new Date(), updatedAt: new Date() };
    Reserva.create.mockResolvedValue(reservaCriada);

    await reservaController.criar(req, res);

    expect(Reserva.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  // Teste do método listar
  test('deve listar reservas com paginação', async () => {
    req.query = { page: '1', limit: '2', ordenarPor: 'dataCheckin', ordem: 'ASC' };
    const reservasMock = [
      { id: 1, dataCheckin: '2025-07-01', numeroHospedes: 2 },
      { id: 2, dataCheckin: '2025-07-03', numeroHospedes: 4 }
    ];
    Reserva.findAndCountAll.mockResolvedValue({ count: 5, rows: reservasMock });

    await reservaController.listar(req, res);

    expect(Reserva.findAndCountAll).toHaveBeenCalledWith({
      limit: 2,
      offset: 0,
      order: [['dataCheckin', 'ASC']],
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      total: 5,
      pagina: 1,
      reservas: expect.any(Array)
    }));
  });

  // Teste do método buscarPorId (reserva encontrada)
  test('deve buscar reserva por ID com sucesso', async () => {
    req.params = { id: '1' };
    const reservaMock = { id: 1, numeroHospedes: 2 };
    Reserva.findByPk.mockResolvedValue(reservaMock);

    await reservaController.buscarPorId(req, res);

    expect(Reserva.findByPk).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  // Teste do método buscarPorId (reserva não encontrada)
  test('deve retornar 404 se reserva nao encontrada', async () => {
    req.params = { id: '999' };
    Reserva.findByPk.mockResolvedValue(null);

    await reservaController.buscarPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      mensagem: 'Reserva não encontrada.'
    }));
  });

  // Teste do método atualizar (reserva encontrada e atualizada)
  test('deve atualizar reserva com sucesso', async () => {
    req.params = { id: '1' };
    req.body = {
      numeroHospedes: 3,
      precoTotalReserva: 900,
      dataCheckin: '2025-07-01',
      dataCheckout: '2025-07-05'
    };

    const reservaMock = {
      id: 1,
      update: jest.fn().mockResolvedValue(),
      ...req.body
    };

    Reserva.findByPk.mockResolvedValue(reservaMock);

    await reservaController.atualizar(req, res);

    expect(Reserva.findByPk).toHaveBeenCalledWith('1');
    expect(reservaMock.update).toHaveBeenCalledWith(expect.objectContaining(req.body));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  // Teste do método atualizar (reserva não encontrada)
  test('deve retornar 404 ao tentar atualizar reserva não encontrada', async () => {
    req.params = { id: '999' };
    req.body = { numeroHospedes: 3 };
    Reserva.findByPk.mockResolvedValue(null);

    await reservaController.atualizar(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      mensagem: 'Reserva não encontrada.'
    }));
  });

  // Teste do método deletar (reserva encontrada e deletada)
  test('deve deletar reserva com sucesso', async () => {
    req.params = { id: '1' };

    const reservaMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue()
    };

    Reserva.findByPk.mockResolvedValue(reservaMock);

    await reservaController.deletar(req, res);

    expect(Reserva.findByPk).toHaveBeenCalledWith('1');
    expect(reservaMock.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  // Teste do método deletar (reserva não encontrada)
  test('deve retornar 404 ao tentar deletar reserva não encontrada', async () => {
    req.params = { id: '999' };
    Reserva.findByPk.mockResolvedValue(null);

    await reservaController.deletar(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      mensagem: 'Reserva não encontrada.'
    }));
  });

  // Teste do método buscarPorStatus (encontrando reservas)
  test('deve buscar reservas por status com sucesso', async () => {
    req.params = { status: 'pendente' };
    const reservasMock = [
      { id: 1, statusReserva: 'pendente' },
      { id: 2, statusReserva: 'pendente' }
    ];
    Reserva.findAll.mockResolvedValue(reservasMock);

    await reservaController.buscarPorStatus(req, res);

    expect(Reserva.findAll).toHaveBeenCalledWith({ where: { statusReserva: 'pendente' } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });

  // Teste do método buscarPorStatus (nenhuma reserva encontrada)
  test('deve retornar 404 se nenhuma reserva encontrada por status', async () => {
    req.params = { status: 'cancelada' };
    Reserva.findAll.mockResolvedValue([]);

    await reservaController.buscarPorStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      mensagem: 'Nenhuma reserva encontrada com esse status.'
    }));
  });
});
// Este é um exemplo de como você pode estruturar os testes para o controlador de reservas.
