const { Hospedagem } = require('../models/');
const { hospedagemReqDto, hospedagemResDto } = require('../dtos/hospedagemDtos.js');


const hospedagemController = {
    criarHospedagem: async (req, res) => {
        try {
            const dados = hospedagemReqDto.toEntity(req.body);

            const hospedagem = await Hospedagem.create(dados);
            return res.status(201).json(hospedagemResDto.fromEntity(hospedagem));
        } catch (err) {
            return res.status(400).json({ erro: err.message });
        }
    },

    buscarHospedagensporNumero: async (req, res) => {
        try {
            const { numero } = req.params;
            const hospedagem = await Hospedagem.findOne({ where: { numero } });

            if (!hospedagem) {
                return res.status(404).json({ erro: 'Hospedagem não encontrada.' });
            }

            return res.json(hospedagemResDto.fromEntity(hospedagem));
        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    },

    buscarHospedagens: async (req, res) => {
        try {
            const hospedagens = await Hospedagem.findAll();
            return res.json(hospedagens.map(hospedagem => hospedagemResDto.fromEntity(hospedagem)));
        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    },

    listarporPrecos: async (req, res) => {
        try {
            const { precoMaximo } = req.query;
            const hospedagens = await Hospedagem.findAll({
                where: {
                    precoPorNoite: {
                        [Op.lte]: precoMaximo
                    }
                }
            });

            if (hospedagens.length === 0) {
                return res.status(404).json({ erro: 'Nenhuma hospedagem encontrada com o preço especificado.' });
            }

            return res.json(hospedagens.map(hospedagem => hospedagemResDto.fromEntity(hospedagem)));
        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    }
};

module.exports = hospedagemController;