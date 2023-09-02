'use strict';

const db = require('../models');
const Processo = db.processo;
const Op = db.Sequelize.Op;
const { json2xml } = require('xml-js');

// Cria e salva um novo processo
const create = (req, res) => {
  // Valida requisicao
  if (!req.body.cnj) {
    res.status(400).send({
      message: 'Conteúdo não pode ser vazio.',
      type: 'error'
    });
    return;
  }

  // Propriedades do objeto processo
  const processo = {
    id: req.body.id,
    cnj: req.body.cnj,
    nome: req.body.nome,
    documento: req.body.documento,
    email: req.body.email,
    endereco: req.body.endereco,
    pendente: req.body.pendente
  };

  // Salva o processo na base
  Processo.create(processo)
    .then((data) => {
      res.status(200).send({
        data: data,
        message: 'processo cadastrado com sucesso.',
        type: 'success'
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao cadastrar processo.',
        type: 'error'
      });
    });
};

// Retorna todas os processos
const findAll = (req, res) => {
  const limit = parseInt(req.query.limit) || 20
  const page = parseInt(req.query.page) || 1
  const offset = (page - 1) * limit;
  Processo.findAll({
    limit: limit,
    offset: offset,
    order: [
      ['id', 'ASC']
    ]
  }).then((data) => {
    console.log(data);
    res.status(200).send(data);
  })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao consultar processo.'
      });
    });
};

// Conta linhas
const countRows = (req, res) => {
  Processo.count()
    .then((data) => {
      let countRows = {
        numLinhas: data
      }
      res.status(200).send(countRows);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao consultar número de processo.'
      });
    });
}

// Retorna todos os processos
const findShort = (req, res) => {
  const limit = parseInt(req.query.limit) || 20
  const page = parseInt(req.query.page) || 1
  const offset = (page - 1) * limit;
  Processo.findAll({
    attributes: ['id', 'cnj', 'nome', 'documento', 'email', 'endereco', 'pendente'],
    limit: limit,
    offset: offset,
    order: [
      ['id', 'ASC']
    ]
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao consultar processo.'
      });
    });
};

// Retorna todos os processos
const findReducedAll = (req, res) => {
  const limit = parseInt(req.query.limit) || 20
  const page = parseInt(req.query.page) || 1
  const offset = (page - 1) * limit;
  Processo.findAll({
    attributes: ['id', 'cnj', 'nome', 'documento', 'email', 'endereco', 'pendente'],
    limit: limit,
    offset: offset
  }).then((data) => {
    res.status(200).send(data);
  })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao consultar processo.'
      });
    });
};

// Consulta um unico processo na base
const findOne = (req, res) => {
  const id = req.params.id;
  Processo.findByPk(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Erro ao consultar processo com ID = ${id}`
      });
    });
};

// Consulta alguns processos de acordo com a condicao
const findSome = (req, res) => {
  const limit = parseInt(req.query.limit) || 20
  const page = parseInt(req.query.page) || 1
  const offset = (page - 1) * limit;
  const termo = req.body.termo;
  const condition = termo ? {
    [Op.or]: [
      { cnj: { [Op.like]: `%${termo}%` } },
      { nome: { [Op.like]: `%${termo}%` } },
      { documento: { [Op.like]: `%${termo}%` } },
      { email: { [Op.like]: `%${termo}%` } },
      { endereco: { [Op.like]: `%${termo}%` } },
      { pendente: { [Op.like]: `%${termo}%` } }
    ]
  } : null;

  Processo.findAndCountAll({
    attributes: ['id', 'cnj', 'nome', 'documento', 'email', 'endereco', 'pendente'],
    limit, offset, where: condition
  })
    .then((data) => {
      res.status(200).send(data);

    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao consultar processo.'
      });
    });
};

const pageNotFound = (req, res) => {
  res.status(404).send('Página não encontrada.');
};

// Atualiza um processo de acordo com o id da requisicao
const update = (req, res) => {
  const id = req.body.id;
  Processo.update(req.body, {
    where: { id: id },
  })
    .then((rowsUpdated) => {
      if (Number(rowsUpdated) > 0) {
        res.send({
          message: 'processo atualizado com sucesso.'
        });
      }
      else {
        res.send({
          message: 'Erro ao atualizar processo.'
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao atualizar processo.'
      });
    });
};

// Exclui um processo de acordo com o id da requisicao
const exclude = (req, res) => {
  const id = req.params.id;
  Processo.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).send('processo excluído com sucesso.');
    })
    .catch((err) => {
      res.status(500).send({
        message: `Não foi possível excluir o processo com ID = ${id}`
      });
    });
};

module.exports = {
  create, findAll, countRows, findShort, findReducedAll,
  findOne, findSome, pageNotFound, update, exclude
};