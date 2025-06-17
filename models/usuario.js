'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      usuarioId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: 'Identificador único do usuário'
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
        comment: 'Email para login e contato'
      },
      nomeCompleto: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Nome completo do usuário'
      },
      hash_senha: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Senha criptografada'
      },
      dataNascimento: {
        type: Sequelize.DATEONLY, // DATEONLY for just date without time
        comment: 'Data de nascimento do usuário'
      },
      emailVerificado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Indica se o email foi verificado'
      },
      codigoVerificacao: {
        type: Sequelize.STRING(6),
        comment: 'Código para verificação de email ou reset de senha'
      },
      codigoExpiracao: {
        type: Sequelize.DATE, // Timestamp with time
        comment: 'Data e hora de expiração do código de verificação'
      },
      role: {
        type: Sequelize.STRING(10),
        allowNull: false,
        comment: "Tipo de usuário: 'comum', 'host', 'admin'"
      },
      telefone: {
        type: Sequelize.STRING(20)
      },
      fotoPerfilUrl: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    await queryInterface.addIndex('Usuarios', ['email']);
    await queryInterface.addIndex('Usuarios', ['role']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};