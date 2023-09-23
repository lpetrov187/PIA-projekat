import express from 'express'
import NotificationModel from '../models/notification.model'


export class NotificationController{
    addNotification = (req: express.Request, res: express.Response) => {
        const newNotification = new NotificationModel({
            pacijent: req.body.username,
            tekst: req.body.text,
            datum: req.body.date,
            vreme: req.body.time,
            procitano: req.body.read
        })

        newNotification.save((err, newRep) => {
            if(err) {
                console.log(err);
            } else {
                res.json(newRep);
            }
        })
    }

    getAllNotifications = (req: express.Request, res: express.Response) => {
        NotificationModel.find((err, notifs) => {
            if(err) {
                console.log(err);
            } else {
                res.json(notifs)
            }
        })
    } 
    
    markAsRead = (req: express.Request, res: express.Response) => {
        let name = req.body.user
        let text = req.body.text
        
        NotificationModel.findOneAndUpdate({'pacijent': name, 'tekst': text}, {$set: {'procitano': true}}, (err, notifs) => {
            if(err) {
                console.log(err);
            } else {
                res.json(notifs)
            }
        })
    }
}