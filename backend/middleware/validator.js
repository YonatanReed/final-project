const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.url');
};

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('The email field must be a vaild email')
      .messages({ 'string.empty': 'The email field must be filled in' }),
    password: Joi.string().required().min(8).messages({
      'string.min': ' At least 8 characters',
      'string.empty': 'The password field must be filled in',
    }),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({ 'string.empty': 'The email field must be filled in' }),
    password: Joi.string()
      .required()
      .min(8)
      .messages({ 'string.min': ' At least 8 characters' }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'The name field must be filled in',
        'string.min': ' At least 2 characters',
        'string.max': ' Max 30 characters',
      }),
  }),
});

const validateCreateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string()
      .required()
      .messages({ 'string.empty': 'The keyword field must be filled in' }),
    title: Joi.string()
      .required()
      .messages({ 'string.empty': 'The title field must be filled in' }),
    text: Joi.string()
      .required()
      .messages({ 'string.empty': 'The text field must be filled in' }),
    date: Joi.string()
      .required()
      .messages({ 'string.empty': 'The date field must be filled in' }),
    source: Joi.string()
      .required()
      .messages({ 'string.empty': 'The source field must be filled in' }),
    link: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The link field must be filled in',
      'string.url': 'Invalid URL',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The link image must be filled in',
      'string.url': 'Invalid URL',
    }),
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Invalid id');
      }),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateCreateArticle,
  validateArticleId,
};
