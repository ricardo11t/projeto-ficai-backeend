'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AvaliacaoHospedagem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AvaliacaoHospedagem.init({
    notaLimpeza: DataTypes.INTEGER,
    notaComodidades: DataTypes.INTEGER,
    notaLocalizacao: DataTypes.INTEGER,
    notaAtendimentoHost: DataTypes.INTEGER,
    notaGeral: DataTypes.INTEGER,
    comentario: DataTypes.TEXT,
    respostaHost: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AvaliacaoHospedagem',
  });
  return AvaliacaoHospedagem;
};