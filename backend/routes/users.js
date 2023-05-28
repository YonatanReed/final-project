const router = require('express').Router();

const { getCurrentUser, getUsers } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);

module.exports = router;
