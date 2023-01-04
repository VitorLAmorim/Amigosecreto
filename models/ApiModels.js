const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// PI Schema
const PISchema = new Schema({
  name: {
  type: String,
  required: [true, '*Campo obrigatório!']
  },
  email: {
  type: String
  },
  tirou: {
    type : String
  }
// TODO: geo location
});
// criar Modelo_PI baseado em PISchema: ‘PontosInteresse’->nome da // coleção
const PI = mongoose.model('AmigoSecreto', PISchema);
// exportar Modelo_PI
module.exports = PI;