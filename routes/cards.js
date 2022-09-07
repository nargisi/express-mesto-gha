const router = require('express').Router();

const { getCards, createCard, getCardById } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.get('/:cardsId', getCardById);

module.exports = router;
