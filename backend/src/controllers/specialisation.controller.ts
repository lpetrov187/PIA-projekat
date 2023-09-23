import express from 'express'
import SpecialisationModel from '../models/specialisation.model'


export class SpecialisationController{
    addSpecialisation = (req: express.Request, res: express.Response) => {
        const newSpecialisaton = new SpecialisationModel({
            naziv: req.body.name
        })

        newSpecialisaton.save((err, newSpec) => {
            if(err) {
                console.log(err);
            } else {
                res.json(newSpec);
            }
        })
    }

    getAllSpecialisations = (req: express.Request, res: express.Response) => {
        SpecialisationModel.find((err, specialisations) => {
            if(err) console.log(err)
            else res.json(specialisations)
        })
    }
}