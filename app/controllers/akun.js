const Akun = require("../services/akun");

module.exports = {
  list(req, res) {
    Akun.list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "success",
          data,
          total: count,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    Akun.get(req.user.id)
      .then((post) => {
        res.status(200).json({
          status: "success",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async createAkun(req, res) {
    const username = req.body.username;
    const cUser = await Akun.searchUsername(username);
    const phoneNumber = await Akun.searchPhoneNumber(req.body.phone_number);

    if (phoneNumber) {
      res.status(401).json({ message: "Nomer telah digunakan" });
      return;
    }

    if (cUser) {
      res.status(401).json({ message: "Username telah di gunakan" });
      return;
    }

    Akun.create(req.body)
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
    if (req.body.phone_number) {
      const phoneNumber = await Akun.searchPhoneNumber(req.body.phone_number);

      if (phoneNumber) {
        res.status(401).json({ message: "Nomer telah digunakan" });
        return;
      }
    }

    Akun.update(req)
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

  async updatePasswordByAdmin(req, res) {
    Akun.updatePassword(req.params.id, req.body.password)
      .then(() => {
        res.status(200).json({
          status: "Password berhasil di ubah",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async updatePassword(req, res) {
    const user = req.user;
    const oldPassword = req.body.old_password;
    const newPassword = req.body.new_password;

    const isPasswordCorrect = await Akun.checkPassword(
      user.password,
      oldPassword
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Password lama yang di masukan salah!" });
      return;
    }

    Akun.updatePassword(req.user.id, newPassword)
      .then(() => {
        res.status(200).json({
          status: "Password berhasil di ubah",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  destroy(req, res) {
    Akun.delete(req.user.id)
      .then(() => {
        res.status(200).json({
          status: "success",
          message: "Akun berhasil di hapus",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  destroyByAdmin(req, res) {
    Akun.delete(req.params.id)
      .then(() => {
        res.status(200).json({
          status: "success",
          message: "Akun berhasil di hapus",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await Akun.searchUsername(username);

    if (!user) {
      res.status(201).json({ message: "Username tidak ditemukan" });
      return;
    }

    const isPasswordCorrect = await Akun.checkPassword(user.password, password);

    if (!isPasswordCorrect) {
      res.status(201).json({ message: "Password salah!" });
      return;
    }

    const token = Akun.createDataToken(user);

    res.status(201).json({
      message: "Login success!",
      token,
    });
  },
};
