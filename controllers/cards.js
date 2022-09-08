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
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Что-то пошло не так! Удалить невозможно!' });
      } else { res.send({ data: card }); }
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
      } else { res.status(500).send({ message: err.message }); }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Что-то пошло не так!' });
      } else { res.send({ data: card }); }
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
      } else { res.status(500).send({ message: err.message }); }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.message.includes('Cast to ObjectId failed')) {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
      } else { res.status(500).send({ message: err.message }); }
    });
};
