'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PontosTuristicos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PontosTuristicos.init({
    nomeDoPonto: DataTypes.STRING,
    descricao: DataTypes.STRING,
    enderecoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PontosTuristicos',
  });
  return PontosTuristicos;
};