import express, { Router } from 'express'
import { SpecialisationController } from '../controllers/specialisation.controller';

const specialisationRouter = express.Router();

specialisationRouter.route('/addSpecialisation').post(
    (req, res) => new SpecialisationController().addSpecialisation(req, res)
)

specialisationRouter.route('/getAllSpecialisations').post(
    (req, res) => new SpecialisationController().getAllSpecialisations(req, res)
)


export default specialisationRouter;