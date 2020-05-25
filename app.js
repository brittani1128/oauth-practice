import express from 'express';
import router from './routes/auth-routes.js';
import './config/env.js';
import './config/passport-setup.js';
import mongoose from 'mongoose';

const app = express();

// set up view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to mongodb');
});

// set up routes
app.use('/auth', router);

// create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => console.log('App now listening for requests on port 3000'));