const Applicant = require("../services/applicant");
const Job = require("../services/job");

module.exports = {
  showApplicantUser(req, res) {
    Applicant.getApplicantUser(req.user.id)
      .then((data) => {
        res.status(200).json({
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

  async create(req, res) {
    const idJob = await Job.get(req.body.id_job);

    if (!idJob) {
      res.status(401).json({ message: "Job tidak ditemukan!" });
      return;
    }

    Applicant.create(req)
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
};
