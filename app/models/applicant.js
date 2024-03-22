"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Applicant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Applicant.belongsTo(models.Job, {
        foreignKey: "id_job",
        as: "job",
      });
      Applicant.belongsTo(models.Akun, {
        foreignKey: "id_user",
        as: "biodata",
      });
    }
  }
  Applicant.init(
    {
      id_job: DataTypes.STRING,
      id_user: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Applicant",
    }
  );
  return Applicant;
};
