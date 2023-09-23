import mongoose from 'mongoose'

const Schema = mongoose.Schema

let User = new Schema({
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
    broj_licence: {
        type: String
    },
    specijalizacija: {
        type: String
    },
    ogranak_ordinacije: {
        type: String
    },
    tip: {
        type: String
    },
    slika: {
        type: String
    }
})

export default mongoose.model('UserModel', User, 'korisnici')