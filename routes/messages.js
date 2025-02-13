const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

router.post("/", async (req, res) => {
    const { name, contato, message, optionSelected } = req.body;
    try {
        const newMessage = new Message({
            name,
            contato,
            message,
            optionSelected,
        });
        await newMessage.save();
        res.status(201).json({ message: "Mensagem enviada com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao enviar mensagem" });
    }
});

router.get("/", async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar mensagens" });
    }
});

module.exports = router;
