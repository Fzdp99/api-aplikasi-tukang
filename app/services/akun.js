const Akun = require("../repositories/akun");
const Skill = require("../repositories/skill");
const Review = require("../repositories/review");
const Job = require("../services/job");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

module.exports = {
  async create(data) {
    const role = "user";
    const password = await encryptPassword(data.password);
    const newdata = { ...data, role, password };

    return Akun.create(newdata);
  },

  async list() {
    try {
      const data = await Akun.findAll();
      const dataCount = data.length;

      return {
        data,
        count: dataCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return Akun.find(id);
  },

  getAkun(id) {
    return Akun.findAkun(id);
  },

  async delete(id) {
    var lisIdJob = [];
    const userJob = await Job.getJobUser(id);
    lisIdJob = userJob.map((obj) => obj.id);
    lisIdJob.map((idJob) => Job.delete(idJob));

    await Review.delete(id);
    await Skill.deleteByUser(id);
    return Akun.delete(id);
  },

  async update(req) {
    const dataUser = Akun.find(req.user.id);
    const newData = {
      ...req.body,
      username: dataUser.username,
      password: dataUser.password,
      role: dataUser.role,
      rating: dataUser.rating,
    };
    return Akun.update(req.user.id, newData);
  },

  async updateRating(id_user, data) {
    return Akun.update(id_user, data);
  },

  async updatePassword(id, ps) {
    const password = await encryptPassword(ps);
    const data = {
      password,
    };
    return Akun.update(id, data);
  },

  searchUsername(username) {
    return Akun.searchUsername(username);
  },

  searchPhoneNumber(phoneNumber) {
    return Akun.searchPhoneNumber(phoneNumber);
  },

  checkPassword(encryptedPassword, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
        if (!!err) {
          reject(err);
          return;
        }

        resolve(isPasswordCorrect);
      });
    });
  },

  createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia", {
      expiresIn: "5h",
    });
  },

  createDataToken(user) {
    const data = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    const token = this.createToken(data);
    return token;
  },
};
