const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);


//Conexao do usuario com a sala unica recibida pelo id da box
io.on('connection', socket => {
    socket.on("connectRoom", box => {
        socket.join(box);
    });
});

//

//Conexão com o banco
mongoose.connect('mongodb+srv://renan:renan@cluster0-uzql4.mongodb.net/omnistack?retryWrites=true', 
    {
    useNewUrlParser: true
    }
);

// Transforma io em variavel global para ser acessada
app.use((req, res, next) => {
    req.io = io;

    return next();
})

//Aceitar dados no formato JSON
app.use(express.json());

//Aceitar receber arquivos
app.use(express.urlencoded({ extended: true }));

//busca os arquivos dentro da pasta tmp
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

//Utilizando o arquivo routes.js para pegar as rotas
app.use(require('./routes'));

//Definindo porta onde a aplicação é executada
server.listen(3030);