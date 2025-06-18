'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', { // Nome da tabela no plural por convenção
      // usuarioId: { // Se você realmente quer 'usuarioId' como nome da PK
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      // OU, se você quer usar a convenção 'id' do Sequelize:
      id: { // Convenção do Sequelize para chave primária
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(255), // varchar(255)
        allowNull: false, // NN
        unique: true // Geralmente, emails são únicos
      },
      nomeCompleto: {
        type: Sequelize.STRING(255), // varchar(255)
        allowNull: false // NN
      },
      hash_senha: {
        type: Sequelize.STRING(255), // string, varchar(255) para o hash
        allowNull: false // NN
      },
      dataNascimento: {
        type: Sequelize.DATEONLY, // date (apenas data, sem hora)
        allowNull: true // Não tem NN na imagem para este campo
      },
      emailVerificado: {
        type: Sequelize.BOOLEAN, // boolean
        allowNull: false, // NN
        defaultValue: false // Geralmente começa como falso
      },
      codigoVerificacao: {
        type: Sequelize.STRING(6), // varchar(6)
        allowNull: true // Não tem NN
      },
      codigoExpiracao: {
        type: Sequelize.DATE, // timestamp (DATETIME no MySQL)
        allowNull: true // Não tem NN
      },
      role: {
        type: Sequelize.ENUM('comum', 'host', 'admin', 'outro'), // varchar(10) ou ENUM
        // Ajuste os valores do ENUM conforme as roles que você terá.
        // Se as roles puderem variar muito, mantenha STRING(10).
        allowNull: false // NN
      },
      telefone: {
        type: Sequelize.STRING(20), // varchar(20)
        allowNull: true // Não tem NN
      },
      fotoPerfilUrl: {
        type: Sequelize.STRING, // string (VARCHAR(255) por padrão)
        allowNull: true // Não tem NN
      },
      created_at: { // Coluna criada pelo Sequelize por padrão, mas com o nome 'createdAt'
        allowNull: false, // NN
        type: Sequelize.DATE // timestamp (DATETIME)
      },
      updated_at: { // Coluna criada pelo Sequelize por padrão, mas com o nome 'updatedAt'
        allowNull: false, // NN
        type: Sequelize.DATE // timestamp (DATETIME)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};