import models from "../models/index.js";

const { CodeHistory } = models;

const codeHistoryControllers = {
  snippetId: async (req, res) => {
    try {
      const snippetId = req.params.snippetId;
      const codeHistory = await CodeHistory.findAll({ where: { snippet_id: snippetId } });
      res.status(200).json(codeHistory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el historial del fragmento de código.", error });
    }
  },
  userId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const codeHistory = await CodeHistory.findAll({ where: { user_id: userId } });
      res.status(200).json(codeHistory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el historial del usuario.", error });
    }
  },
}

export default codeHistoryControllers