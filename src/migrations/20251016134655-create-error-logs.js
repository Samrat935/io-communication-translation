export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("error_logs", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Error level: e.g., 'error', 'warning', 'info'",
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "Error message",
      },
      stack: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Stack trace of the error",
      },
      context: {
        type: Sequelize.JSONB,
        allowNull: true,
        comment: "Extra info about the error context",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("error_logs");
  },
};
