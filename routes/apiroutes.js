const express = require ('express');
const router = express.Router();

const apiController = require('../controllers/apiController');
// url do teste será: http://localhost:5000/api/Home
router.get('/teste',apiController.teste);
router.post('/create',apiController.create);
router.get('/editar/:id',apiController.edit);
router.post('/update/:id',apiController.update);
router.get('/delete/:id',apiController.delete);
router.get('/Home',apiController.listAll);
router.get('/sorteio',apiController.sorteio,apiController.listasorteio);
router.get('/listasorteio',apiController.listasorteio);
router.get('/Sendemail',apiController.sendemail);
module.exports = router;