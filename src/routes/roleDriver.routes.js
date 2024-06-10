import { Router } from 'express';

const router = Router();
import * as changeRoleCtrl from '../controllers/roleDriver.controller';

router.get("/driver-role/:id", changeRoleCtrl.changeRoleDriver);

export default router;