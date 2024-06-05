// controllers/notificationsController.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { message, header, global, userId, seen } = req.body;
    const notification = await prisma.notifications.create({
      data: {
        message,
        header,
        global,
        userId,
        seen
      }
    });
    res.json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notifications.findMany();
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a single notification by ID
const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await prisma.notifications.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json(notification);
  } catch (error) {
    console.error('Error fetching notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a notification by ID
const updateNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, header, global, userId, seen } = req.body;
    const updatedNotification = await prisma.notifications.update({
      where: {
        id: parseInt(id)
      },
      data: {
        message,
        header,
        global,
        userId,
        seen
      }
    });
    res.json(updatedNotification);
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a notification by ID
const deleteNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.notifications.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createNotification, getAllNotifications, getNotificationById, updateNotificationById, deleteNotificationById };
