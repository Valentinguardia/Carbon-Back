import User from "./Users.js";
import Favorites from "./Favorites.js";
import UserStyles from "./UserStyles.js";
import Styles from "./Styles.js";
import CodeSnippets from "./CodeSnippets.js";
import CodeHistory from "./CodeHistory.js";

User.hasMany(CodeSnippets, { foreignKey: "user_id" });
CodeSnippets.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Favorites, { foreignKey: "user_id" });
Favorites.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(CodeHistory, { foreignKey: "user_id" });
CodeHistory.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(UserStyles, { foreignKey: "user_id" });
UserStyles.belongsTo(User, { foreignKey: "user_id" });

Styles.hasMany(CodeSnippets, { foreignKey: "style_id" });
CodeSnippets.belongsTo(Styles, { foreignKey: "style_id" });

Styles.hasMany(Favorites, { foreignKey: "style_id" });
Favorites.belongsTo(Styles, { foreignKey: "style_id" });

CodeSnippets.hasMany(CodeHistory, { foreignKey: "snippet_id" });
CodeHistory.belongsTo(CodeSnippets, { foreignKey: "snippet_id" });

export default {
  User,
  Favorites,
  UserStyles,
  Styles,
  CodeSnippets,
  CodeHistory,
};
