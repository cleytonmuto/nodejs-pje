'use strict';

const config = require('../config/db.config');
const usuarioModel = require('./usuario.model');
const roleModel = require('./role.model');
const processoModel = require('./processo.model');
const usuarioRoleModel = require('./usuario_role.model');
const usuarioprocessoModel = require('./usuario_processo.model');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_520_ci',
      timestamps: true
    },
    host: config.HOST,
    dialect: config.dialect,
    logging: console.log,
    operatorAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    timezone: config.timezone
  }
);

const db = Object.create(null);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes;

db.usuario = usuarioModel(sequelize, DataTypes);
db.role = roleModel(sequelize, DataTypes);
db.processo = processoModel(sequelize, DataTypes);
db.usuario_role = usuarioRoleModel(sequelize, DataTypes);
db.usuario_processo = usuarioprocessoModel(sequelize, DataTypes);

db.ROLES = ['user', 'admin'];

db.role.belongsToMany(db.usuario, {
  through: 'usuarios_roles',
  foreignKey: 'roleId',
  otherKey: 'usuarioId',
});

db.usuario.belongsToMany(db.role, {
  through: 'usuarios_roles',
  foreignKey: 'usuarioId',
  otherKey: 'roleId',
});

db.processo.belongsToMany(db.usuario, {
  through: 'usuarios_processos',
  foreignKey: 'processoId',
  otherKey: 'usuarioId',
});

db.usuario.belongsToMany(db.processo, {
  through: 'usuarios_processos',
  foreignKey: 'usuarioId',
  otherKey: 'processoId',
});

module.exports = db;
