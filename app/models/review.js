"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Akun, {
        foreignKey: "id_customer",
        as: "customer",
      });
    }
  }
  Review.init(
    {
      id_user: DataTypes.STRING,
      id_customer: DataTypes.STRING,
      rate: DataTypes.STRING,
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
