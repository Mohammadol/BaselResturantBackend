const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Import your Sequelize configuration
const restaurantTablesRoutes = require('./routes/restaurantTablesRouter');
const restaurantRoutes = require('./routes/restaurantRouter');
const orderRoutes = require('./routes/orderRouter');
const addonRouter = require('./routes/addonRouter');
const groupRouter = require('./routes/groupRouter');
const materialRouter = require('./routes/materialRouter');
const departmentRouter = require('./routes/departmentRouter');
const captainRoutes = require('./routes/captainRouter');
const associations= require('./associations');
const app = express();
const syncModels  = require('./associations');

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
app.use('/department', departmentRouter);
app.use('/captains', captainRoutes);
app.use('/order',orderRoutes);


// Sync Sequelize models and start the server
syncModels.syncModels()
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(error => {
    console.error('Failed to sync database:', error);
  });