'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PontoTuristicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomePonto: {
        type: Sequelize.STRING
      },
      descPonto: {
        type: Sequelize.TEXT
      },
      cep: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      complemento: {
        type: Sequelize.STRING
      },
      bairro: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL
      },
      longitude: {
        type: Sequelize.DECIMAL
      },
      categoria: {
        type: Sequelize.STRING
      },
      horarioFuncionamento: {
        type: Sequelize.TEXT
      },
      custoEntrada: {
        type: Sequelize.DECIMAL
      },
      acessibilidadeInfo: {
        type: Sequelize.TEXT
      },
      aprovado: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('PontoTuristicos');
  }
};