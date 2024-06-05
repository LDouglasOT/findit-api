const { createNotification, getAllNotifications, getNotificationById, updateNotificationById, deleteNotificationById } = require("../Controllers/Notifications")
const express = require('express');
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management
 */

/**
 * @swagger
 * /notifications/create:
 *   post:
 *     summary: Create a new notification
 *     description: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               header:
 *                 type: string
 *               global:
 *                 type: string
 *               userId:
 *                 type: string
 *               seen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification created successfully
 */

router.post('/notifications/create', createNotification);

/**
 * @swagger
 * /notifications/getall:
 *   get:
 *     summary: Get all notifications
 *     description: Retrieve all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: List of notifications retrieved successfully
 */

router.get('/notifications/getall', getAllNotifications);

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get a notification by ID
 *     description: Retrieve a notification by its ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification retrieved successfully
 *       404:
 *         description: Notification not found
 */

router.get('/notifications/:id', getNotificationById);

/**
 * @swagger
 * /notifications/{id}:
 *   put:
 *     summary: Update a notification by ID
 *     description: Update a notification by its ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               header:
 *                 type: string
 *               global:
 *                 type: string
 *               userId:
 *                 type: string
 *               seen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *       404:
 *         description: Notification not found
 */

router.put('/notifications/:id', updateNotificationById);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Delete a notification by ID
 *     description: Delete a notification by its ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the notification to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 */

router.delete('/notifications/:id', deleteNotificationById);

module.exports = router;
