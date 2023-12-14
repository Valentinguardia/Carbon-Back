import Sequelize from "sequelize";
import sequelize from "../config/database.js";
class Styles extends Sequelize.Model {}

Styles.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    isDefault: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    details: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: sequelize, modelName: "styles" }
);

export default Styles;
