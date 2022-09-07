const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => req.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  // eslint-disable-next-line no-underscore-dangle
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => req.status(500).send({ message: err.message }));
};

module.exports.getCardById = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => req.status(500).send({ message: err.message }));
};
