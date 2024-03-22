const Answer = require("../repositories/answer");

module.exports = {
  async create(dataQuestion, req) {
    const data = {
      ...req.body,
      id_user: req.user.id,
      id_job: dataQuestion.id_job,
    };
    return Answer.create(data);
  },

  async delete(id_job) {
    return Answer.delete(id_job);
  },
};
