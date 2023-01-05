const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BDSchema = new Schema({
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

});

const BD = mongoose.model('AmigoSecreto', BDSchema);
module.exports = BD;