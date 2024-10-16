const express = require('express');
const mysql = require('mysql2');
const restaurantTablesRoutes = require('./routes/restaurantTablesRouter');
const restaurantRoutes = require('./routes/restaurantRouter');
const addonRouter =require('./routes/addonRouter');
const groupRouter=require('./routes/groupRouter');
const materialRouter=require('./routes/materialRouter');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; // Adjust the port number as needed

// Connect to the database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Mohammad_161281',
    database: 'baseldatabase'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL')
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/restaurantTables', restaurantTablesRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/addons', addonRouter);
app.use('/groups', groupRouter);
app.use('/material', materialRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});