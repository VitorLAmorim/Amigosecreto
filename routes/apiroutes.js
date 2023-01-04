const express = require ('express');
const router = express.Router();
// importa controlador 'apiController.js' da pasta: 
// ‘../controllers/apiController’
const apiController = require('../controllers/apiController');
// url do teste será: http://localhost:5000/api/teste
router.get('/teste', apiController.test);
router.post('/create',apiController.create);
router.get('/editar/:id',apiController.edit);
router.post('/update/:id',apiController.update);
router.get('/delete/:id',apiController.delete);
router.get('/listAll',apiController.listAll);
router.get('/sorteio',apiController.sorteio);
router.get('/listasorteio',apiController.listasorteio);
module.exports = router;