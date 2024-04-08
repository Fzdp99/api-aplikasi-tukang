"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Akuns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone_number: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      gmail: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      province: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      job_category: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      place_date_of_birth: {
        type: Sequelize.STRING,
      },
      nationality: {
        type: Sequelize.STRING,
      },
      personal_summary: {
        type: Sequelize.TEXT,
      },
      career_history: {
        type: Sequelize.STRING,
      },
      last_education: {
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.STRING,
      },
      salary: {
        type: Sequelize.STRING,
      },
      certificate: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Akuns");
  },
};
