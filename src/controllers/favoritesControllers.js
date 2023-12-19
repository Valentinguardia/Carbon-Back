import models from "../models/index.js";

const { Favorites, User } = models;
const favoritesControllers = {
  addFav: async (req, res) => {
    try {
      const { user_id, style_id } = req.body;
      const user = await User.findByPk(user_id);
      if (!user || !user.email) throw new Error("El usuario no existe");
      const add = await Favorites.findOne({ where: { user_id, style_id } });
      if (!add) {
        const newFav = await Favorites.create({ user_id, style_id });
        res.status(201).send(newFav);
      } else {
        res.send("Este estilo ya se encuentra en tus favoritos");
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  deleteFav: async (req, res) => {
    try {
      const { style_id, user_id } = req.body;
      await Favorites.destroy({ where: { style_id, user_id } });
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  userId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).send("Usuario no encontrado");
      const favs = await Favorites.findAll({ where: { user_id: user.id } });
      res.status(200).json(favs);
    } catch (error) {
      res.status(500).send("Error al obtener los favoritos del usuario: " + error.message);
    }
  },
};
export default favoritesControllers;
