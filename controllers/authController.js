const authReqDto = require("../dtos/authReqDto");
const { Usuario } = require("../models/");
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/tokenService");
const authResDto = require("../dtos/authResDto");


exports.login = async (req, res) => {
    try {
        const dados = authReqDto.toEntity(req.body);
        const usuario = Usuario.findOne({where: {email: dados.email}});

        if (!usuario) {
            res.status(404).json({erro: 'Not Found, usuário não encontrado.'});
        } if (!usuario.emailVerificado) {
            res.status(400).json({
                erro: 'Bad Request, email precisa ser verificado para logar.',
                email: usuario.email
            });
        }

        const senhaValida = await bcrypt.compare(dados.senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({erro: "Unauthorized, senha inválida"});
        }

        const token = generateToken(usuario);
        res.json(authResDto.fromEntity(usuario, token));
    } catch (err) {
        res.status(400).json({erro: err.message});
    }
}