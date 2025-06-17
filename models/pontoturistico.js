'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PontoTuristico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PontoTuristico.init({
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
  }, {
    sequelize,
    modelName: 'PontoTuristico',
  });
  return PontoTuristico;
};