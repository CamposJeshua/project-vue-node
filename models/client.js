import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const clientSchema = new Schema({

  firstName: {type: String, required: [true, 'First name required']},
  lastName: {type: String, required: [true, 'Last name required']},
  email: {type: String, required: [true, 'Email required']},
  phoneNumber: {type: String, required: [true, 'Phone Number required']},
  address: String,
  userId: String,
  date:{type: Date, default: Date.now},
  activo: {type: Boolean, default: true}

});

// Model convertion
const Client = mongoose.model('Client', clientSchema);

export default Client;