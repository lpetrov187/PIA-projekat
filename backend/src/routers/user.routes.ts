import express, { Router } from 'express'
import { UserController } from '../controllers/user.controller';
import { RequestController } from '../controllers/request.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/getAllDoctors').post(
    (req, res) => new UserController().getAllDoctors(req, res)
)

userRouter.route('/registerDoctor').post(
    (req, res) => new UserController().register(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePass(req, res)
)

userRouter.route('/getAllUsers').post(
    (req, res) => new UserController().getAllUsers(req, res)
)

userRouter.route('/getAllRequests').post(
    (req, res) => new UserController().getAllRequests(req, res)
)

userRouter.route('/deleteUser').post(
    (req, res) => new UserController().deleteUser(req, res)
)

userRouter.route('/updateUser').post(
    (req, res) => new UserController().updateUser(req, res)
)

userRouter.route('/updateDoctor').post(
    (req, res) => new UserController().updateDoctor(req, res)
)

userRouter.route('/updateDoctorManager').post(
    (req, res) => new UserController().updateDoctorManager(req, res)
)

userRouter.route('/updateImg').post(
    (req, res) => new UserController().updateImg(req, res)
)

export default userRouter;