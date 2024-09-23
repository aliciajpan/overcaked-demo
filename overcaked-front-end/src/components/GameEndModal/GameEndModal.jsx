import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import happychef from "../../assets/images/happychef.png";
import sadchef from "../../assets/images/sadchef.png";
import "./GameEndModal.scss";

function GameEndModal({fail, newScoreID}) {
    const message = (fail ? "Too many customers were left waiting :(" : "You got through a day at the bakery!");

    return (
        <div className="modal__wrapper">
            <article className="modal">
                <h2>{fail ? "GAME OVER" : "GREAT WORK!"}</h2>
                <p>{message}</p>
                <img className="modal__image" src={fail ? sadchef : happychef} alt="cartoon chef"/>
                {newScoreID ? 
                    <NavLink to={`/scoreboard?id=${newScoreID}`}>
                        <Button text="See scores" sizing="small" color="brown"/>
                    </NavLink>
                    : <p>Uploading your score...</p>
                }                
            </article>
        </div>
        
    );
}

export default GameEndModal;