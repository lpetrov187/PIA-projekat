import { Timestamp } from 'mongodb'
import mongoose from 'mongoose'

const Schema = mongoose.Schema

let ScheduledAppointment = new Schema({
    pacijent: {
        type: String
    },
    pregled: {
        type: String
    },
    trajanje: {
        type: String
    },
    datum: {
        type: String
    },
    vreme: {
        type: String
    },
    ogranak: {
        type: String
    },
    lekar: {
        type: String
    },
    ime_lekara: {
        type: String
    },
    prezime_lekara: {
        type: String
    }
})

export default mongoose.model('ScheduledAppointmentModel', ScheduledAppointment, 'zakazaniPregledi')