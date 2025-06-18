const pontoTuristicoReqDto = {
    toEntity: (data) => {
        return {
    nomePonto: DataTypes.STRING,
    descPonto: DataTypes.TEXT,
    cep: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    categoria: DataTypes.STRING,
    horarioFuncionamento: DataTypes.TEXT,
    custoEntrada: DataTypes.DECIMAL,
    acessibilidadeInfo: DataTypes.TEXT,
    aprovado: DataTypes.BOOLEAN
        };
        }
    };
const pontoTuristicoResDto = {
    fromEntity: (pontoTuristico) => {
        return {
    nomePonto: DataTypes.STRING,
    descPonto: DataTypes.TEXT,
    cep: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    categoria: DataTypes.STRING,
    horarioFuncionamento: DataTypes.TEXT,
    custoEntrada: DataTypes.DECIMAL,
    acessibilidadeInfo: DataTypes.TEXT,
    aprovado: DataTypes.BOOLEAN
        };
    }
};

module.exports = {
    pontoTuristicoReqDto,
    pontoTuristicoResDto
};