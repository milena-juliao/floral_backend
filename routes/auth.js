const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ error: "Usuário não encontrado" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Senha incorreta" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Erro ao fazer login" });
    }
});

module.exports = router;
