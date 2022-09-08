const Card = require('../models/cards');
const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
} = require('../constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
      } else res.status(SERVER_ERROR_CODE).send({ message: err.message });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR_CODE);
      } else res.send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
