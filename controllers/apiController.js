
// importar modelo

const nodemailer = require('nodemailer');
var alert = require('alert');
const BD = require('../models/ApiModels');
const { pipeline } = require('stream');


exports.teste = function (req, res, next) {
  BD.find({}).then(function(pi){
  res.json({message:pi});
  }).catch(next);
};


exports.update = function (req, res, next) {
  BD.findByIdAndUpdate({_id: req.params.id},
    req.body).then(function(){  
  res.redirect('/api/Home');
  }).catch(next);
};

exports.edit = function (req, res, next) {
  BD.findOne({_id: req.params.id}).then(function(pi){
    res.render('Editar', {resposta: pi});
  }).catch(next);
};

exports.delete = function (req, res, next) {
   BD.findOneAndDelete({_id: req.params.id}).then(function(BD){
    console.log("Registo eliminado com sucesso!");
    res.redirect('/api/Home');
  }).catch(next);
};


exports.create = function (req, res,next) {
    BD.create(req.body).then(function(pi){
    res.redirect('/api/Home');
  }).catch(next);
};

exports.listAll = function (req, res, next) {
  BD.find({}).then(function(pi){
    res.render('Frontpage', {resposta: pi});
  }).catch(next);
};

exports.sorteio = function (req, res, next) {
  BD.find({}).then(function(pi) 
  { 
    SorteiaNomes(pi);
  }); 
  next();
}

exports.listasorteio = function (req, res, next) {
  BD.find({}).then(function(pi) 
  { 
    res.render('Sorteio', {resposta:pi});
  }).catch(next);
};

exports.sendemail = function (req, res, next) {
  BD.find({}).then(function(pi) 
  { 
    Enviaemails(pi);
    res.render('Envio');
  }).catch(next);
 

};


async function SorteiaNomes(arr) {
    var texto = {};
    var tirados = [];
    var j=0;
  
for (let i = 0;i<=arr.length-1; i++) { 
  if((i==(arr.length-1)) && (tirados.indexOf(i) == -1)){
    i=-1;
    tirados = [];
    console.log('nem entrou');
  }
  else{
   
    while ((tirados.indexOf(j) != -1) || j==i ){  
      j = Math.floor(Math.random() * (arr.length));    
    } 
  
    var json = {};  
    json['tirou']=arr[j].name;
    texto['_id'] = arr[i].id;
    await BD.findByIdAndUpdate(texto,json);
    tirados[i]=j;
    
}}
}


async function Enviaemails(arr){

  let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
        user: "vitordevelopall@gmail.com",
        pass: "dlowwhvqhdiizmjv",
    },
});

const tasks = [];
for (const pessoa of arr) {
    tasks.push(transporter.sendMail({
        from: '"Amigo Secreto 👀"',
        to: pessoa.email,
        subject: "Amigo Secreto - Você tirou...",
        text: `Olá ${pessoa.name}! Você tirou o(a) participante ${pessoa.tirou}`,
    }));
}

await Promise.all(tasks) 

return true;


}
