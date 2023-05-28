const Article = require('../models/article');

const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.getArticles = (req, res, next) => {
  const articleOwner = req.user._id;
  Article.find({ owner: articleOwner })
    .then((articlesOwner) => res.status(200).send(articlesOwner))
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(() => {
      throw new NotFoundError('Article not found');
    })
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        next(new ForbiddenError('You can only delete your own articles'));
      } else {
        Article.findByIdAndRemove(req.params.articleId)
          .then((removeArticle) => res.status(200).send(removeArticle)
          );
      }
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image
  } = req.body;
  const ownerId = req.user._id;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: ownerId,
  })
    .then((article) => res.status(200).send({
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
      _id: article.id,
    })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.massage));
      } else {
        next(err);
      }
    });
};
