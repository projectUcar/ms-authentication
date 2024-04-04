import {Router} from 'express'
import {
    checkExistingUser,
  } from "../middlewares/verifySingup.js";
  import { authenticateUser, requireRefreshToken } from '../middlewares/authJwt';


const router = Router()
import * as authCtrl from '../controllers/auth.controller.js'
import * as verifyTokenCtrl from '../controllers/verifyToken.controllers.js';

router.post('/singup', [checkExistingUser], authCtrl.singup)
router.post('/singin', authCtrl.singin)
router.get('/validate-token', authenticateUser, verifyTokenCtrl.validateToken);
router.get('/refresh-token', requireRefreshToken, authCtrl.refreshToken);

export default router