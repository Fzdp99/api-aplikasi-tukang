const { Job, Question, Applicant, Akun, Answer } = require("../models");

module.exports = {
  async create(createArgs) {
    return Job.create(createArgs);
  },
  findAll(req) {
    return Job.findAll({
      where: {
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.province && { province: req.query.province }),
        ...(req.query.regency && { regency: req.query.regency }),
      },
      attributes: [
        "id",
        "id_user",
        "regency",
        "province",
        "city",
        "job_name",
        "category",
        "status",
      ],
    });
  },
  findJobUser(id_user) {
    return Job.findAll({
      where: {
        id_user,
      },
      attributes: [
        "id",
        "id_user",
        "regency",
        "province",
        "city",
        "job_name",
        "category",
        "status",
      ],
      include: [
        {
          model: Applicant,
          as: "applicant",
          attributes: ["id_user", "createdAt"],
          include: [
            {
              model: Akun,
              as: "biodata",
              attributes: [
                "name",
                "phone_number",
                "gmail",
                "address",
                "gender",
                "place_date_of_birth",
                "nationality",
                "personal_summary",
                "career_history",
                "last_education",
                "language",
                "salary",
                "certificate",
                "rating",
              ],
              include: [
                {
                  model: Answer,
                  as: "answer",
                  attributes: ["id", "answer"],
                  include: [
                    {
                      model: Question,
                      as: "question",
                      attributes: ["id", "question"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  },
  find(id) {
    return Job.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Question,
          as: "question",
          attributes: ["id", "question"],
        },
      ],
    });
  },
  getTotal() {
    return Job.count();
  },
  update(id, updateArgs) {
    return Job.update(updateArgs, {
      where: {
        id,
      },
    });
  },
  delete(id) {
    return Job.destroy({
      where: {
        id,
      },
    });
  },
};
