import express from 'express'
import ReportModel from '../models/report.model'
import reportModel from '../models/report.model'
import jsPDF from 'jspdf'

const nodemailer = require('nodemailer'); 
const transporter = nodemailer.createTransport({ 
   host: 'smtp.gmail.com', 
   port: 465, 
   secure: true, 
   auth: { 
     user: 'petrovlazar5@gmail.com', 
     pass: 'ahstfxkwikddcpak', 
   }, 
   tls: {
    rejectUnauthorized: false
  }
});

const QRCode = require('qrcode');
const fs = require('fs');

const options = {
  width: 300,
  errorCorrectionLevel: 'H',
};




export class ReportController{
    addReport = (req: express.Request, res: express.Response) => {
        const newReport = new ReportModel({
            pacijent: req.body.customer,
            datum: req.body.date,
            vreme: req.body.time,
            lekar: req.body.doctor,
            ime_lekara: req.body.docName,
            prezime_lekara: req.body.docSurname,
            specijalizacija: req.body.specialisation,
            razlog: req.body.examination,
            dijagnoza: req.body.diagnosis,
            preporucena_terapija: req.body.therapy,
            datum_kontrole: req.body.checkDate
        })

        newReport.save((err, newRep) => {
            if(err) {
                console.log(err);
            } else {
                res.json(newRep);
            }
        })
    }

    getAllReports = (req: express.Request, res: express.Response) => {
        reportModel.find((err, reps) => {
            if(err) {
                console.log(err);
            } else {
                res.json(reps)
            }
        })
    }

    generatePDF = (req: express.Request, res: express.Response) => {
        let customer = req.body.customer
        let date = req.body.date
        let time = req.body.time
        let doctorName = req.body.doctorName
        let doctorSurname = req.body.doctorSurname
        let specialisation = req.body.specialisation
        let cause = req.body.cause
        let diagnosis = req.body.diagnosis
        let therapy = req.body.therapy
        let checkDate = req.body.checkDate
        let email = req.body.email

        let text1 = "Pacijent: " + customer;
        let text2 = "Datum i vreme: " + date + " " + time;
        let text3 = "Doktor: " + doctorName + " " + doctorSurname;
        let text4 = "Izvrsen pregled: " + cause;
        let text5 = "Dijagnoza: " + diagnosis;
        let text6 = "Preporucena terapija: " + therapy;
        let text7 = "Preporucena kontrola: " + checkDate;

        var doc = new jsPDF();
	
        doc.text("Izvestaj sa pregleda", 60, 20)
        doc.text(text1 , 20, 50);
        doc.text(text2 , 20, 70);
        doc.text(text3 , 20, 90);
        doc.text(text4 , 20, 110);
        doc.text(text5 , 20, 130);
        doc.text(text6 , 20, 150);
        doc.text(text7 , 20, 170);

        let name = customer + "" + date + ".pdf"
        let nameQR = customer + "" + date

        doc.save(`src/pdfs/izvestaj_${name}`);

        let link = "http://localhost:4200/pdfs/izvestaj_" + name;


        // Generate the QR code as a data URI
        QRCode.toDataURL(link, options, (err, url) => {
          if (err) {
            console.error('Error generating QR code:', err);
            return;
          }

          // Save the QR code as an image file (optional)
          fs.writeFileSync(`src/qrcodes/qrcode_${nameQR}.png`, url.split(',')[1], 'base64');

          console.log('QR code generated successfully!');
        });

        const mailOptions = { 
            from: 'petrovlazar5@gmail.com', 
            to: email, 
            subject: 'Izvestaj sa pregleda', 
            text: `Izvestaj mozete preuzeti na linku http://localhost:4200/pdfs/izvestaj_${name}, ili skeniranjem QR koda koji je prilozen.`, 
            attachments: [
              {
                filename: 'attachment.png',
                path: `./src/qrcodes/qrcode_${nameQR}.png`, // Replace with the actual path to your PNG file
              },
            ],
          }; 
         
          // Send email using the configured transporter 
        transporter.sendMail(mailOptions, (error, info) => { 
          if (error) { 
            console.error(error); 
            res.json({ 'message': 'Greska!' }); 
          } else { 
            //console.log('Password reset email sent:', info.response); 
            res.json({ 'message': 'Link za skidanje PDF izvestaja je poslat na mejl.' }); 
          } 
        }); 

         
    }
}