const Job = require("../repositories/job");
const Question = require("../services/question");
const Answer = require("../services/answer");
const Applicant = require("../services/applicant");

module.exports = {
  async create(req) {
    const data = { ...req.body, id_user: req.user.id };
    return Job.create(data);
  },

  async list(req) {
    try {
      const data = await Job.findAll(req);
      const dataCount = await Job.getTotal();

      return {
        data,
        count: dataCount,
      };
    } catch (err) {
      throw err;
    }
  },

  getJobUser(id) {
    return Job.findJobUser(id);
  },

  get(id) {
    return Job.find(id);
  },

  async delete(id) {
    await Question.delete(id);
    await Answer.delete(id);
    await Applicant.delete(id);
    return Job.delete(id);
  },

  async update(id, requestBody) {
    return Job.update(id, requestBody);
  },
};
