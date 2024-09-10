const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, WatchList, WatchedList } = require('../models/models');
const { validationResult } = require('express-validator');

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        return res.status(400).json({ message: 'Ошибка при регистрации', errors });
      }
      const { nickname, email, password, role, reg_date } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest('Некорректный email или password'));
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'));
      }
      const hashPassword = await bcrypt.hash(password, 5);
      let fileName = null;
      if (req.files && req.files.img) {
        const { img } = req.files;
        fileName = `${nickname}_avatar.jpg`;
        img.mv(path.resolve(__dirname, '..', 'static/avatars', fileName));
      }
      const user = await User.create({ nickname, email, password: hashPassword, avatar: fileName, role, reg_date });
      const watch_list = await WatchList.create({ userId: user.id });
      const watched_list = await WatchedList.create({ userId: user.id });
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async getUsers(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }
  async getOneUser(req, res) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    return res.json(user);
  }
  async updateUser(req, res, next) {
    try {
      const { id } = req.query;
      const { nickname, email, password, avatar } = req.body;
      const { img } = req.files;

      const user = await User.findOne({ where: { id } });

      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }

      let fileName;
      if (nickname) {
        fileName = `${nickname}_poster.jpg`;
      } else {
        fileName = `${user.nickname}_poster.jpg`;
      }
      img.mv(path.resolve(__dirname, '..', 'static/posters', fileName));

      let updatedData = { nickname, email, avatar: fileName };
      if (password) {
        const hashPassword = await bcrypt.hash(password, 5);
        updatedData.password = hashPassword;
      }

      await User.update(updatedData, { where: { id } });

      const updatedUser = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
      return res.json(updatedUser);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.internal('Пользователь не найден'));
      }
      await User.destroy({ where: { id } });
      return res.json({ message: 'Пользователь удален' });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async addFriend(req, res, next) {
    const { id } = req.query; // ID текущего пользователя
    const { friendId } = req.body; // ID пользователя для подписки/дружбы

    try {
      // Найти текущего пользователя
      const user = await User.findByPk(id);
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден'));
      }

      // Найти пользователя, на которого подписываются
      const friend = await User.findByPk(friendId);
      if (!friend) {
        return next(ApiError.notFound('Друг не найден'));
      }

      // Проверить, является ли друг уже другом пользователя
      if (user.friends && user.friends.includes(friendId)) {
        return res.status(400).json({ message: 'Пользователи уже друзья' });
      }

      // Добавить пользователя в список подписок и подписчиков
      if (!user.subscriptions) user.subscriptions = [];
      if (!friend.subscribers) friend.subscribers = [];

      if (!user.subscriptions.includes(friendId)) {
        user.subscriptions.push(friendId);
      }
      if (!friend.subscribers.includes(id)) {
        friend.subscribers.push(id);
      }

      // Если они уже подписаны друг на друга, добавить в друзья
      const isMutualSubscription = friend.subscriptions && friend.subscriptions.includes(id);
      if (isMutualSubscription) {
        if (!user.friends) user.friends = [];
        if (!friend.friends) friend.friends = [];

        if (!user.friends.includes(friendId)) {
          user.friends.push(friendId);
        }
        if (!friend.friends.includes(id)) {
          friend.friends.push(id);
        }
      }

      // Сохранить изменения
      await user.save();
      await friend.save();

      // Вернуть успешный ответ
      res.status(200).json({ message: 'Подписки/друзья успешно обнолвены!' });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();
