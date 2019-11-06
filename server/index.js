const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectionString =
  'mongodb+srv://lennonpuype:Azerty123@devinenotes-hbzdu.mongodb.net/test?retryWrites=true';

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('db connected'))
  .catch(e => {
    console.log('Error, exiting', e);
    process.exit();
  });

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build/')));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./app/routes/auth.routes.js')(app);
require('./app/routes/notes.routes.js')(app);
require('./app/routes/comments.routes.js')(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Server luistert op poort ${process.env.PORT}`);
});
