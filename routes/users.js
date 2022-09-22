const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, getAboutUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getAboutUser);
router.get('/:id', getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().link(),
  }),
}), updateAvatar);

module.exports = router;
