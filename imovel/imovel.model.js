'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imovelSchema = new Schema({
    logradouro: {
        type: String
    },
    numero: {
        type: String
    },
    bairro: {
        type: String
    },
    municipio: {
        type: String
    },
    estado: {
        type: String
    },
    cep: {
        type: String
    },
    lat: {
        type: String
    },
    lng: {
        type: String
    },
    tp_negocio: {
        type: String
    },
    preco: {
        type: Number
    },
    data: {
        type: String
    }
});

var Imovel = mongoose.model('Imovel', imovelSchema);
module.exports = Imovel;