import Sequelize from "sequelize";
import sequelize from "../config/database.js";
class CodeSnippets extends Sequelize.Model {}

CodeSnippets.init(
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
    style_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "styles",
        key: "id",
      },
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: sequelize, modelName: "code_snippets" }
);

export default CodeSnippets;
