import express, { Router } from 'express'
import { NotificationController } from '../controllers/notification.controller';

const notificationRouter = express.Router();

notificationRouter.route('/addNotification').post(
    (req, res) => new NotificationController().addNotification(req, res)
)

notificationRouter.route('/getAllNotifications').post(
    (req, res) => new NotificationController().getAllNotifications(req, res)
)

notificationRouter.route('/markAsRead').post(
    (req, res) => new NotificationController().markAsRead(req, res)
)

export default notificationRouter;