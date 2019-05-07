const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp')); //destino do arquivo salvo
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err); //Caso ocarra um erro chama o call back e envia o erro

                file.key = `${hash.toString('hex')}-${file.originalname}`; //Gera um hash unico com o nome do arquivo enviado

                cb(null, file.key) //Salva o arquivo com o hash-original
            })
        }
    })
};