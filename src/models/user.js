import { Model, DataTypes } from "sequelize";
import db from "../config/database.js";

class User extends Model {
  static associate(models) {
    // Define associations here if needed
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize: db.getInstance(),
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

export default User;
