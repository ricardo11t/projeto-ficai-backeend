const { Hospedagem } = require('../models/');
const { hospedagemReqDto, hospedagemResDto } = require('../dtos/hospedagemDtos.js');


const hospedagemController = {
    

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
    },
    // Adicione mais métodos conforme necessário
    avaliacaoHospedagem: async (req, res) => {
        try {
            const { id } = req.params;
            const avaliacao = hospedagemReqDto.toEntity(req.body);
            const hospedagem = await Hospedagem.findByPk(id);

            if (!hospedagem) {
                return res.status(404).json({ erro: 'Hospedagem não encontrada.' });
            }


            return res.status(201).json({ mensagem: 'Avaliação criada com sucesso.' });
        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    }

    // Outros métodos do controller podem ser adicionados aqui



};

module.exports = hospedagemController;