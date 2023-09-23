import mongoose from 'mongoose'

const Schema = mongoose.Schema

let Report = new Schema({
    pacijent: {
        type: String
    },
    datum: {
        type: String
    },
    vreme: {
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
    },
    specijalizacija: {
        type: String
    },
    razlog: {
        type: String
    },
    dijagnoza: {
        type: String
    },
    preporucena_terapija: {
        type: String
    },
    datum_kontrole: {
        type: String
    }
})

export default mongoose.model('ReportModel', Report, 'izvestaji')