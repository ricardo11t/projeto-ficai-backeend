'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hospedagem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hospedagem.init({
    nomeHospedagem: DataTypes.STRING,
    descHospedagem: DataTypes.TEXT,
    tipoHospedagem: DataTypes.STRING,
    cep: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    capacidadeMaxima: DataTypes.INTEGER,
    numeroQuartos: DataTypes.INTEGER,
    numeroBanheiros: DataTypes.INTEGER,
    comodidades: DataTypes.JSON,
    regrasCasa: DataTypes.TEXT,
    precoPorNoite: DataTypes.DECIMAL,
    taxaLimpeza: DataTypes.DECIMAL,
    statusHospedagem: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hospedagem',
  });
  return Hospedagem;
};