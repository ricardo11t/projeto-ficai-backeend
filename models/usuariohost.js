'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuarioHost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsuarioHost.init({
    bio: DataTypes.TEXT,
    documentoVerificacaoUrl: DataTypes.STRING,
    statusVerificacaoHost: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UsuarioHost',
  });
  return UsuarioHost;
};