import mongoose from 'mongoose'

const Schema = mongoose.Schema

let ExaminationRequest = new Schema({
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

export default mongoose.model('ExaminationRequestModel', ExaminationRequest, 'zatrazeniPregledi')