const Skill = require("../repositories/skill");

module.exports = {
  async create(req) {
    const data = { ...req.body, id_user: req.user.id };
    return Skill.create(data);
  },

  getSkillUser(id) {
    return Skill.findSkillUser(id);
  },

  getSkill(id) {
    return Skill.find(id);
  },

  async delete(id) {
    return Skill.delete(id);
  },
};
