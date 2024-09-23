import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import OrderList from '../../components/OrderList/OrderList.jsx';
import Cake from '../../components/Cake/Cake';
import Button from '../../components/Button/Button.jsx';
import FlavourMenu from '../../components/FlavourMenu/FlavourMenu.jsx';
import TutorialModal from '../../components/TutorialModal/TutorialModal.jsx';
import GameEndModal from '../../components/GameEndModal/GameEndModal.jsx';
import submitIcon from '../../assets/icons/checkmark.png';
import trashIcon from '../../assets/icons/trash.png';
import folder from '../../assets/images/folder.png';
import './MainPage.scss';

function MainPage() {
    const [cakelayers, setCakelayers] = useState([]);
    const [icing, setIcing] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [cakeArray, setCakeArray] = useState([]);
    const [cakesToDisplay, setCakesToDisplay] = useState([1,2,3]);
    const [nextCakeToDisplay, setNextCakeToDisplay] = useState(4);
    const [score, setScore] = useState(0);
    const [missedCakesCount, setMissedCakesCount] = useState(0);
    const [newScoreID, setNewScoreID] = useState(null);

    const [shake, setShake] = useState(false);
    const [warnText, setWarnText] = useState(false);
    const [scoreText, setScoreText] = useState(false);

    const [isGameOver, setIsGameOver] = useState(false);
    const [tutorialModalOpen, setTutorialModalOpen] = useState(false);

    const cakesToDisplayRef = useRef(cakesToDisplay);
    const nextCakeToDisplayRef = useRef(nextCakeToDisplay);
    const missedCakesCountRef = useRef(missedCakesCount);
    const resolvedCakesCountRef = useRef(0);
    const isGameOverRef = useRef(isGameOver);

    const maxCakeCount = 20;
    const expiredCakeLimit = 10;

    async function fetchAllCakes() {
        try {
            const allCakes = await axios.post("http://localhost:8080/cakes");
            setCakeArray(allCakes.data);
        }

        catch(error) {
            console.error(error);
        }
    }

    useEffect (() => {
        fetchAllCakes();
    }, [])

    function addCakeLayer() {
        if (cakelayers.length < 3 && icing === "") {
            setCakelayers([...cakelayers, "vanilla"]);
            setSelectedItem(`layer${cakelayers.length+1}`);
        }

        else {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    }

    function addIcingLayer() {
        if (icing.length < 1 && cakelayers.length > 0) {
            setIcing("vanilla");
            setSelectedItem("icing");
        }

        else {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    }

    function setSelectedFlavour(flavour) {
        if (selectedItem === "icing") {
            setIcing(flavour);
        }

        else if (selectedItem === "layer1") {
            const tempCakeLayers = [...cakelayers];
            tempCakeLayers[0] = flavour;
            setCakelayers(tempCakeLayers);
        }

        else if (selectedItem === "layer2") {
            const tempCakeLayers = [...cakelayers];
            tempCakeLayers[1] = flavour;
            setCakelayers(tempCakeLayers);
        }

        else if (selectedItem === "layer3") {
            const tempCakeLayers = [...cakelayers];
            tempCakeLayers[2] = flavour;
            setCakelayers(tempCakeLayers);
        }

        else {
            console.log("nothing selected");
        }
    }

    async function submitCake() {
        try {
            const req = {
                compareIds: cakesToDisplay,
                cakeLayers: cakelayers,
                icing: icing
            }

            const matchedCake = await axios.post("http://localhost:8080/cakes/submit", req);
            if (matchedCake.data) {
                updateCakesToDisplay(matchedCake.data.id);
                setScoreText(true);
                setTimeout(() => setScoreText(false), 500);
                setScore(score + matchedCake.data.points);
                setCakelayers([]);
                setIcing("");
                setSelectedItem(null);
                resolvedCakesCountRef.current = resolvedCakesCountRef.current+1;
            }

            else {
                setShake(true);
                setTimeout(() => setShake(false), 500);
            }

            if (resolvedCakesCountRef.current >= maxCakeCount) {
                isGameOverRef.current = true;
                setIsGameOver(isGameOverRef.current);
            }
        }

        catch(error) {
            console.error(error);
        }
    }

    function updateCakesToDisplay(cakeToRemove) {
        const updatedCakesToDisplay = [...cakesToDisplayRef.current.filter((cakeId) => {return (cakeId !== cakeToRemove)})];
        updatedCakesToDisplay.push(nextCakeToDisplayRef.current);
        cakesToDisplayRef.current = updatedCakesToDisplay;
        nextCakeToDisplayRef.current = nextCakeToDisplayRef.current+1;
        setCakesToDisplay(updatedCakesToDisplay);
        setNextCakeToDisplay(nextCakeToDisplayRef.current);
    }

    function expireCake(expiredId) {
        if (!isGameOverRef.current) {
            updateCakesToDisplay(expiredId);
            setWarnText(true);
            setTimeout(() => setWarnText(false), 500);
            resolvedCakesCountRef.current = resolvedCakesCountRef.current+1;

            if (resolvedCakesCountRef.current >= maxCakeCount) {
                isGameOverRef.current = true;
                setIsGameOver(isGameOverRef.current);
            }

            missedCakesCountRef.current += 1;
            setMissedCakesCount(missedCakesCountRef.current);

            if (missedCakesCountRef.current >= expiredCakeLimit) {
                isGameOverRef.current = true;
                setIsGameOver(isGameOverRef.current);
            }
        }
    }

    function trashCake() {
        setCakelayers([]);
        setIcing("");
        setSelectedItem(null);
    }

    async function postScore() {
        try {
            const useThisName = localStorage.getItem("overcakedSavedName");
            const req = {
                playerName: useThisName || "Anonymous Chef",
                playerScore: score
            }
            const newPost = await axios.post("http://localhost:8080/scores", req);
            setNewScoreID(newPost.data.id);
        }

        catch(error) {
            console.error(error);
        }
    }

    useEffect (() => {
        if (isGameOver) {
            postScore();
        }
    }, [isGameOver])

    function openTutorial() {
        setTutorialModalOpen(true);
    }

    function closeModal() {
        setTutorialModalOpen(false);
    }

    return (
        <>
            <div className='main__wrapper'>
                <main className='main'>
                    <img onClick={openTutorial} className="main__image main__image--folder" src={folder} alt="folder"/>
                    <div className='main__orders'>
                        <OrderList 
                            filteredCakeArray={cakeArray.filter((cake) => cakesToDisplay.includes(cake.id))} 
                            expireCake={expireCake} 
                            isGameOver={isGameOver}
                            tutorialModalOpen={tutorialModalOpen}
                        />
                    </div>
        
                    <section className={`main__build ${shake ? 'shake-cake' : ''}`}>                
                        <Cake icing={icing} cakelayers={cakelayers} size="big-cake" setSelectedItem={setSelectedItem} selectedItem={selectedItem}/>
                    </section>
        
                    <section className='main__edit'>
                        <div className='main__info'>
                            <h2 className={`${scoreText ? 'score-text' : ''} main__score`}>score: {score}</h2>
                            <h3 className={`${warnText ? 'warn-text' : ''} main__hangry`}> hangry customers: {missedCakesCount}/10</h3>
                        </div>
                        
                        <Button onClick={addCakeLayer} text="+ Add cake layer" sizing="game" color="brown"/>
                        <Button onClick={addIcingLayer} text="+ Add icing layer" sizing="game" color="brown"/>
                        <FlavourMenu setSelectedFlavour={setSelectedFlavour}/>
                    </section> 

                    <div className='main__icon-wrapper--submit'>
                        <img className='main__icon' onClick={submitCake} src={submitIcon} alt="submit icon"/>
                    </div> 

                    <div className='main__icon-wrapper--trash'>
                            <img onClick={trashCake} className='main__icon' src={trashIcon} alt="trash icon"/>
                    </div>                
                </main>

                {isGameOver && (
                    <GameEndModal fail={missedCakesCountRef.current >= 10} newScoreID={newScoreID}/>
                )}

                {tutorialModalOpen && (
                    <TutorialModal closeModal={closeModal}/>
                )}
            </div>
        </>
    )
}

export default MainPage;