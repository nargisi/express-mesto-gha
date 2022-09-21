const Card = require('../models/cards');
const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  FORBIDDEN,
  SERVER_ERROR_CODE,
} = require('../constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера!' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные!' });
      } else res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера!' });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточки с таким id не существует!' });
      }
      if (card.owner.toString() !== req.user._id) {
        res.status(FORBIDDEN).send({ message: 'Карточку удалять запрещено!!' });
      } else { res.send({ data: card, message: 'DELETED' }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Передан некорректный id!' });
      } else { res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера!' }); }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточки с таким id не существует!' });
      } else { res.send({ data: card }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные!' });
      } else { res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера!' }); }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточки с таким id не существует!' });
      } else { res.send({ data: card }); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные!' });
      } else { res.status(SERVER_ERROR_CODE).send({ message: 'Ошибка сервера!' }); }
    });
};
