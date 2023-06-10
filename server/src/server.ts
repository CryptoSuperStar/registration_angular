import express from 'express';
import cors from 'cors';
import registrationFieldsRouter from './routes/registrationFields';
import registerRouter from './routes/register';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/registration-fields', registrationFieldsRouter);
app.use('/api/register', registerRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
