const bycrypt = require('bcrypt');
const {Usuario} = require('../models/usuario.js');
const userReqDto = require('../dtos/userReqDto.js');
const userResDto = require('../dtos/userResDto.js');
const crypto = require('crypto');
const { mailSender } = require('../utils/mailSerice.js');

exports.criarUsuarios = async (req, res) => {
    try {
        const dados = userReqDto.reqEntity(req.body);

        const senhaHash = await bycrypt.hash(senha, 10);
        dados.senha = senhaHash;

        const usuario = await Usuario.create(dados);
        res.status(201).json(userResDto.fromEntity(usuario));
    } catch (err) {
        const error = new Error('Erro na criação de usuário.');
        error.statusCode = 400;
        throw error;   
    }
}

exports.solicitarVerificacao = async (req, res) => {
    try {
        const {email} = req.body;
        const usuario = Usuario.findOne({where: {email}});

        if (!usuario) {
            res.status(404).json({erro: 'Not Found, usuário não encontrado'});
        } if (usuario.emailVerificado) {
            res.status(400).json({erro: 'Bad Request, email já verificado.'});
        }

        const codigoVerificacao = crypto.randomInt(100000, 999999);
        const tempoExpiracao = new Date(Date.now + 20 * 60 * 1000);

        await usuario.update({
            codigoVerificacao,
            tempoExpiracao
        });

        const emailEnviado = await mailSender(email, codigoVerificacao);
        if (!emailEnviado) {
            res.status(400).json({erro: 'Erro ao enviar email de verificação.'});
        } 

        res.json('Email de verificação enviado com sucesso.');
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
}

exports.verificarEmail = async (req, res) => {
    try {
        const {email, codigo} = req.body;
        const usuario = Usuario.findOne({where: email});

        if (!usuario) {
            res.status(404).json({ erro: 'Not Found, Erro ao buscar usuário.'});
        } if (usuario.emailVerificado) {
            res.status(400).json({erro: 'Bad Request, email já verificado.'});
        } if (!codigo) {
            res.status(400).json({erro: 'Código é um campo obrigatório, por favor informar.'});
        } if (usuario.codigoVerificacao !== codigo) {
            res.status(401).json({erro: 'Unauthorized, Código inválido.'});
        } if (new Date() > usuario.codigoExpiracao) {
            res.status(401).json({erro: 'Unauthorized, Código já está expirado.'});
        };

        await usuario.update({
            emailVerificado: true,
            codigoVerificacao: null,
            codigoExpiracao: null
        });

        res.json("Usuário verificado com sucesso!");
    } catch (err) {
        res.status(400).json({ erro: err.message});
    }
}