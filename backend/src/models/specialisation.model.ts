import mongoose from 'mongoose'

const Schema = mongoose.Schema

let Specialisation = new Schema({
    naziv: {
        type: String
    }
})

export default mongoose.model('SpecialisationModel', Specialisation, 'specijalizacija')