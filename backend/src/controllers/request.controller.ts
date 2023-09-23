import express from 'express'
import RequestModel from '../models/request.model'
import { Request, Response } from 'express-serve-static-core';
import userModel from '../models/user.model';


export class RequestController{
    send = (req: express.Request, res: express.Response) => {
        const request = new RequestModel({
            korisnicko_ime: req.body.username,
            lozinka: req.body.password,
            ime: req.body.name,
            prezime: req.body.surname,
            adresa: req.body.address,
            telefon: req.body.phone,
            mejl: req.body.email,
            status: "neobradjeno",
            slika: req.body.img
        })

        request.save((err, newRequest) => {
            if(err) {
                console.log(err);
            } else {
                res.json(newRequest);
            }
        })
    }

    acceptRequest = (req: express.Request, res: express.Response) => {
        const newUser = new userModel({
            korisnicko_ime: req.body.username,
            lozinka: req.body.password,
            ime: req.body.name,
            prezime: req.body.surname,
            adresa: req.body.address,
            telefon: req.body.phone,
            mejl: req.body.email,
            slika: req.body.img,
            tip: "pacijent"
        })

        newUser.save((err, newRequest) => {
            if(err) {
                console.log(err);
            } else {
                res.json(newRequest);
            }
        })

        RequestModel.findOneAndDelete({korisnicko_ime: req.body.username}, (err, data)=>{
            if(err){
                console.log(err);
            }
        })
    }

    denyRequest = (req: express.Request, res: express.Response) => {
        RequestModel.findOneAndUpdate({korisnicko_ime: req.body.username}, {$set: {status: "odbijen"}}, (err, data)=>{
            if(err){
                console.log(err);
            }
            else res.json(data);
        })
    }
}