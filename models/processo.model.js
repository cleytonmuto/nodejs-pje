'use strict';

module.exports = (sequelize, DataTypes) => {
  const processo = sequelize.define('processos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cnj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pendente: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_520_ci'
  });
  return processo;
};
