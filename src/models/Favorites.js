import Sequelize from "sequelize";
import sequelize from "../config/database.js";
class Favorites extends Sequelize.Model {}

Favorites.init(
  {
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    style_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "styles",
        key: "id",
      },
    },
  },
  { sequelize: sequelize, modelName: "favorites" }
);

export default Favorites;
