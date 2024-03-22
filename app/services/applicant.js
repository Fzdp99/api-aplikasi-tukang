const Applicant = require("../repositories/applicant");

module.exports = {
  async create(req) {
    const data = { ...req.body, id_user: req.user.id };
    return Applicant.create(data);
  },

  getApplicantUser(id) {
    return Applicant.findApplicantUser(id);
  },

  async delete(id_job) {
    return Applicant.delete(id_job);
  },
};
