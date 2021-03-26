import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

// DB Conection
const mongoose = require('mongoose');

// Cloud Conection
const uri = 'mongodb+srv://userdbtest:15262000@cluster0.bf3iw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true
}
mongoose.connect(uri, options).then(
  () => { console.log('mongoDB connection succes'); },
  err => { err }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/client'));

// Middleware for Vue.js router history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Example app listening on port'+ app.get('port'));
});