import express, { Router } from 'express'
import { ExaminationController } from '../controllers/examination.controller';

const examinationRouter = express.Router();

examinationRouter.route('/addExamination').post(
    (req, res) => new ExaminationController().addExamination(req, res)
)

examinationRouter.route('/getAllExaminations').post(
    (req, res) => new ExaminationController().getAllExaminations(req, res)
)

examinationRouter.route('/updateExamination').post(
    (req, res) => new ExaminationController().updateExamination(req, res)
)

examinationRouter.route('/deleteExamination').post(
    (req, res) => new ExaminationController().deleteExamination(req, res)
)

examinationRouter.route('/getChosenExaminations').post(
    (req, res) => new ExaminationController().getChosenExaminations(req, res)
)

examinationRouter.route('/addChosenExamination').post(
    (req, res) => new ExaminationController().addChosenExamination(req, res)
)

examinationRouter.route('/removeChosenExamination').post(
    (req, res) => new ExaminationController().removeChosenExamination(req, res)
)

examinationRouter.route('/scheduleAppointment').post(
    (req, res) => new ExaminationController().scheduleAppointment(req, res)
)

examinationRouter.route('/getScheduledAppointments').post(
    (req, res) => new ExaminationController().getScheduledAppointments(req, res)
)

examinationRouter.route('/updateAppointment').post(
    (req, res) => new ExaminationController().updateAppointment(req, res)
)

examinationRouter.route('/cancelAppointment').post(
    (req, res) => new ExaminationController().cancelAppointment(req, res)
)

examinationRouter.route('/sendNewExaminationRequest').post(
    (req, res) => new ExaminationController().sendNewExaminationRequest(req, res)
)

examinationRouter.route('/getExaminationRequests').post(
    (req, res) => new ExaminationController().getExaminationRequests(req, res)
)

examinationRouter.route('/removeExaminationRequest').post(
    (req, res) => new ExaminationController().removeExaminationRequest(req, res)
)

examinationRouter.route('/cancelAppointmentDoctor').post(
    (req, res) => new ExaminationController().cancelAppointmentDoctor(req, res)
)


export default examinationRouter;