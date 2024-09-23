import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cakesRouter from './routes/cakes.js';
import scoresRouter from './routes/scores.js';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/cakes', cakesRouter);
app.use('/scores', scoresRouter);

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});