module.exports = {
    toEntity: (body) => {
        if (!body.email || typeof body.email !== 'string') {
            throw new Error("Email é obrigatório");
        } if (!body.senha || typeof body.senha !== 'string') {
            throw new Error("Senha é obrigatoria.");
        }
        return {
            email: body.email,
            senha: body.senha
        }
    }
}