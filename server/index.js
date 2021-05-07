const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

const dbUrl = 'mongodb+srv://admin:<pw>@cluster0.sb5ut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.log('db csatlakoztatva');
})

mongoose.connection.on('error', (err) => {
    console.log('Hiba tortént', err);
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

const routes = require('./routes');

app.use('/api', routes);
//app.use('/api/product', productRoutes);


app.listen(port, () => {
    console.log('The server is running!')
});
