const bcrypt = require('bcrypt');
const { admin } = require('../models/');
const crypto = require('crypto');
const { mailSender } = require('../utils/mailSerice.js');
const { admReqDto, admResDto } = require('../dtos/userDtos.js');

const adminController = {
    criarAdmin: async (req, res) => {
        try {
            const dados = admReqDto.toEntity(req.body);

            const senhaHash = await bcrypt.hash(dados.senha, 12);
            dados.senha = senhaHash;

            const admin = await Usuario.create(dados);
            return res.status(201).json(admResDto.fromEntity(admin));
        } catch (err) {
            return res.status(400).json({ erro: err.message });
        }
    },

    listarTodosAdminsEContar: async (req, res) => {
        try {
            const { count, rows } = await Usuario.findAndCountAll({
                where: {
                    role: 'admin'
                },
                offset: 10,
                limit: 2,
            });

            if (!count || !rows) {
                return res.status(404).json({ erro: 'Not Found, falha ao buscar usuários admin, ou nenhum usuário admin existe.' });
            }

            const resultCount = rows.map((row) => `${row.id}. ${row.name}, ${row.role}`);
            return res.json(resultCount);
        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    },

 enviarEmailRecuperacaoSenha: async (req, res) => {
    try {
        const { email } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        usuario.tokenRecuperacaoSenha = token;
        await usuario.save();

        const linkRecuperacao = `http://localhost:3000/recuperar-senha/${token}`;
        await mailSender(usuario.email, 'Recuperação de Senha', `Clique no link para recuperar sua senha: ${linkRecuperacao}`);

        return res.status(200).json({ mensagem: 'Email de recuperação enviado com sucesso.' });
    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
},   

   buscarAdmPorId: async (req, res) => {
 const { id } = req.params;


  // Verifica se o ID foi informado antes de qualquer operação
  if (!id) {
    return res.status(400).json({ erro: 'Id é um campo obrigatório para buscar por Id.' });
  }

  try {
    // Suponha que esteja usando algum model, por exemplo:
    const adm = await admin.findByPk(id);

    if (!adm) {
  return res.status(404).json({ erro: 'Administrador não encontrado.' });
}

return res.status(200).json(adm);

    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
}
};

module.exports = adminController