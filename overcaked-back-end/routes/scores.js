import express from 'express';
const scoresRouter = express.Router();
import { postScore, getAllScores } from '../controllers/scores-controller.js';

scoresRouter
    .route("/")
    .post(postScore)
    .get(getAllScores)

export default scoresRouter;