'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AvaliacaoPontoTuristico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AvaliacaoPontoTuristico.init({
    nota: DataTypes.INTEGER,
    comentario: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AvaliacaoPontoTuristico',
  });
  return AvaliacaoPontoTuristico;
};