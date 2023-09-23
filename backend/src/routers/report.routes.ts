import express, { Router } from 'express'
import { ReportController } from '../controllers/report.controller';

const reportRouter = express.Router();

reportRouter.route('/addReport').post(
    (req, res) => new ReportController().addReport(req, res)
)

reportRouter.route('/getAllReports').post(
    (req, res) => new ReportController().getAllReports(req, res)
)

reportRouter.route('/generatePDF').post(
    (req, res) => new ReportController().generatePDF(req, res)
)

export default reportRouter;