const express = require('express');
// inicializar app express
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/build')));
// ‘END POINT INVÁLIDO!’
app.get('/', function(req, res){
    res.render('Frontpage');
  });
  const routes = require('./routes/apiroutes');
  app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

  // MIDDLEWARE DE ERRO
app.use(function(err, req, res, next){
    console.log(err);
   // ‘res.status(422)’->muda o status
   res.status(422).send({error: err.message});
 });
 app.use(express.static('public'));



let port = 5000;
app.listen(process.env.PORT || port, () =>{
  console.log('Servidor em execução na porta: '+ port);
});


//CONEXÃO BD
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://remoto:remoto123@amigosecreto.udm3xsb.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('connected', function () {
  console.log('Connected to Database ');
});
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

