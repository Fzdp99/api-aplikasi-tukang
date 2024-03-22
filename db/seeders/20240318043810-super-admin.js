"use strict";
const bcrypt = require("bcryptjs");
const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Akuns",
      [
        {
          username: "adminbanget",
          password: await encryptPassword("sipalingadmin"),
          role: "admin",
          phone_number: "0866999666999",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Akuns", null, {
      username: "adminbanget",
    });
  },
};
