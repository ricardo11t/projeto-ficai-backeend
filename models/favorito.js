'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favorito.init({
    entidadeTipo: DataTypes.STRING,
    entidadeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorito',
  });
  return Favorito;
};