const User = require('../models/users');
const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
} = require('../constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      if (user === null) {
        res.status(NOT_FOUND_ERROR_CODE);
      } else { res.send({ data: user }); }
    })
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
      } else { res.status(SERVER_ERROR_CODE).send({ message: err.message }); }
    });
};
