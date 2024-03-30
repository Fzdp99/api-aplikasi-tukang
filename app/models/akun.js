"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Akun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Akun.hasMany(models.Skill, { foreignKey: "id_user", as: "skill" });
      Akun.hasMany(models.Answer, { foreignKey: "id_user", as: "answer" });
    }
  }
  Akun.init(
    {
      role: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      gmail: DataTypes.STRING,
      name: DataTypes.STRING,
      regency: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.STRING,
      job_category: DataTypes.STRING,
      place_date_of_birth: DataTypes.STRING,
      nationality: DataTypes.STRING,
      personal_summary: DataTypes.TEXT,
      career_history: DataTypes.STRING,
      last_education: DataTypes.STRING,
      language: DataTypes.STRING,
      salary: DataTypes.STRING,
      certificate: DataTypes.STRING,
      rating: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Akun",
    }
  );
  return Akun;
};
