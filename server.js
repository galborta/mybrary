
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.set('layout', __dirname + '/views/layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3000;

const mongooseOptions = {
  };
  
  const mongoURI = process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_LOCAL;
  
  mongoose.connect(mongoURI, mongooseOptions)
    .then(() => {
      console.log('Connected to MongoDB');
      // Start your server here
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
    });
  

app.use("/",indexRouter);

