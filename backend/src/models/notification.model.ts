import mongoose from 'mongoose'

const Schema = mongoose.Schema

let Notification = new Schema({
    pacijent: {
        type: String
    },
    tekst: {
        type: String
    },
    datum: {
        type: String
    },
    vreme: {
        type: String
    },
    procitano: {
        type: Boolean
    }
})

export default mongoose.model('NotificationModel', Notification, 'obavestenja')