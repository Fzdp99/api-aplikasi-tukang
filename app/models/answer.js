"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Question, {
        foreignKey: "id_question",
        as: "question",
      });
    }
  }
  Answer.init(
    {
      id_job: DataTypes.STRING,
      id_question: DataTypes.STRING,
      id_user: DataTypes.STRING,
      answer: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  return Answer;
};
