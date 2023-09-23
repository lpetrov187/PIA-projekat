import mongoose from 'mongoose'

const Schema = mongoose.Schema

let Examination = new Schema({
    naziv: {
        type: String
    },
    cena: {
        type: String
    },
    trajanje: {
        type: String
    },
    specijalizacija: {
        type: String
    }
})

export default mongoose.model('ExaminationModel', Examination, 'pregledi')