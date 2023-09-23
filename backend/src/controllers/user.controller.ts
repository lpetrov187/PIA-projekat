import express from 'express'
import UserModel from '../models/user.model'
import { Request, Response } from 'express-serve-static-core';
import requestModel from '../models/request.model';
import userModel from '../models/user.model';


export class UserController{
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'korisnicko_ime': username, 'lozinka': password}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user)
        })
    }

    getAllDoctors = (req: express.Request, res: express.Response) => {
        UserModel.find({'tip': 'lekar'}, (err, doctors) => {
            if(err) console.log(err)
            else res.json(doctors)
        })
    }

    getAllUsers = (req: express.Request, res: express.Response) => {
        UserModel.find((err, users) => {
            if(err) console.log(err)
            else res.json(users)
        })
    }

    getAllRequests = (req: express.Request, res: express.Response) => {
        requestModel.find((err, requests) => {
            if(err) console.log(err)
            else res.json(requests)
        })
    }

    register = (req: express.Request, res: express.Response) => {
        const doctor = new UserModel({
            korisnicko_ime: req.body.username,
            lozinka: req.body.password,
            ime: req.body.name,
            prezime: req.body.surname,
            adresa: req.body.address,
            telefon: req.body.phone,
            mejl: req.body.email,
            broj_licence: req.body.licenceNum,
            specijalizacija: req.body.specialisation,
            ogranak_ordinacije: req.body.branch,
            tip: "lekar",
            slika: req.body.imageSrc
        })

        doctor.save((err, newRequest) => {
            if(err) {
                console.log(err);
            } else {
                res.json(newRequest);
            }
        })
    }

    changePass = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        UserModel.updateOne({'korisnicko_ime': username}, { $set: {'lozinka': password}}, (err, resp) => {
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    deleteUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let email = req.body.email;
        UserModel.findOneAndDelete({'korisnicko_ime': username}, (err, resp) => {
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    updateUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let name = req.body.name
        let surname = req.body.surname
        let address = req.body.address
        let phone = req.body.phone
        let email = req.body.email

        UserModel.findOneAndUpdate({'korisnicko_ime': username}, {$set: {'ime': name, 'prezime': surname, 'adresa': address, 'telefon': phone, 'mejl': email}}, (err, resp) => {
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    updateDoctor = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let name = req.body.name
        let surname = req.body.surname
        let address = req.body.address
        let phone = req.body.phone
        let licenceNum = req.body.licenceNum
        let specialisation = req.body.specialisation

        UserModel.findOneAndUpdate({'korisnicko_ime': username}, {$set: {'ime': name, 'prezime': surname, 'adresa': address, 'telefon': phone, 'broj_licence': licenceNum, 'specijalizacija': specialisation}}, (err, resp) => {
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    updateDoctorManager = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let name = req.body.name
        let surname = req.body.surname
        let address = req.body.address
        let phone = req.body.phone
        let mail = req.body.mail
        let licenceNum = req.body.licenceNum
        let specialisation = req.body.specialisation
        let branch = req.body.branch

        UserModel.findOneAndUpdate({'korisnicko_ime': username}, {$set: {'ime': name, 'prezime': surname, 'adresa': address, 'telefon': phone, 'mejl': mail, 'broj_licence': licenceNum, 'specijalizacija': specialisation, 'ogranak_ordinacije': branch}}, (err, resp) => {
            if(err) console.log(err)
            else res.json(resp)
        })
    }

    updateImg = (req: express.Request, res: express.Response) => {
        let username = req.body.username
        let img = req.body.image

        UserModel.findOneAndUpdate({'korisnicko_ime': username}, {$set: {'slika': img}}, (err, resp) => {
            if(err) console.log(err)
            else res.json(resp)
        })
    }
}
    