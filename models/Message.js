const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        contato: { type: String, required: true },
        message: { type: String, required: true },
        optionSelected: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
