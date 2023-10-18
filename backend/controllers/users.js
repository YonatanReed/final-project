const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV = 'dev' } = process.env;
const JWT_SECRET = NODE_ENV === 'dev' ? 'SOME-SECRET' : process.env.JWT_SECRET;

const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      return res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, password, email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(
          'The user with the provided email already exist'
        );
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    })
    )
    .then((user) => {
      res.status(200).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.massage));
      } else {
        next(err);
      }
    });
};

const getUserInfo = (id, res, next) => {
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('No user with matching ID found');
    })
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  getUserInfo(req.user._id, res, next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};
