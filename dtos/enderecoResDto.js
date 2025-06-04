module.exports = {
    fromEntity: (endereco) => {
        return {
            endereco: endereco.rua,
            rua: endereco.rua,
            numero: endereco.numero,
            cidade: endereco.cidade,
            estado: endereco.endereco,
            cep: endereco.cep,
            complemento: endereco.complemento,
            createdAt: endereco.createdAt,
            updatedAt: endereco.updatedAt
        }
    }
}