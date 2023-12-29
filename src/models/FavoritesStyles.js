import Sequelize from "sequelize";
import sequelize from "../config/database.js";

class FavoriteStyles extends Sequelize.Model {}

FavoriteStyles.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users", 
        key: "id",
      },
    },
    styles: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    file: {
      type: Sequelize.STRING, 
      allowNull: false,
    },
    color: {
      type: Sequelize.STRING, 
      allowNull: false,
    },
  },
  { sequelize: sequelize, modelName: "favorite_styles" } 
);

export default FavoriteStyles;
