const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Должно быть не менее 2 символов!'],
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Должно быть не менее 2 символов!'],
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      'Пожалуйста, введите корректную ссылку!'],
  },
});

module.exports = model('user', userSchema);
