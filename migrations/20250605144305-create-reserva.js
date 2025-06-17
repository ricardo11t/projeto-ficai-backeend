'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataCheckin: {
        type: Sequelize.DATE
      },
      dataCheckout: {
        type: Sequelize.DATE
      },
      numeroHospedes: {
        type: Sequelize.INTEGER
      },
      precoTotalReserva: {
        type: Sequelize.DECIMAL
      },
      observacoes: {
        type: Sequelize.TEXT
      },
      statusReserva: {
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
    await queryInterface.dropTable('Reservas');
  }
};