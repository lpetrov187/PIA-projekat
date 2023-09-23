import express, { Router } from 'express'
import { RequestController } from '../controllers/request.controller';

const requestRouter = express.Router();

requestRouter.route('/sendRequest').post(
    (req, res) => new RequestController().send(req, res)
)

requestRouter.route('/acceptRequest').post(
    (req, res) => new RequestController().acceptRequest(req, res)
)

requestRouter.route('/denyRequest').post(
    (req, res) => new RequestController().denyRequest(req, res)
)

export default requestRouter;