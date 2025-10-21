// src/models/ErrorLog.js
import { Model, DataTypes } from "sequelize";
import db from "../config/database.js"; // your Sequelize instance

class ErrorLog extends Model {
  static associate(models) {
    // Define associations here if needed in future
  }
}

ErrorLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    level: {
      type: DataTypes.STRING, // e.g., 'error', 'warning', 'info'
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stack: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    context: {
      type: DataTypes.JSONB, // extra info about where the error happened
      allowNull: true,
    },
  },
  {
    sequelize: db.getInstance(),
    modelName: "ErrorLog",
    tableName: "error_logs",
    timestamps: true,
    underscored: true,
  }
);

export default ErrorLog;
