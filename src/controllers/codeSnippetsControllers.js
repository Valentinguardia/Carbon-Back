import models from "../models/index.js";

const { CodeSnippets } = models;
const codeSnippetsControllers = {
snippets: async (req, res) => {
  try {
    const { user_id, style_id, content } = req.body;
    const newSnippet = await CodeSnippets.create({ user_id, style_id, content });
    res.status(201).json(newSnippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el fragmento de código.", error });
  }
},
snippetId: async (req, res) => {
  try {
    const snippetId = req.params.snippetId;
    const snippet = await CodeSnippets.findByPk(snippetId);
    if (!snippet) return res.status(404).json({ message: "Fragmento de código no encontrado." });
    res.status(200).json(snippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el fragmento de código.", error });
  }
},
userId: async (req, res) => {
  try {
    const userId = req.params.userId;
    const snippets = await CodeSnippets.findAll({ where: { user_id: userId } });
    res.status(200).json(snippets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los fragmentos de código del usuario.", error });
  }
},
updateSnippet: async (req, res) => {
  try {
    const snippetId = req.params.snippetId;
    const { content } = req.body;
    const snippet = await CodeSnippets.findByPk(snippetId);
    if (!snippet) return res.status(404).json({ message: "Fragmento de código no encontrado." });
    snippet.content = content;
    await snippet.save();
    res.status(200).json(snippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el fragmento de código.", error });
  }
},
deleteSnippet: async (req, res) => {
  try {
    const snippetId = req.params.snippetId;
    const snippet = await CodeSnippets.findByPk(snippetId);
    if (!snippet) return res.status(404).json({ message: "Fragmento de código no encontrado." });
    await snippet.destroy();
    res.status(200).json({ message: "Fragmento de código eliminado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el fragmento de código.", error });
  }
},
}
export default codeSnippetsControllers