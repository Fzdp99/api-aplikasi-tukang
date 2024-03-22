const Answer = require("../services/answer");
const Question = require("../services/question");

module.exports = {
  async create(req, res) {
    const dataQuestion = await Question.get(req.body.id_question);

    if (!dataQuestion) {
      res.status(401).json({ message: "Question tidak ditemukan!" });
      return;
    }

    Answer.create(dataQuestion, req)
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
