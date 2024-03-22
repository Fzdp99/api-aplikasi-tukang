const { Skill } = require("../models");

module.exports = {
  async create(createArgs) {
    return Skill.create(createArgs);
  },
  findSkillUser(id_user) {
    return Skill.findAll({
      where: {
        id_user,
      },
    });
  },
  find(id) {
    return Skill.findOne({
      where: {
        id,
      },
    });
  },
  delete(id) {
    return Skill.destroy({
      where: {
        id,
      },
    });
  },
  deleteByUser(id_user) {
    return Skill.destroy({
      where: {
        id_user,
      },
    });
  },
};
