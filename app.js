const express = require('express');
const mongoose = require('mongoose');
const cards = require('./routes/cards.js');
const users = require('./routes/users.js');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5f97db15936ecc062c49c82f',
  };
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', users);
app.use('/', cards);
app.use('/', (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый ресурс не найден',
  });
});

app.listen(PORT, () => {
  console.log(`Working on port ${PORT}`);
});
