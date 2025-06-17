module.exports = {
    fromEntity: (usuario) => {  
        if (!usuario || !usuario.id || !usuario.nome || !usuario.email || !usuario.role) {
            throw new Error('Dados do usuário inválidos.');
        }
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role
        };
    }
}