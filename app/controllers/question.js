const Question = require("../services/question");
const Job = require("../services/job");

module.exports = {
  async create(req, res) {
    const idJob = await Job.get(req.body.id_job);

    if (!idJob) {
      res.status(401).json({ message: "Job tidak ditemukan!" });
      return;
    }

    Question.create(req.body)
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
