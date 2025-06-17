const userReqDto = {
    toEntity: (body) => {
        return {
            email: body.email,
            senha: body.senha,
            role: body.role,
            emailVerificado: body.emailVerificado || false
        };
    }
};

const userResDto = {
    fromEntity: (usuario) => {
        return {
            id: usuario.id,
            email: usuario.email,
            role: usuario.role,
            emailVerificado: usuario.emailVerificado
        };
    }
};

module.exports = {
    userReqDto,
    userResDto
};