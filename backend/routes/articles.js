const router = require('express').Router();

const {
  getArticles,
  deleteArticleById,
  createArticle,
} = require('../controllers/articles');

const {
  validateCreateArticle,
  validateArticleId,
} = require('../middleware/validator');

router.get('/', getArticles);
router.post('/', validateCreateArticle, createArticle);
router.delete('/:articleId', validateArticleId, deleteArticleById);

module.exports = router;
