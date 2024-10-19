const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Import your Sequelize configuration
const restaurantTablesRoutes = require('./routes/restaurantTablesRouter');
const restaurantRoutes = require('./routes/restaurantRouter');
const addonRouter = require('./routes/addonRouter');
const groupRouter = require('./routes/groupRouter');
const materialRouter = require('./routes/materialRouter');
const departmentRouter = require('./routes/departmentRouter');
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
app.use('/department', departmentRouter);

// Sync Sequelize models and start the server
sequelize.sync({ alter: true }) // 'alter: true' ensures the schema gets updated without dropping tables
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(error => {
    console.error('Failed to sync database:', error);
  });
