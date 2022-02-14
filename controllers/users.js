const User = require('../models/user');

module.exports.create = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `Переданы некорректные данные. ${err.message}`,
        });
      } else {
        res.status(500).send({
          message: 'На сервере произошла ошибка',
        });
      }
    });
};

module.exports.getAll = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({
      message: 'На сервере произошла ошибка',
    }));
};

module.exports.get = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: 'Не найдено',
        });
      } else {
        res.send(
          user,
        );
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(500).send({
          message: 'На сервере произошла ошибка',
        });
      }
    });
};

module.exports.updateCurrent = (req, res) => {
  const {
    name,
    about,
  } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: 'Не найдено',
        });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(500).send({
          message: 'На сервере произошла ошибка',
        });
      }
    });
};

module.exports.updateCurrentAvatar = (req, res) => {
  const {
    avatar,
  } = req.body;

  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: 'Не найдено',
        });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `Переданы некорректные данные. ${err.message}`,
        });
      } else {
        res.status(500).send({
          message: 'На сервере произошла ошибка',
        });
      }
    });
};
