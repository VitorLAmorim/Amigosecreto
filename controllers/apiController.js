
// importar modelo
const PI = require('../models/ApiModels');

exports.test = function (req, res) {
    res.render('Frontpage');
  };
  

exports.update = function (req, res, next) {
  PI.findByIdAndUpdate({_id: req.params.id},
    req.body).then(function(){  
  res.redirect('/api/listAll');
  }).catch(next);
};

exports.edit = function (req, res, next) {
  PI.findOne({_id: req.params.id}).then(function(pi){
    res.render('Editar', {pi: pi});
  }).catch(next);
};

exports.delete = function (req, res, next) {
  // apaga ‘pi’ da BD, depois, devolve o ‘pi’ apagado ao cliente
  PI.findOneAndDelete({_id: req.params.id}).then(function(pi){
    console.log("Registo eliminado com sucesso!");
    res.redirect('/api/listAll');
  }).catch(next);
};


// adicionar novo ponto de interesse
exports.create = function (req, res,next) {
  // cria novo ‘pi’ na BD a partir do request, depois, devolve o
  //‘pi’ criado ao cliente
  PI.create(req.body).then(function(pi){
    res.redirect('/api/listAll');
  }).catch(next);
};

exports.listAll = function (req, res, next) {
  PI.find({}).then(function(pi){
    res.render('Frontpage', {pis: pi});
  }).catch(next);
};


exports.sorteio = function (req, res, next) {
  PI.find({}).then(function(pi) 
  { 
    shuffleArray(pi);
    res.redirect('/api/listasorteio');
  }).catch(next);
};

exports.listasorteio = function (req, res, next) {
  PI.find({}).then(function(pi) 
  { 
    res.render('Sorteio', {pis:pi});
  }).catch(next);
};



async function shuffleArray(arr) {
    var texto = {};
    var tirados = [];
    var j=0;
   
for (let i = 0;i<=arr.length-1; i++) { 
  if((i==(arr.length-1)) && (tirados.indexOf(i) == -1)){
    i=-1;
    tirados = [];
  }
  else{
    console.log('nem entrou');
    while ((tirados.indexOf(j) != -1) || j==i ){  
      j = Math.floor(Math.random() * (arr.length));    
    } 
  
    var json = {};  
    json['tirou']=arr[j].name;
    texto['_id'] = arr[i].id;
    await PI.findByIdAndUpdate(texto,json);
    tirados[i]=j;
    
}}
}

