// associar as dependências instaladas
const express = require('express');
// inicializar app express
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// ‘END POINT INVÁLIDO!’
app.get('/', function(req, res){
    res.render('Frontpage');
  });
  // todo o url começado por ‘/api’ chama as rotas em ‘./routes/api’
  const routes = require('./routes/apiroutes');
  app.use('/api', routes);


  // MIDDLEWARE DE ERRO
app.use(function(err, req, res, next){
    console.log(err);
   // ‘res.status(422)’->muda o status
   res.status(422).send({error: err.message});
 });
 app.use(express.static('public'));



let port = 5000;
// servidor á escuta no porto 5000
// 'process.env.port': caso usemos Heroku
app.listen(process.env.PORT || port, () =>{
  console.log('Servidor em execução na porta: '+ port);
});


//CONEXÃO BD
const mongoose = require('mongoose');
// Ligar á B.D.: 'test'->user da BD, ´nnn´->pass
mongoose.connect('mongodb+srv://remoto:remoto123@amigosecreto.udm3xsb.mongodb.net/?retryWrites=true&w=majority');
// Confirma ligação na consola
mongoose.connection.on('connected', function () {
  console.log('Connected to Database ');
});
// Mensagem de Erro
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

