'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imagem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Imagem.init({
    entidadeTipo: DataTypes.STRING,
    entidadeId: DataTypes.INTEGER,
    urlImagem: DataTypes.STRING,
    legenda: DataTypes.TEXT,
    ordem: DataTypes.INTEGER,
    isPrincipal: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Imagem',
  });
  return Imagem;
};