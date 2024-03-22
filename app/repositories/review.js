const { Review, Akun } = require("../models");

module.exports = {
  async create(createArgs) {
    return Review.create(createArgs);
  },
  findReviewUser(id_user) {
    return Review.findAll({
      where: {
        id_user,
      },
      include: [
        {
          model: Akun,
          as: "customer",
          attributes: ["name", "gmail", "createdAt", "updatedAt"],
        },
      ],
    });
  },
  find(id) {
    return Review.findOne({
      where: {
        id,
      },
    });
  },
  getTotal() {
    return Review.count();
  },
  delete(id_user) {
    return Review.destroy({
      where: {
        id_user,
      },
    });
  },
};
