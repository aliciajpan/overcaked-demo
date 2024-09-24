import { useState, useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import ScoreCard from '../../components/ScoreCard/ScoreCard';
import Footer from '../../components/Footer/Footer';
import homeIcon from '../../assets/icons/home.png';
import './ScoreboardPage.scss';

function ScoreboardPage() {
    const colors = ["scorecard--pink", "scorecard--brown", "scorecard--cream"];
    const [scoresArray, setScoresArray] = useState([]);
    const [searchParam, setSearchParam] = useSearchParams();
    const uploadedID = searchParam.get("id");

    async function fetchScores() {
        try {
            let placeholderScores = localStorage.getItem('placeholderScores');
            let existingScoreData = localStorage.getItem('scoreData');

            // if placeholderScores in localStorage but not scoreData, why does placeholder stuff not get duplicated when it gets to this loop?
            // because placeholder stuff has its own key and here, the updated span first thing is empty, read once from replaced placeholder and replace score data itself
            if (!placeholderScores || !existingScoreData) {
                const response = await fetch('/scores.json');
                placeholderScores = await response.json();
                localStorage.setItem('placeholderScores', JSON.stringify(placeholderScores))

                existingScoreData = localStorage.getItem('scoreData');
                console.log(existingScoreData);
                const existingScoreDataArray = existingScoreData ? JSON.parse(existingScoreData) : [];
                const updatedScoreData = [...existingScoreDataArray, ...placeholderScores];
                console.log(updatedScoreData);
                localStorage.setItem('scoreData', JSON.stringify(updatedScoreData));
            }

            existingScoreData = localStorage.getItem('scoreData');
            const allScoreData = existingScoreData ? JSON.parse(existingScoreData) : [];
            setScoresArray(allScoreData.sort((a,b) => b.score - a.score));
        }

        catch(error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchScores();
    }, []);

    if (scoresArray.length === 0) {
        return (
            <section className='scoreboard'>
                <div className='scoreboard__header'>
                    <NavLink className="scoreboard__icon-wrapper" to="/"><img className='scoreboard__icon' src={homeIcon}/></NavLink>
                    <h1>Scores</h1>
                </div>
                <br></br>
                <h3>No scores to display yet!</h3>
            </section>
        )
    }

    return (
        <>
            <section className='scoreboard'>
                <div className='scoreboard__header'>
                    <NavLink className="scoreboard__icon-wrapper" to="/">
                        <img className='scoreboard__icon' src={homeIcon} alt="home icon"/>
                    </NavLink>
                    <h1>Scores</h1>
                </div>

                {scoresArray.map((scoreObj, index) => {
                    return (<ScoreCard 
                        key={index} 
                        scoreObj={scoreObj} 
                        color={colors[(index) % colors.length]}
                        isNewest={scoreObj.id === uploadedID}
                    />)
                })}
            </section>
            <Footer/>
        </>
    )
}

export default ScoreboardPage;