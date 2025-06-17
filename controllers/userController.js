const bcrypt = require('bcrypt');
const { Usuario } = require('../models/');
const crypto = require('crypto');
const { mailSender } = require('../utils/mailSerice.js');
const { userReqDto, userResDto } = require('../dtos/userDtos.js');

exports.criarUsuarios = async (req, res) => {
    try {
        const dados = userReqDto.toEntity(req.body);

        const senhaHash = await bcrypt.hash(dados.senha, 12);
        dados.senha = senhaHash;

        const usuario = await Usuario.create(dados);
        res.status(201).json(userResDto.fromEntity(usuario));
    } catch (err) {
        res.status(400).json({erro: err.message})
    }
}

exports.listarTodosUsuariosDeTalRoleEContar = async (req, res) => {
    try {
        const role = req.body;
        if (role.role === "host") {
            const {count, rows} = await Usuario.findAndCountAll({
            where: {
                role: {
                   [Op.like]: `%${role.role}%`
                },
            },
            offset: 10,
            limit: 2,
        })
        if (!count || !rows) {
            res.status(404).json({erro: `Not Found, falha ao buscar usuários ${role.role}, ou nenhum usuário comum existe.`});
        }
        const resultCount = count.map((count) => {rows.map((row) => {`${count}. ${row.name}, ${row.role}`})});
        res.json(resultCount);
        } if (role.role === "comum") {
            const {count, rows} = await Usuario.findAndCountAll({
            where: {
                role: {
                   [Op.like]: `%${role.role}%`
                },
            },
            offset: 10,
            limit: 2,
        })
        if (!count || !rows) {
            res.status(404).json({erro: `Not Found, falha ao buscar usuários ${role.role}, ou nenhum usuário comum existe.`});
        }
        const resultCount = count.map((count) => {rows.map((row) => {`${count}. ${row.name}, ${row.role}`})});
        res.json(resultCount);
        } if ( role.role === "admin") {
            const {count, rows} = await Usuario.findAndCountAll({
            where: {
                role: {
                   [Op.like]: `%${role.role}%`
                },
            },
            offset: 10,
            limit: 2,
        })
        if (!count || !rows) {
            res.status(404).json({erro: `Not Found, falha ao buscar usuários ${role.role}, ou nenhum usuário comum existe.`});
        }
        const resultCount = count.map((count) => {rows.map((row) => {`${count}. ${row.name}, ${row.role}`})});
        res.json(resultCount);
        }
    } catch (err) {
        res.status(400).json({erro: err.message})
    }
}

exports.buscarUsuarioPorId = async (req, res) => {
    try {
        const id = req.body
        if (!id) {
            throw new Error('Id é um campo obrigatório para buscar por Id.');
        }
        const user = Usuario.findById({where: {id: id}});
        if (!user) {
            res.status(404).json({erro: 'Not Found, usuário com este id não foi encontrado.'});
        }

        res.json(user)
    } catch (err) {
        res.status(400).json({erro: err.message})
    }
}

exports.solicitarVerificacao = async (req, res) => {
    try {
        const {email} = req.body;
        const usuario = Usuario.findOne({where: {email: email}});

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