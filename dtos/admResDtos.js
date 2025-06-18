module.exports = {
    fromEntity: (admin) => {  
        if (!usuario || !admin.id || !admin.nome || !admin.email || !admin.role) {
            throw new Error('Dados do admin inválidos.');
        }
        return {
            id: admin.id,
            nome: admin.nome,
            email: admin.email,
            role: admin.role
        };
    }
}