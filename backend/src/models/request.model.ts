import mongoose from 'mongoose'

const Schema = mongoose.Schema

let Request = new Schema({
    korisnicko_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    mejl: {
        type: String
    },
    status: {
        type: String
    },
    slika: {
        type: String
    }
})

export default mongoose.model('RequestModel', Request, 'zahtevi')