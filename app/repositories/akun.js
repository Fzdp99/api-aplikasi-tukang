const { Akun, Skill } = require("../models");

module.exports = {
  async create(data) {
    return Akun.create(data);
  },
  findAll(akun_role) {
    return Akun.findAll({
      where: {
        ...(akun_role && { role: akun_role }),
      },
      attributes: ["id", "username", "role", "createdAt", "updatedAt"],
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
        "address",
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
