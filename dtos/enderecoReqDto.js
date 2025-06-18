module.exports = {
    toEntity: (body) => {
        if (!body.cep || typeof body.cep !== 'string' || !/^\d{5}-?\d{3}$/.test(body.cep)) {
            throw new Error('CEP inválido. Formato esperado: 00000-000');
        }
        if (!body.estado || typeof body.estado !== 'string') {
            throw new Error('Estado é obrigatório e deve ser uma string.');
        }
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