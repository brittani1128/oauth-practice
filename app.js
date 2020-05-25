import express from 'express';
import router from './routes/auth-routes.js';
import './config/env.js';
import './config/passport-setup.js';

const app = express();

// set up view engine
app.set('view engine', 'ejs');

// set up routes
app.use('/auth', router);

// create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => console.log('App now listening for requests on port 3000'));