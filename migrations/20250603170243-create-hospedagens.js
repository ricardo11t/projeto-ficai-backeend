'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hospedagens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeDaHospedagem: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      estrelas: {
        type: Sequelize.INTEGER
      },
      enderecoId: {
        type: Sequelize.INTEGER
      },
      hospedagemId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Hospedagens');
  }
};