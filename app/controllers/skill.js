const Skill = require("../services/skill");

module.exports = {
  async create(req, res) {
    Skill.create(req)
      .then((data) => {
        res.status(201).json({
          status: "success",
          data,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async destroy(req, res) {
    const access = await Skill.getSkill(req.params.id);

    if (!access) {
      res.status(401).json({ message: "canot acces!" });
      return;
    }

    if (access.id_user != req.user.id) {
      res.status(401).json({ message: "canot acces!" });
      return;
    }

    Skill.delete(req.params.id)
      .then(() => {
        res.status(200).json({
          status: "success",
          message: "Skill berhasil di hapus",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
