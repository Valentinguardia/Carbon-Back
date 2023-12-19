import Sequelize from "sequelize";
import sequelize from "../config/database.js";
class CodeHistory extends Sequelize.Model {}

CodeHistory.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    snippet_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "code_snippets",
        key: "id",
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  { sequelize: sequelize, modelName: "code_history" }
);

export default CodeHistory;
