const { Reserva } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { mailSender } = require('../utils/mailSerice.js');
const {Op} = require('sequelize');
const reservaDtos = require('../dtos/reservaDtos.js');


const reservaController = {
  // Criar nova reserva com validação
  criar: async (req, res) => {
    try {
      const { dataCheckin, dataCheckout, numeroHospedes, precoTotalReserva } = req.body;

      // Validação (opção 1)   
      if (!dataCheckin || !dataCheckout) {
        return res.status(400).json({ mensagem: 'Datas de check-in e check-out são obrigatórias.' });
      }

      if (!numeroHospedes || numeroHospedes <= 0) {
        return res.status(400).json({ mensagem: 'Número de hóspedes deve ser maior que zero.' });
      }

      if (!precoTotalReserva || precoTotalReserva <= 0) {
        return res.status(400).json({ mensagem: 'Preço total inválido.' });
      }

      const novaReserva = await Reserva.create(req.body);
      return res.status(201).json(novaReserva);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao criar reserva.' });
    }
  },

  // Listar todas as reservas com paginação e ordenação 
  listar: async (req, res) => {
    const { page = 1, limit = 10, ordenarPor = 'dataCheckin', ordem = 'ASC' } = req.query;
    const offset = (page - 1) * limit;

    try {
      const { count, rows } = await Reserva.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[ordenarPor, ordem.toUpperCase()]],
      });

      return res.status(200).json({
        total: count,
        pagina: parseInt(page),
        reservas: rows,
      });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao listar reservas.' });
    }
  },

  // Buscar reserva por ID
  buscarPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
      }
      return res.status(200).json(reserva);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao buscar reserva.' });
    }
  },

  // Atualizar reserva com validação
  atualizar: async (req, res) => {
    const { id } = req.params;
    try {
      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
      }

      const { numeroHospedes, precoTotalReserva } = req.body;

      // Validação parcial
      if (numeroHospedes && numeroHospedes <= 0) {
        return res.status(400).json({ mensagem: 'Número de hóspedes inválido.' });
      }

      if (precoTotalReserva && precoTotalReserva <= 0) {
        return res.status(400).json({ mensagem: 'Preço total inválido.' });
      }

      await reserva.update(req.body);
      return res.status(200).json(reserva);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao atualizar reserva.' });
    }
  },

  // Deletar reserva por ID
  deletar: async (req, res) => {
    const { id } = req.params;
    try {
      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
      }
      await reserva.destroy();
      return res.status(204).send();
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao deletar reserva.' });
    }
  },

  // Buscar por status da reserva
  buscarPorStatus: async (req, res) => {
    const { status } = req.params;
    try {
      const reservas = await Reserva.findAll({
        where: { statusReserva: status }
      });

      if (reservas.length === 0) {
        return res.status(404).json({ mensagem: 'Nenhuma reserva encontrada com esse status.' });
      }

      return res.status(200).json(reservas);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao buscar reservas por status.' });
    }
  },
};

module.exports = reservaController;
