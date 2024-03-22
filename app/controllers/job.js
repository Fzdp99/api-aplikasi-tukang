const Job = require("../services/job");

module.exports = {
  list(req, res) {
    Job.list(req)
      .then(({ data, count }) => {
        res.status(200).json({
          status: "success",
          data: { list: data },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  showOne(req, res) {
    Job.get(req.params.id)
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

  showJobUser(req, res) {
    Job.getJobUser(req.user.id)
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
    Job.create(req)
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

  async update(req, res) {
    const access = await Job.get(req.params.id);

    if (!access) {
      res.status(401).json({ message: "can't access!" });
      return;
    }

    if (access.id_user != req.user.id) {
      res.status(401).json({ message: "can't access!" });
      return;
    }

    Job.update(req.params.id, req.body)
      .then(() => {
        res.status(200).json({
          status: "success",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async destroy(req, res) {
    const access = await Job.get(req.params.id);

    if (!access) {
      res.status(401).json({ message: "can't access!" });
      return;
    }

    if (access.id_user != req.user.id) {
      res.status(401).json({ message: "can't access!" });
      return;
    }

    Job.delete(req.params.id)
      .then(() => {
        res.status(200).json({
          status: "success",
          message: "Job berhasil di hapus",
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
