import { Router } from 'express';
import * as StepController from '../controllers/step.controller';
const router = new Router();

// Get all Posts
router.route('/learn').get(StepController.getSteps);

// Get one post by cuid
router.route('/learn/:cuid').get(StepController.getStep);

export default router;
