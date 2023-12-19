import Sequelize from "sequelize";
import sequelize from "../config/database.js";
class UserStyles extends Sequelize.Model {}

UserStyles.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    style_details: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: sequelize, modelName: "users_styles" }
);

export default UserStyles;
