//importando modulos y funciones
const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

//administra las peticiones al servidor
// a cada peticion se le asigna una funcion 
router.get('/', controller.loadJson);
router.get('/create', (req, res) => { res.render('create.ejs')})
router.get('/delete/:id', controller.deleteJson)
router.get('/edit/:id', controller.editJson)
router.post('/save', controller.saveJson)
router.get('/createDB', controller.createDb)
router.post('/update/:id', controller.updateJson)

module.exports = router;