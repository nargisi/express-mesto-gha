const { connect, Schema, model } = require('mongoose');

connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Должно быть не менее 2 символов!'],
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      'Пожалуйста, введите корректную ссылку!'],

  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
