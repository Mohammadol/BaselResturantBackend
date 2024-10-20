const RestaurantTable = require('../models/restaurantTable');

// GET Restaurant Table by ID
const getRestaurantTableById = async (req, res) => {
    try {
        const id = req.params.id;
        const restaurantTable = await RestaurantTable.findByPk(id);

        if (!restaurantTable) {
            return res.status(404).json({ error: 'Restaurant table not found' });
        }

        res.json(restaurantTable);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve restaurant table' });
    }
};

const updateRestaurantTable = async (req, res) => {
    try {
      const id = req.params.id;
      const { number, color, chairs, used, carrier, restaurant } = req.body;
  
      // Find the restaurant table by ID
      const restaurantTable = await RestaurantTable.findByPk(id);
  
      if (!restaurantTable) {
        return res.status(404).json({ error: 'Restaurant table not found' });
      }
  
      // Update the table with new values (if provided)
      restaurantTable.number = number || restaurantTable.number;
      restaurantTable.color = color || restaurantTable.color;
      restaurantTable.chairs = chairs || restaurantTable.chairs;
      restaurantTable.used = used || restaurantTable.used;
      restaurantTable.carrier = carrier || restaurantTable.carrier;
      restaurantTable.restaurant = restaurant || restaurantTable.restaurant;
  
      // Save the updated table
      await restaurantTable.save();
  
      res.json({ message: 'Restaurant table updated successfully' });
    } catch (error) {
      console.error('Error updating restaurant table:', error);
      res.status(500).json({ error: 'Failed to update restaurant table' });
    }
  };
const getRestaurants = async (req, res) => {
    try {
        const restaurantTable = await RestaurantTable.findAll();
        res.json(restaurantTable);

    } catch {
        res.status(404).json({ error: 'Could not fitvh the data' });

    }

}
// CREATE Restaurant Table
const createRestaurantTable = async (req, res) => {
    try {
        const { number, color, chairs, used, carier, restaurant } = req.body;
        // Validate input data (you can add more validation as needed)
        if (!number || !color || !chairs || !restaurant) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const newTable = await RestaurantTable.create({ number, color, chairs, used, carier, restaurant });

        res.status(201).json(newTable);

    } catch (error) {
        res.status(500).json({ error: 'Failed to create restaurant table' });
    }
};

// DELETE Restaurant Table
const deleteRestaurantTable = async (req, res) => {
    try {
        const id = req.params.id;
        const restaurantTable = await RestaurantTable.findByPk(id);

        if (!restaurantTable) {
            return res.status(404).json({ error: 'Restaurant table not found' });
        }

        await restaurantTable.destroy();
        res.json({ message: 'Restaurant table deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete restaurant table' });
    }
};

module.exports = {
    getRestaurantTableById,
    createRestaurantTable,
    deleteRestaurantTable,
    getRestaurants,
    updateRestaurantTable,
};