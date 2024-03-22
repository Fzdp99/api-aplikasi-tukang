const Review = require("../repositories/review");
const Akun = require("../services/akun");

module.exports = {
  async create(req) {
    var allRate = [];
    const dataR = {
      ...req.body,
      id_customer: req.user.id,
    };

    await Review.create(dataR);
    const dataReview = await Review.findReviewUser(req.body.id_user);

    allRate = await dataReview.map((obj) => obj.rate);
    allRate = await allRate.map((str) => parseInt(str));

    const sum = allRate.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const average = sum / allRate.length;

    const data = {
      rating: average,
    };

    await Akun.updateRating(req.body.id_user, data);

    return;
  },

  async list(user_id) {
    try {
      const data = await Review.findReviewUser(user_id);
      const dataCount = await Review.getTotal();

      return {
        data,
        count: dataCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return Review.find(id);
  },
};
