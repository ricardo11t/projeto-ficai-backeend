const bcrypt = require('bcrypt');
const { pontoTuristico } = require('../models/');
const crypto = require('crypto');
const { mailSender } = require('../utils/mailSerice.js');
const { pontoTuristicoReqDto, pontoTuristicoResDto } = require('../dtos/userDtos.js');
const { Op } = require('sequelize');

const pontoTuristicoController = {
    cadastroPontoTuristico: async (req, res) => {
      
    },
    buscarPontoTuristicoPorId: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ erro: 'Id é um campo obrigatório para buscar por Id.' });
            }
            const ponto = await pontoTuristico.findByPk(id);
            if (!ponto) {
                return res.status(404).json({ erro: 'Ponto turístico não encontrado.' });
            }
            return res.json(pontoTuristicoResDto.fromEntity(ponto));
        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    },
}
        