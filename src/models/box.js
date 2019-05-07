const mongoose = require("mongoose");

const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    files: [{type: mongoose.Schema.Types.ObjectId, ref: "File"}] //Faz o relacionamento com File, pegando o seu id
},{
    timestamps: true //Cria campo com data de criação e data de atualização no banco de dados
});


module.exports = mongoose.model("Box", Box);