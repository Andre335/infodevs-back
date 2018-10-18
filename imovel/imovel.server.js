"use strict"

const Imovel = require("./imovel.model");

exports.findAll = async (data) => {
    return await Imovel.find({});
};

exports.create = async (data) => {
    const imovel = new Imovel(data);
    await imovel.save();
};