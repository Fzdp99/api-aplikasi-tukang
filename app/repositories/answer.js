const { Answer } = require("../models");

module.exports = {
  async create(createArgs) {
    return Answer.create(createArgs);
  },
  delete(id_job) {
    return Answer.destroy({
      where: {
        id_job,
      },
    });
  },
};
