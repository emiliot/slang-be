import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from './routes'

const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/spellings', routes.spellings)

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);