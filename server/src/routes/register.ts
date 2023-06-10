import { Router } from 'express';
import { RegistrationRequest } from '../models/RegistrationRequest';

const router = Router();

router.post('/', (req, res) => {
  res.status(200).send({msg:'Registration successful!'});
});

export default router;
