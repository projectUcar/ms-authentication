import {Router} from 'express'
import {
    checkExistingUser,
  } from "../middlewares/verifySingup.js";
  import { authenticateUser } from '../middlewares/authJwt';


const router = Router()
import * as authCtrl from '../controllers/auth.controller.js'
import * as verifyTokenCtrl from '../controllers/verifyToken.controllers.js';

router.post('/singup', [checkExistingUser], authCtrl.singup)
router.post('/singin', authCtrl.singin)
router.get('/validate-token', authenticateUser, verifyTokenCtrl.validateToken);

export default router