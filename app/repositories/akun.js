const { Akun, Skill } = require("../models");

module.exports = {
  async create(data) {
    return Akun.create(data);
  },
  findAll() {
    return Akun.findAll({
      attributes: ["id", "username", "role", "createdAt", "updatedAt"],
    });
  },
  findAllWorker(req) {
    return Akun.findAll({
      where: {
        role: "user",
        ...(req.query.job_category && { job_category: req.query.job_category }),
        ...(req.query.province && { province: req.query.province }),
        ...(req.query.regency && { regency: req.query.regency }),
      },
      attributes: [
        "id",
        "name",
        "regency",
        "province",
        "city",
        "address",
        "job_category",
      ],
    });
  },
  detailWorker(id) {
    return Akun.findByPk(id, {
      attributes: [
        "id",
        "name",
        "phone_number",
        "gmail",
        "regency",
        "province",
        "city",
        "address",
        "job_category",
        "gender",
        "place_date_of_birth",
        "nationality",
        "personal_summary",
        "career_history",
        "last_education",
        "language",
        "salary",
        "certificate",
        "rating",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Skill,
          as: "skill",
          attributes: ["id", "skill", "level"],
        },
      ],
    });
  },
  find(id) {
    return Akun.findByPk(id, {
      attributes: [
        "id",
        "username",
        "role",
        "phone_number",
        "gmail",
        "name",
        "regency",
        "province",
        "city",
        "address",
        "job_category",
        "gender",
        "place_date_of_birth",
        "nationality",
        "personal_summary",
        "career_history",
        "last_education",
        "language",
        "salary",
        "certificate",
        "rating",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Skill,
          as: "skill",
          attributes: ["id", "skill", "level"],
        },
      ],
    });
  },
  findAkun(id) {
    return Akun.findByPk(id, {
      attributes: [
        "id",
        "username",
        "password",
        "role",
        "createdAt",
        "updatedAt",
      ],
    });
  },
  getTotal() {
    return Akun.count();
  },
  update(id, data) {
    return Akun.update(data, {
      where: {
        id,
      },
    });
  },
  delete(id) {
    return Akun.destroy({
      where: {
        id,
      },
    });
  },
  searchUsername(username) {
    return Akun.findOne({
      where: { username },
    });
  },
  searchPhoneNumber(phone_number) {
    return Akun.findOne({
      where: { phone_number },
    });
  },
};
