'use strict';
const Imovel = require('./imovel.server');
const fs = require('fs');
const CsvReadableStream = require('csv-reader');
var AutoDetectDecoderStream = require('autodetect-decoder-stream');

exports.findAll = async (req, res) => {
    try {
        const result = await Imovel.findAll();
        if (result.length == 0) return res.status(404).send({message: "Nao existem imoveis"})
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.create = async (req, res) => {
    try {
        await Imovel.create(req.body);
        res.status(201).json(req.body);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.createMany = async (req, res) => {
    var inputStream = fs.createReadStream(req.body.csv_path, 'utf-8').pipe(new AutoDetectDecoderStream({ defaultEncoding: '1255' }));
    
    await inputStream.pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
               .on('data', (row) => {
                   row = row[0].split(';');
                   const imovel = {
                        data: row[0],
                        logradouro: row[1],
                        numero: row[2],
                        bairro: row[3],
                        condominio: row[4],
                        lat: row[15],
                        lng: row[16],
                        preco: row[5]
                   }
                   
                   try {
                       Imovel.create(imovel);
                   } catch (err) {
                       return res.status(500).send({msg: err.message});
                   }
               });

    return res.status(201);
}