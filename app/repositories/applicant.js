const { Applicant, Job } = require("../models");

module.exports = {
  async create(createArgs) {
    return Applicant.create(createArgs);
  },
  findApplicantUser(id_user) {
    return Applicant.findAll({
      where: {
        id_user,
      },
      attributes: ["id", "id_job", "createdAt"],
      include: [
        {
          model: Job,
          as: "job",
          attributes: [
            "id",
            "district",
            "province",
            "city",
            "job_name",
            "category",
            "status",
          ],
        },
      ],
    });
  },
  delete(id_job) {
    return Applicant.destroy({
      where: {
        id_job,
      },
    });
  },
};
