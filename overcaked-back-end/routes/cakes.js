import express from 'express';
const cakesRouter = express.Router();
import { generateCakes, submitCake } from '../controllers/cakes-controller.js';

cakesRouter
    .route("/")
    .post(generateCakes)

cakesRouter
    .route("/submit")
    .post(submitCake)

export default cakesRouter;