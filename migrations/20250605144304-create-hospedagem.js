'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hospedagems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeHospedagem: {
        type: Sequelize.STRING
      },
      descHospedagem: {
        type: Sequelize.TEXT
      },
      tipoHospedagem: {
        type: Sequelize.STRING
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
      capacidadeMaxima: {
        type: Sequelize.INTEGER
      },
      numeroQuartos: {
        type: Sequelize.INTEGER
      },
      numeroBanheiros: {
        type: Sequelize.INTEGER
      },
      comodidades: {
        type: Sequelize.JSONB
      },
      regrasCasa: {
        type: Sequelize.TEXT
      },
      precoPorNoite: {
        type: Sequelize.DECIMAL
      },
      taxaLimpeza: {
        type: Sequelize.DECIMAL
      },
      statusHospedagem: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Hospedagems');
  }
};