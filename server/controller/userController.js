// const db = require("../db");

// class UserController {
//   //Создание пользователя(user_pass - временно, потом сделаем по нормальному с шифровкой, чтоб не хранить в открытом виде)
//   //isAdmin по умолчанию будет false, можно будет изменить руками в БД, либо на админ панели
//   async createUser(req, res) {
//     const { nickname, email, password, isAdmin } = req.body;

//     const newPerson = await db.query(
//       "INSERT INTO users (nickname, email, password, isAdmin) VALUES ($1, $2, $3, $4) RETURNING *",
//       [nickname, email, password, registration_date, isAdmin]
//     );

//     console.log(nickname, email, password, registration_date, isAdmin);

//     res.json(newPerson.rows[0]);
//   }

//   //Получение всех пользователей
//   async getUsers(req, res) {
//     const users = await db.query("SELECT * FROM users");
//     res.json(users.rows);
//   }

//   //Получение определенного пользователя
//   async getOneUser(req, res) {
//     const id = req.params.id;
//     const user = await db.query("SELECT * FROM users  WHERE id = $1", [id]);

//     res.json(user.rows);
//   }

//   //Изменение пользователя
//   //Можно будет доработать, чтобы пользователь мог сам менять о себе инфу в редактировании профиля и все обрабатывалось этим запросом
//   async updateUser(req, res) {
//     const id = req.params.id;
//     const { nickname, email, user_pass, isAdmin } = req.body;
//     const user = await db.query(
//       "UPDATE users SET nickname = $1, email = $2, user_pass = $3,isAdmin = $4 WHERE id = $6 RETURNING *",
//       [nickname, email, user_pass, registration_date, isAdmin, id]
//     );
//     res.json(user.rows[0]);
//   }

//   //Удаление пользователя
//   async deleteUser(req, res) {
//     const id = req.params.id;
//     const user = await db.query("DELETE FROM users WHERE id = $1", [id]);

//     res.json(user.rows);
//   }

//   //Проверка есть ли у пользователя права админа
//   //Запрос http://localhost:8080/api/user/isadmin?id=1
//   //Возвращает true, либо false
//   async isUserAdmin(req, res) {
//     const id = req.query.id;
//     const result = await db.query(
//       `
//       SELECT isadmin
//       FROM users
//       WHERE id = $1
//     `,
//       [id]
//     );

//     const isAdmin = result.rows[0].isAdmin;
//     return res.json({ isAdmin });
//   }
// }

// module.exports = new UserController();

const ApiError = require("../error/ApiError");

class UserController {
  async registration(req, res) {}
  async login(req, res) {}
  async auth(req, res) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("Не задан ID"));
    }
    res.json(id);
  }
  async createUser(req, res) {}
  async getUsers(req, res) {}
  async getOneUser(req, res) {}
  async updateUser(req, res) {}
  async deleteUser(req, res) {}
  async isUserAdmin(req, res) {}
}

module.exports = new UserController();
