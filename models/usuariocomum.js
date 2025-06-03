'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuarioComum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsuarioComum.init({
    nomeCompleto: DataTypes.STRING,
    dataNascimento: DataTypes.DATE,
    usuarioId: DataTypes.STRING,
    enderecoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsuarioComum',
  });
  return UsuarioComum;
};