import {Router} from 'express'

const router = Router()
import * as forgotPasswordCtrl from '../controllers/forgotPassword.controller.js'

router.post('/forgot-password',forgotPasswordCtrl.forgotPassword)
router.post('/reset-password/:token', forgotPasswordCtrl.resetPassword)

export default router