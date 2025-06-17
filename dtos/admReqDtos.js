module.exports = {
    toEntity: (body) => {   
        if (!body.nome || typeof body.nome !== 'string' || body.nome.length < 3) {
            throw new Error('Nome inválido. Deve ter pelo menos 3 caracteres.');
        }
        if (!body.email || typeof body.email !== 'string' || !/\S+@\S+\.\S+/.test(body.email)) {
            throw new Error('Email inválido.');
        }
        if (!body.senha || typeof body.senha !== 'string' || body.senha.length < 6) {
            throw new Error('Senha inválida. Deve ter pelo menos 6 caracteres.');
        }
        return {
            nome: body.nome,
            email: body.email,
            senha: body.senha,
            role: 'admin'
        };
    }
}