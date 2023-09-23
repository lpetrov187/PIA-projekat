import mongoose from 'mongoose'

const Schema = mongoose.Schema

let ChosenExamination = new Schema({
    lekar: {
        type: String
    },
    pregled: {
        type: String
    }
})

export default mongoose.model('ChosenExaminationModel', ChosenExamination, 'izabraniPregledi')