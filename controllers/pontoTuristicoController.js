const { PontoTuristico } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { mailSender } = require('../utils/mailSerice.js');
const { Op } = require('sequelize');
const Joi = require('joi');
const { literal } = require('sequelize');
const { pontoReqDtos, pontoResDtos } = require('../dtos/pontoTuristicoDtos.js');


const pontoSchema = Joi.object({
  nomePonto: Joi.string().min(3).required(),
  descPonto: Joi.string().allow('').optional(),
  cep: Joi.string().optional(),
  endereco: Joi.string().optional(),
  numero: Joi.string().optional(),
  complemento: Joi.string().optional(),
  bairro: Joi.string().optional(),
  cidade: Joi.string().optional(),
  estado: Joi.string().optional(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  categoria: Joi.string().required(),
  horarioFuncionamento: Joi.string().allow('').optional(),
  custoEntrada: Joi.number().optional(),
  acessibilidadeInfo: Joi.string().allow('').optional(),
  aprovado: Joi.boolean().default(false)
});

const pontoTuristicoController = {
  criar: async (req, res) => {
    // Validação dos dados
    const { error, value } = pontoSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ mensagem: error.details[0].message });
    }

    try {
      const novoPonto = await PontoTuristico.create(value);
      return res.status(201).json(novoPonto);
    } catch (erro) {
      return res.status(400).json({ mensagem: erro.message });
    }
  },

  atualizar: async (req, res) => {
    const { id } = req.params;

    // Validação dos dados - permitimos atualização parcial, então usa .fork para deixar todos opcionais
    const updateSchema = pontoSchema.fork(Object.keys(pontoSchema.describe().keys), (field) => field.optional());
    const { error, value } = updateSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ mensagem: error.details[0].message });
    }

    try {
      const ponto = await PontoTuristico.findByPk(id);
      if (!ponto) {
        return res.status(404).json({ mensagem: 'Ponto turístico não encontrado.' });
      }
      await ponto.update(value);
      return res.status(200).json(ponto);
    } catch (erro) {
      return res.status(400).json({ mensagem: erro.message });
    }
  },

  listar: async (req, res) => {
    const { 
      page = 1, 
      limit = 10, 
      ordenarPor = 'nomePonto', 
      ordem = 'ASC', 
      lat, 
      lng, 
      raio = 10 // raio padrão 10 km 
    } = req.query;

    const offset = (page - 1) * limit;

    // Filtro por proximidade
    let where = {};

    if (lat && lng) {
      // Calcula distância aproximada usando fórmula Haversine
      // Sequelize não tem suporte direto, então usamos literal para calcular
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      const raioNum = parseFloat(raio);

      where = literal(`
        (6371 * acos(
          cos(radians(${latNum})) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(${lngNum})) +
          sin(radians(${latNum})) * sin(radians(latitude))
        )) <= ${raioNum}
      `);
    }

    try {
      let queryOptions = {
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[ordenarPor, ordem.toUpperCase()]],
      };

      if (lat && lng) {
        queryOptions.where = where;
      }

      const { count, rows } = await PontoTuristico.findAndCountAll(queryOptions);

      return res.status(200).json({
        total: count,
        pagina: parseInt(page),
        pontos: rows
      });
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao listar pontos turísticos.' });
    }
  },

  buscarPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const ponto = await PontoTuristico.findByPk(id);
      if (!ponto) {
        return res.status(404).json({ mensagem: 'Ponto turístico não encontrado.' });
      }
      return res.status(200).json(ponto);
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao buscar ponto turístico.' });
    }
  },

  deletar: async (req, res) => {
    const { id } = req.params;
    try {
      const ponto = await PontoTuristico.findByPk(id);
      if (!ponto) {
        return res.status(404).json({ mensagem: 'Ponto turístico não encontrado.' });
      }
      await ponto.destroy();
      return res.status(204).send();
    } catch (erro) {
      return res.status(500).json({ mensagem: 'Erro ao deletar ponto turístico.' });
    }
  }
};

module.exports = pontoTuristicoController;
