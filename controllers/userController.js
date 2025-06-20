const { Usuario } = require('../models/');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { mailSender } = require('../utils/mailSerice.js');
const { userReqDto, userResDto } = require('../dtos/userDtos.js');
const { Op } = require('sequelize');

const userController = {
    criarUsuarios: async (req, res) => {
        try {
            const dados = userReqDto.toEntity(req.body);

            const senhaHash = await bcrypt.hash(dados.senha, 12);
            dados.senha = senhaHash;

            const usuario = await Usuario.create(dados);
            return res.status(201).json(userResDto.fromEntity(usuario));
        } catch (err) {
            return res.status(400).json({ erro: err.message });
        }
    },

    listarTodosUsuariosDeTalRoleEContar: async (req, res) => {
        try {
            const { role } = req.body;
            if (!role) {
                return res.status(400).json({ erro: 'Role é obrigatório.' });
            }

            const { count, rows } = await Usuario.findAndCountAll({
                where: {
                    role: {
                        [Op.like]: `%${role}%`
                    },
                },
                offset: 10,
                limit: 2,
            });

            if (!count || !rows || rows.length === 0) {
                return res.status(404).json({ erro: `Not Found, falha ao buscar usuários ${role}, ou nenhum usuário existe.` });
            }

            const resultCount = rows.map((row) => `${row.id}. ${row.name}, ${row.role}`);
            return res.json(resultCount);
        } catch (err) {
            return res.status(400).json({ erro: err.message });
        }
    },

    buscarUsuarioPorId: async (req, res) => {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ erro: 'Id é um campo obrigatório para buscar por Id.' });
            }
            const user = await Usuario.findByPk(id);
            if (!user) {
                return res.status(404).json({ erro: 'Not Found, usuário com este id não foi encontrado.' });
            }

            return res.json(userResDto.fromEntity(user));
        } catch (err) {
            return res.status(400).json({ erro: err.message });
        }
    },

    solicitarVerificacao: async (req, res) => {
        try {
            const { email } = req.body;
            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                return res.status(404).json({ erro: 'Not Found, usuário não encontrado' });
            }
            if (usuario.emailVerificado) {
                return res.status(400).json({ erro: 'Bad Request, email já verificado.' });
            }

            const codigoVerificacao = crypto.randomInt(100000, 999999);
            const tempoExpiracao = new Date(Date.now() + 20 * 60 * 1000);

            await usuario.update({
                codigoVerificacao,
                tempoExpiracao
            });

            const emailEnviado = await mailSender(email, codigoVerificacao);
            if (!emailEnviado) {
                return res.status(400).json({ erro: 'Erro ao enviar email de verificação.' });
            }

            return res.json('Email de verificação enviado com sucesso.');
        } catch (err) {
            return res.status(400).json({ erro: err.message });
        }
    },

    verificarEmail: async (req, res) => {
        try {
            const { email, codigo } = req.body;
            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario) {
                return res.status(404).json({ erro: 'Not Found, Erro ao buscar usuário.' });
            }
            if (usuario.emailVerificado) {
                return res.status(400).json({ erro: 'Bad Request, email já verificado.' });
            }
            if (!codigo) {
                return res.status(400).json({ erro: 'Código é um campo obrigatório, por favor informar.' });
            }
            if (usuario.codigoVerificacao !== codigo) {
                return res.status(401).json({ erro: 'Unauthorized, Código inválido.' });
            }
            if (new Date() > usuario.tempoExpiracao) {
                return res.status(401).json({ erro: 'Unauthorized, Código já está expirado.' });
            }

            await usuario.update({
                emailVerificado: true,
                codigoVerificacao: null,
                tempoExpiracao: null
            });

            return res.json("Usuário verificado com sucesso!");
        } catch (err) {
            return res.status(400).json({ erro: err.message });
        }
    }
};

module.exports = userController;