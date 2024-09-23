import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from '../utils/json.js';

function postScore (req, res) {
    const {playerName, playerScore} = req.body;

    if (!playerName || !playerScore === null) {
        return res.status(400).json({
            message: "Name or score missing",
        });
    }

    try {
        const allScores = readFile('scores.json');

        const newScoreItem = {
            id: uuidv4(),
            name: playerName,
            score: playerScore,
            time: (new Date()).getTime()
        }

        allScores.push(newScoreItem);
        writeFile("scores.json", allScores);
        res.json(newScoreItem);
    } 
        
    catch (error) {
        res.status(500).json({
            message: "Unable to add score data",
            error:error.toString()
        });
    }
};

function getAllScores (_req, res) {
    try {
        const allScores = readFile('scores.json');
        res.json(allScores);
    } 
        
    catch (error) {
        res.status(500).json({
            message: "Unable to retrieve score data",
            error:error.toString()
        });
    }
};

export {postScore, getAllScores};