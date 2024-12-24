const Order = require('../models/orders');
const OrderItem = require('../models/orderItems');
const Table = require('../models/restaurantTable'); 

const createOrder = async (req, res) => {
  try {
    const { tableId, orderItems } = req.body;

    let orderData = {
      tableId, 
      total: calculateTotal(orderItems), 
      paymentStatus: 'pending' 
    };

    if (!tableId) { 
      delete orderData.tableId; 
    }

    const order = await Order.create(orderData);

    const createdOrderItems = await Promise.all(
      orderItems.map(async (orderItem) => {
        return OrderItem.create({ orderId: order.id, ...orderItem }); 
      })
    );

    order.setOrderItems(createdOrderItems); 

    res.status(201).json(order); 
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order', message: error.message }); 
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderItem,
          // Include associated order items
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error getting order:', error);
    res.status(500).json({ error: 'Failed to get order' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { isDeleted: false }, // Only get active orders
      include: [
        {
          model: OrderItem,
          // Include associated order items
        }
      ]
    });

    res.json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ error: 'Failed to get orders' });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { tableId, paymentStatus, total, discount } = req.body; 

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.tableId = tableId || order.tableId; // Allow tableId to be optional
    order.paymentStatus = paymentStatus || order.paymentStatus;
    order.total = total || order.total; 
    order.discount = discount || order.discount; 

    await order.save();

    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

const softDeleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.isDeleted = true;
    await order.save();

    res.json({ message: 'Order soft deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to soft delete order' });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  softDeleteOrder
};