const express = require ('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/teste',apiController.teste);
router.post('/create',apiController.create);
router.get('/editar/:id',apiController.edit);
router.post('/update/:id',apiController.update);
router.get('/delete/:id',apiController.delete);
router.get('/Home',apiController.homepage);
router.get('/sorteio',apiController.sorteio);
router.get('/listasorteio',apiController.listasorteio);
router.get('/Sendemail',apiController.sendemail);
module.exports = router;