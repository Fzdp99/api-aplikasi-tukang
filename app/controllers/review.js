const Review = require("../services/review");
const Akun = require("../services/akun");

module.exports = {
  list(req, res) {
    Review.list(req.params.id)
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

  async create(req, res) {
    const findAkun = await Akun.get(req.body.id_user);

    if (!findAkun) {
      res.status(401).json({ message: "Akun tidak ditemukan" });
      return;
    }

    if (findAkun.id === req.user.id) {
      res.status(401).json({ message: "can't access!" });
      return;
    }

    Review.create(req)
      .then(() => {
        res.status(201).json({
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
};
