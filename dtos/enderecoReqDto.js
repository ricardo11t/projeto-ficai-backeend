module.exports = {
    toEntity: (body) => {
        if (!body.cep || typeof body.cep !== 'string' || !/^\d{5}-?\d{3}/.test(body.cep)) //00000-000
        return {
        rua: body.rua,
        numero: body.numero,
        cidade: body.cidade,
        estado: body.estado.toUpperCase(),
        cep: body.cep,
        complemento: body.complemento 
        }
    }
}