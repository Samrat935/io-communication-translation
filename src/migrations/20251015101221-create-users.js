"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("error_logs", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "Primary key of the error log entry",
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Error level: info, warn, error, etc.",
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "Error message",
      },
      stack: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Stack trace if available",
      },
      meta: {
        type: Sequelize.JSONB,
        allowNull: true,
        comment: "Optional metadata related to the error",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("error_logs");
  },
};
