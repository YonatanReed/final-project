const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
require('dotenv').config({ path: './.env' });

const router = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;
const { MONGO_URL = 'mongodb://127.0.0.1:27017/mydb' } = process.env;
const error = require('./middleware/errors');
const { requestLog, errorLog } = require('./middleware/logger');
const limiter = require('./middleware/limiter');

mongoose.set('strictQuery', false);

app.use(cors());
app.options('*', cors());

app.use(helmet());
app.use(requestLog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);
app.use(router);

app.use(errorLog);
app.use(errors());
app.use(error);

mongoose.connect(MONGO_URL);

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
