'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hospedagens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hospedagens.init({
    nomeDaHospedagem: DataTypes.STRING,
    descricao: DataTypes.STRING,
    estrelas: DataTypes.INTEGER,
    enderecoId: DataTypes.INTEGER,
    hospedagemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hospedagens',
  });
  return Hospedagens;
};