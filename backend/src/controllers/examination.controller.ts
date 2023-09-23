import express from 'express'
import ExaminationModel from '../models/examination.model'
import ChosenExaminationModel from '../models/chosenExamination.model'
import ScheduledAppointmentModel from '../models/scheduledAppointment'
import ExaminationRequestModel from '../models/examinationRequest'
import NotificationModel from '../models/notification.model'


export class ExaminationController{
    addExamination = (req: express.Request, res: express.Response) => {
        const newExamination = new ExaminationModel({
            naziv: req.body.name,
            trajanje: req.body.len,
            cena: req.body.price,
            specijalizacija: req.body.spec
        })

        newExamination.save((err, newExam) => {
            if(err) {
                console.log(err);
            } else {
                res.json(newExam);
            }
        })
    }

    getAllExaminations = (req: express.Request, res: express.Response) => {
        ExaminationModel.find((err, examinations) => {
            if(err) console.log(err)
            else res.json(examinations)
        })
    }

    updateExamination = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let price = req.body.price;
        let length = req.body.length;

        ExaminationModel.findOneAndUpdate({'naziv': name}, {$set: {'cena': price, 'trajanje': length}}, (err, resp) => {
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    deleteExamination = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        ExaminationModel.findOneAndDelete({'naziv': name}, (err, resp) => {
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    getChosenExaminations = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;

        ChosenExaminationModel.find({'lekar': doctor}, (err, examinations) => {
            if(err) console.log(err)
            else res.json(examinations)
        })
    }

    addChosenExamination = (req: express.Request, res: express.Response) => {
        const newChosenExamination = new ChosenExaminationModel({
            lekar: req.body.doctor,
            pregled: req.body.examination
        })

        newChosenExamination.save((err, newExam) => {
            if(err) {
                console.log(err);
            } else {
                res.json(newExam);
            }
        })
    }

    removeChosenExamination = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        let exam = req.body.examination;

        ChosenExaminationModel.findOneAndDelete({'lekar': doctor, 'pregled': exam}, (err, resp) => {
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    scheduleAppointment = (req: express.Request, res: express.Response) => {
        const newScheduledAppointment = new ScheduledAppointmentModel({
            pacijent: req.body.customer,
            pregled: req.body.examination,
            trajanje: req.body.length,
            datum: req.body.date,
            vreme: req.body.time,
            ogranak: req.body.branch,
            lekar: req.body.doctor,
            ime_lekara: req.body.name,
            prezime_lekara: req.body.surname
        })

        newScheduledAppointment.save((err, newSA) => {
            if(err) {
                console.log(err);
            } else {
                res.json(newSA);
            }
        })
    }

    getScheduledAppointments = (req: express.Request, res: express.Response) => {
        ScheduledAppointmentModel.find((err, appointments) => {
            if(err) console.log(err)
            else res.json(appointments)
        })
    }

    updateAppointment = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let length = req.body.length;

        ScheduledAppointmentModel.findOneAndUpdate({'naziv': name}, {$set: {'trajanje': length}}, (err, resp) => {
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    cancelAppointment = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        let date = req.body.date;
        let time = req.body.time;

        ScheduledAppointmentModel.findOneAndDelete({'lekar': doctor, 'datum': date, 'vreme': time}, (err, resp) => {
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    sendNewExaminationRequest = (req: express.Request, res: express.Response) => {
        const newExaminationRequest = new ExaminationRequestModel({
            naziv: req.body.name,
            trajanje: req.body.length,
            cena: req.body.price,
            specijalizacija: req.body.specialisation
        })

        newExaminationRequest.save((err, newER) => {
            if(err) {
                console.log(err);
            } else {
                res.json(newER);
            }
        })
    }

    getExaminationRequests = (req: express.Request, res: express.Response) => {
        ExaminationRequestModel.find((err, examinations) => {
            if(err) console.log(err)
            else res.json(examinations)
        })
    }

    removeExaminationRequest = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let price = req.body.price;
        let length = req.body.length;
        let specialisation = req.body.specialisation;

        ExaminationRequestModel.findOneAndDelete({'naziv': name, 'cena': price, 'trajanje': length, 'specijalizacija': specialisation}, (err, resp) => {
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    cancelAppointmentDoctor = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        let date = req.body.date;
        let time = req.body.time;

        ScheduledAppointmentModel.findOneAndDelete({'lekar': doctor, 'datum': date, 'vreme': time}, (err, resp) => {
            if(err) console.log(err)
            else{
                const newNotificationAppointment = new NotificationModel({
                    pacijent: req.body.customer,
                    tekst: "Doktor " + req.body.name + " " + req.body.surname + " je otkazao pregled \"" + req.body.examination + "\" koji je bio zakazan za " + req.body.date + " u " + req.body.time + ". Razlog: " + req.body.cause + ".",
                    datum: null,
                    vreme: null,
                    procitano: false
                })

                newNotificationAppointment.save((err, newCA) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.json(newCA);
                    }
                })
            }
        })
    }
}