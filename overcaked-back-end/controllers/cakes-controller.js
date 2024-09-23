import { readFile, writeFile } from '../utils/json.js';
import flavours from '../data/flavours.js';
import generateNum from '../utils/rng.js';

function generateCakes (_req, res) {
    try {
        const cakes = [];

        for (let i=0; i<20; i++) {
            const generatedNum = generateNum(3);
            const cakeLayers = [];
            const icingFlavour = flavours[generateNum(3)-1];
            let pointsForSuccess = 0;

            for (let i=0; i<generatedNum; i++) {
                cakeLayers.push(flavours[generateNum(3)-1]);
            }

            for (let i=0; i<cakeLayers.length; i++) {
                if (cakeLayers[i] === "vanilla") {
                    pointsForSuccess += 100;
                }

                else {
                    pointsForSuccess += 150;
                }
            }

            if (icingFlavour !== "vanilla") {
                pointsForSuccess += 50;
            }

            cakes.push(
                {
                    id: i+1,
                    layerCount: generatedNum,
                    layers: cakeLayers,
                    icing: icingFlavour,
                    points: pointsForSuccess
                }
            )
        }

        writeFile("cakes.json", cakes);
        res.json(cakes);
    } 
        
    catch (error) {
        res.status(500).json({
            message: "Unable to retrieve cakes data",
            error: error.toString()
        });
    }
};

function compareCakes(submittedCake, truthCake) {
    if (submittedCake.icing === truthCake.icing 
        && submittedCake.cakeLayers.length === truthCake.layerCount) {
            for (let j=0; j<submittedCake.cakeLayers.length; j++) {
                if (submittedCake.cakeLayers[j] !== truthCake.layers[j]) {
                    return false;
                }
            }
        return true;
    }

    return false;
}

function submitCake (req, res) {
    try {
        const allCakes = readFile("cakes.json");

        for (let i=0; i<req.body.compareIds.length; i++) {
            if (compareCakes(req.body, allCakes[req.body.compareIds[i]-1])) {
                res.send(allCakes.find((cake) => cake.id === req.body.compareIds[i]));
                return;
            }
        }

        res.send(null);
    } 
        
    catch (error) {
        res.status(500).json({
            message: "Unable to submit cake",
            error:error.toString()
        });
    }
};

export {generateCakes, submitCake};