import User from "./Users.js";
import FavoriteStyles from "./FavoritesStyles.js";

FavoriteStyles.belongsTo(User, { foreignKey: "user_id"});
User.hasMany(FavoriteStyles, { foreignKey: "user_id" });

export default {
  User,
  FavoriteStyles
};
