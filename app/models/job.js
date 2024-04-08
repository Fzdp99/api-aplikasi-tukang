"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Job.hasMany(models.Question, { foreignKey: "id_job", as: "question" });
      Job.hasMany(models.Applicant, { foreignKey: "id_job", as: "applicant" });
    }
  }
  Job.init(
    {
      id_user: DataTypes.STRING,
      district: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      job_name: DataTypes.STRING,
      category: DataTypes.STRING,
      salary: DataTypes.STRING,
      status: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
