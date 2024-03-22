const { Question } = require("../models");

module.exports = {
  async create(createArgs) {
    return Question.create(createArgs);
  },
  delete(id_job) {
    return Question.destroy({
      where: {
        id_job,
      },
    });
  },
  find(id) {
    return Question.findOne({
      where: {
        id,
      },
    });
  },
};
