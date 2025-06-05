'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AvaliacaoHospedagems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      notaLimpeza: {
        type: Sequelize.INTEGER
      },
      notaComodidades: {
        type: Sequelize.INTEGER
      },
      notaLocalizacao: {
        type: Sequelize.INTEGER
      },
      notaAtendimentoHost: {
        type: Sequelize.INTEGER
      },
      notaGeral: {
        type: Sequelize.INTEGER
      },
      comentario: {
        type: Sequelize.TEXT
      },
      respostaHost: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AvaliacaoHospedagems');
  }
};