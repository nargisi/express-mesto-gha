const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { NOT_FOUND_ERROR_CODE } = require('./constants');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '6318a2076e2dcb607561e935' };

  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE);
  res.send({ message: 'Страница не найдена!' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
