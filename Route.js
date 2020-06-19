// var express = require('express');
// const router = express.Router();
const person = require('./model');
const crud = require('./Crud')(person)
// router.get('/', async (request, response) => {
//     response.send('hello world');
// });
// router.post('/', (req, res) => {
//     Model.create(req.body, function(err, result){
//         if (err) {
//             res.status(500).json({message: err})
//         }
//         res.status(201).send(result);
//     })
// });
// var meterConf = await person.findById(request.params.id);
// meterConf.
           

module.exports = crud;