'use strict';

module.exports = (sequelize, DataTypes) => {
  const Usuario_processo = sequelize.define('usuarios_processos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    processoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
  return Usuario_processo;
};
