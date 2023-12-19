import models from "../models/index.js";

const { Styles } = models;
const stylesControllers = {
  createStyle: async (req, res) => {
    try {
      const { name, details, backgroundColor, textColor } = req.body;
      const newStyle = await Styles.create({ name,details,backgroundColor,textColor,});
      res.status(201).json(newStyle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el estilo.", error });
    }
  },
  styleId: async (req, res) => {
    try {
      const styleId = req.params.styleId;
      const style = await Styles.findByPk(styleId);
      if (!style) return res.status(404).json({ message: 'Estilo no encontrado' });
      res.status(200).json(style);
    } catch (error) {
      res.status(500).json({ message: `Error al obtener el estilo: ${error.message}` });
    }
  },
styles: async (req, res) => {
  try {
    const allStyles = await Styles.findAll();
    res.status(200).json(allStyles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener todos los estilos.", error });
  }
},
updateStyle: async (req, res) => {
  try {
    const styleId = req.params.styleId;
    const { name, details, backgroundColor, textColor } = req.body;
    const styleToUpdate = await Styles.findByPk(styleId);
    if (!styleToUpdate) return res.status(404).json({ message: "Estilo no encontrado." });
    await styleToUpdate.update({ name,details,backgroundColor,textColor,});
    res.status(200).json(styleToUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el estilo.", error });
  }
},
deleteStyle: async (req, res) => {
  try {
    const { styleId } = req.params;
    const styleToDelete = await Styles.findByPk(styleId);
    if (!styleToDelete) return res.status(404).json({ message: "Estilo no encontrado." }); 
    await styleToDelete.destroy();
    res.status(200).json({ message: "Estilo eliminado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el estilo.", error });
  }
},
};

export default stylesControllers;
