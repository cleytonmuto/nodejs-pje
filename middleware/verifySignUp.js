'use strict';

const db = require('../models');
const ROLES = db.ROLES;
const Usuario = db.usuario;

const checkDuplicates = (req, res, next) => {
  // Email
  Usuario.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: 'Erro. Email já cadastrado.'
        });
        return;
      }
      // CPF
      Usuario.findOne({
        where: {
          cpf: req.body.cpf
        }
      })
        .then((user) => {
          if (user) {
            res.status(400).send({
              message: 'Erro. CPF já cadastrado.'
            });
            return;
          }
          // Name
          Usuario.findOne({
            where: {
              name: req.body.name
            }
          })
            .then((user) => {
              if (user) {
                res.status(400).send({ message: 'Erro. Nome já cadastrado.' });
                return;
              }
              next();
            });
        });
    });
};

const checkRoles = (req, res, next) => {
  if (req.body.roles) {
    req.body.roles.forEach((role) => {
      if (!ROLES.includes(role)) {
        res.status(400).send({
          message: `Erro. Perfil inexistente = ${role}`
        });
        return;
      }
    });
  }
  next();
};

module.exports = { checkDuplicates, checkRoles };
