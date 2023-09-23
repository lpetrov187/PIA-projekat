import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routers/user.routes';
import requestRouter from './routers/request.routes';
import specialisationRouter from './routers/specialisation.routes';
import examinationRouter from './routers/examination.routes';
import reportRouter from './routers/report.routes';
import notificationRouter from './routers/notification.routes';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json())
app.use('/pdfs', express.static(path.join('./src/pdfs')))
  

mongoose.connect('mongodb://127.0.0.1:27017/bazaZaPredaju')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router()
router.use('/users', userRouter)
router.use('/requests', requestRouter)
router.use('/specialisations', specialisationRouter)
router.use('/examinations', examinationRouter)
router.use('/reports', reportRouter)
router.use('/notifications', notificationRouter)


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));