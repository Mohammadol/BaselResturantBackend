const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Import your Sequelize configuration
const restaurantTablesRoutes = require('./routes/restaurantTablesRouter');
const restaurantRoutes = require('./routes/restaurantRouter');
const addonRouter = require('./routes/addonRouter');
const groupRouter = require('./routes/groupRouter');
const materialRouter = require('./routes/materialRouter');
const associations= require('./associations');
const app = express();
const port = 3000; // Adjust the port number as needed

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
associations
// Route handlers
app.use('/restaurantTables', restaurantTablesRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/addons', addonRouter);
app.use('/groups', groupRouter);
app.use('/material', materialRouter);

// Sync Sequelize models and start the server
sequelize.sync()
    .then(() => {
        console.log('Database & tables created or updated!');
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });
