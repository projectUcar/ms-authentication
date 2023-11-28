import {Router} from 'express'
import {
    checkExistingRole,
    checkExistingUser,
  } from "../middlewares/verifySingup.js";

const router = Router()
import * as authCtrl from '../controllers/auth.controller.js'

router.post('/singup', [checkExistingUser], authCtrl.singup)
router.post('/singin', authCtrl.singin)

export default router