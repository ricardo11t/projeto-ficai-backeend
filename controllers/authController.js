const authReqDto = require("../dtos/authReqDto");
const { Usuario } = require("../models/");
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/tokenService");
const authResDto = require("../dtos/authResDto");

exports.login = async (req, res) => {
    try {
        const dados = authReqDto.toEntity(req.body);
        const usuario = await Usuario.findOne({ where: { email: dados.email } });

        if (!usuario) {
            return res.status(404).json({ erro: 'Not Found, usuário não encontrado.' });
        }
        if (!usuario.emailVerificado) {
            return res.status(400).json({
                erro: 'Bad Request, email precisa ser verificado para logar.',
                email: usuario.email
            });
        }

        const senhaValida = await bcrypt.compare(dados.senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: "Unauthorized, senha inválida" });
        }

        const token = generateToken(usuario);
        return res.json(authResDto.fromEntity(usuario, token));
    } catch (err) {
        return res.status(400).json({ erro: err.message });
    }
}