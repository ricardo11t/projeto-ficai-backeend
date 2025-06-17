const bycript = require('bcrypt');
const { Hospedagem } = require('../models/');
const crypto = require('crypto');
const { mailSender } = require('../utils/mailSerice.js');
const { hospedagemReqDto, hospedagemResDto } = require('../dtos/hospedagemDtos.js');

exports.criarHospedagem = async (req, res) => {
    try {
        const dados = hospedagemReqDto.toEntity(req.body);

        const hospedagem = await Hospedagem.create(dados);
        res.status(201).json(hospedagemResDto.fromEntity(hospedagem));
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.buscarHospedagensporNumero = async (req, res) => {
    try {
        const { numero } = req.params;
        const hospedagem = await Hospedagem.findOne({ where: { numero } });

        if (!hospedagem) {
            return res.status(404).json({ erro: 'Hospedagem não encontrada.' });
        }

        res.json(hospedagemResDto.fromEntity(hospedagem));
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}

exports.