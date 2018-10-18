const express = require('express')
var Imovel = require('./imovel.controller')
var router = express.Router()

router.get('/', Imovel.findAll);

router.post('/', Imovel.create);

router.post('/popular', Imovel.createMany);

module.exports = router