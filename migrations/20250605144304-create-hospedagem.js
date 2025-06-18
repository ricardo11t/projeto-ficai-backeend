'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hospedagens', { // Nome da tabela no plural por convenção
      id: { // hospedagemId como PK
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'hospedagemId' // Mapeia o nome da coluna no BD
      },
      usuarioHostId: {
        type: Sequelize.INTEGER,
        allowNull: false, // NN
        references: { // Chave estrangeira para o usuário host
          model: 'usuarios', // Nome da tabela de usuários
          key: 'id', // Coluna de referência na tabela de usuários
        },
        onUpdate: 'CASCADE', // Opcional: atualiza se o ID do usuário mudar
        onDelete: 'CASCADE', // Opcional: deleta hospedagens se o host for deletado
      },
      nomeHospedagem: {
        type: Sequelize.STRING(255), // varchar(255)
        allowNull: false // NN
      },
      descHospedagem: {
        type: Sequelize.TEXT, // text
        allowNull: true // Não é NN
      },
      tipoHospedagem: {
        type: Sequelize.STRING(50), // varchar(50)
        allowNull: false // NN
      },
      cep: {
        type: Sequelize.STRING(9), // varchar(9)
        allowNull: true // Não é NN
      },
      endereco: {
        type: Sequelize.STRING(255), // varchar(255)
        allowNull: false // NN
      },
      numero: {
        type: Sequelize.STRING(20), // varchar(20)
        allowNull: true // Não é NN
      },
      complemento: {
        type: Sequelize.STRING(100), // varchar(100)
        allowNull: true // Não é NN
      },
      bairro: {
        type: Sequelize.STRING(100), // varchar(100)
        allowNull: true // Não é NN
      },
      cidade: {
        type: Sequelize.STRING(100), // varchar(100)
        allowNull: false // NN
      },
      estado: {
        type: Sequelize.STRING(2), // varchar(2)
        allowNull: false // NN
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8), // decimal(10,8)
        allowNull: true // Não é NN
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8), // decimal(11,8)
        allowNull: true // Não é NN
      },
      capacidadeMaxima: {
        type: Sequelize.INTEGER, // integer
        allowNull: false // NN
      },
      numeroQuartos: {
        type: Sequelize.INTEGER, // integer
        allowNull: true // Não é NN
      },
      numeroBanheiros: {
        type: Sequelize.INTEGER, // integer
        allowNull: true // Não é NN
      },
      comodidades: {
        type: Sequelize.JSON, // JSONB na imagem, mas MySQL usa JSON
        allowNull: true // Não é NN
      },
      regrasCasa: {
        type: Sequelize.TEXT, // text
        allowNull: true // Não é NN
      },
      precoPorNoite: {
        type: Sequelize.DECIMAL(10, 2), // decimal(10,2)
        allowNull: false // NN
      },
      taxaLimpeza: {
        type: Sequelize.DECIMAL(10, 2), // decimal(10,2)
        allowNull: false // NN
      },
      statusHospedagem: {
        type: Sequelize.STRING(20), // varchar(20) - ex: 'disponivel', 'reservada', 'inativa'
        allowNull: false, // NN
        defaultValue: 'disponivel' // Pode ter um valor padrão
      },
      createdAt: { // Sequelize convention
        allowNull: false, // NN
        type: Sequelize.DATE, // timestamp
        field: 'created_at' // Mapeia para created_at no BD
      },
      updatedAt: { // Sequelize convention
        allowNull: false, // NN
        type: Sequelize.DATE, // timestamp
        field: 'updated_at' // Mapeia para updated_at no BD
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hospedagens');
  }
};