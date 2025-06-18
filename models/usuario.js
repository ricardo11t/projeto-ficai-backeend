// src/models/user.js
'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs'); // Importe o bcryptjs para o hashing de senha

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Hospedagem, { foreignKey: 'usuarioHostId', as: 'hospedagens' });
      // Se você tiver modelos Aluno e Professor (discutidos anteriormente), adicione aqui:
      // User.hasOne(models.Aluno, { foreignKey: 'userId', as: 'alunoInfo' });
      // User.hasOne(models.Professor, { foreignKey: 'userId', as: 'professorInfo' });
    }

    // Método de instância para comparar senhas (útil para login)
    async isValidPassword(password) {
      return await bcrypt.compare(password, this.hash_senha);
    }
  }

  User.init({
    // id: { // O Sequelize cria 'id' por padrão como PK auto-increment, se não especificado
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false
    // },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Garante que cada email seja único
      validate: {
        isEmail: true // Valida se é um formato de email válido
      }
    },
    nomeCompleto: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    hash_senha: {
      type: DataTypes.STRING(255), // Use um tamanho adequado para o hash da senha (bcrypt gera ~60-72 chars)
      allowNull: false
    },
    dataNascimento: {
      type: DataTypes.DATEONLY, // 'date' na imagem corresponde a DATEONLY no Sequelize para apenas data
      allowNull: true // Não é NN na imagem
    },
    emailVerificado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false // Valor padrão para email não verificado
    },
    codigoVerificacao: {
      type: DataTypes.STRING(6),
      allowNull: true // Não é NN na imagem
    },
    codigoExpiracao: {
      type: DataTypes.DATE, // 'timestamp' na imagem corresponde a DATE no Sequelize
      allowNull: true // Não é NN na imagem
    },
    role: {
      type: DataTypes.ENUM('comum', 'host', 'admin', 'outro'), // Use ENUM para roles bem definidas
      allowNull: false,
      defaultValue: 'comum' // Defina uma role padrão
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true // Não é NN na imagem
    },
    fotoPerfilUrl: {
      type: DataTypes.STRING, // VARCHAR(255) por padrão
      allowNull: true // Não é NN na imagem
    }
    // createdAt e updatedAt são gerenciados automaticamente pelo Sequelize com `timestamps: true`
    // e mapeados para `created_at` e `updated_at` com `underscored: true`
  }, {
    sequelize,
    modelName: 'User', // Nome do modelo (singular)
    tableName: 'usuarios', // Nome da tabela no banco de dados (plural, conforme sua migração)
    timestamps: true, // Habilita created_at e updated_at
    underscored: true, // Garante que as colunas de timestamp sejam em snake_case (created_at, updated_at)
    hooks: {
      // Hook 'beforeCreate' para fazer o hash da senha antes de salvar um novo usuário
      beforeCreate: async (user) => {
        if (user.hash_senha) {
          const salt = await bcrypt.genSalt(10); // Gere um salt
          user.hash_senha = await bcrypt.hash(user.hash_senha, salt); // Faça o hash da senha
        }
      },
      // Hook 'beforeUpdate' para fazer o hash da senha se ela for alterada
      beforeUpdate: async (user) => {
        // user.changed('hash_senha') verifica se a senha foi modificada
        if (user.changed('hash_senha') && user.hash_senha) {
          const salt = await bcrypt.genSalt(10);
          user.hash_senha = await bcrypt.hash(user.hash_senha, salt);
        }
      }
      // Se você ainda quiser o hook 'afterCreate' para criar Aluno/Professor, adicione-o aqui.
      // Exemplo (revisitado, caso não tenha colocado no controller):
      /*
      ,
      afterCreate: async (user, options) => {
        try {
          if (user.role === 'aluno') {
            await user.createAlunoInfo({
              userId: user.id,
              matricula: 'AQUI_GERAR_MATRICULA',
              curso: 'AQUI_DEFINIR_CURSO'
            }, { transaction: options.transaction });
          } else if (user.role === 'professor') {
            await user.createProfessorInfo({
              userId: user.id,
              areaAtuacao: 'AQUI_DEFINIR_AREA',
              titulacao: 'AQUI_DEFINIR_TITULACAO'
            }, { transaction: options.transaction });
          }
        } catch (error) {
          console.error('Erro no hook afterCreate do usuário:', error);
          // É crucial que o erro seja relançado para que a transação seja revertida
          throw error;
        }
      }
      */
    }
  });

  return User;
};