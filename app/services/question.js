const Question = require("../repositories/question");

module.exports = {
  async create(req) {
    return Question.create(req);
  },
  async delete(id_job) {
    return Question.delete(id_job);
  },
  get(id) {
    return Question.find(id);
  },
};
