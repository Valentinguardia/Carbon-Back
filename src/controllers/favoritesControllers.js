import models from "../models/index.js";

const { Favorites, User, FavoriteStyles } = models;
const favoritesControllers = {
    addFav:async (req, res) => {
      try {
        const { user_id, styles, file, color } = req.body;
        console.log(req.body)
        const user = await User.findByPk(user_id);
        if (!user || !user.email) throw new Error("El usuario no existe");
        const add = await FavoriteStyles.findOne({ where: { user_id, styles, file, color} });
        if(!add) {const newFav = await FavoriteStyles.create({user_id, styles, file, color,});
        res.status(201).json(newFav);
      } else {
        res.send(add);
      }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al guardar estilos favoritos.", error });
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
      const favs = await FavoriteStyles.findAll({ where: { user_id: user.id } });
      res.status(200).json(favs);
    } catch (error) {
      res.status(500).send("Error al obtener los favoritos del usuario: " + error.message);
    }
  },
verifyFavorite: async (req, res) => {
  try {
    const { user_id, styles, file, color } = req.query;
    const existingFavorite = await FavoriteStyles.findOne({
      where: { user_id, styles, file, color }
    });
    if (existingFavorite) {
      res.send(true);
    } else {
      res.send(false); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al verificar si el estilo está en tus favoritos.");
  }
}
};


export default favoritesControllers;
