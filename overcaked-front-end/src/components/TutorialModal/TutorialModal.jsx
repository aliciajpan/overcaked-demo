import Button from "../Button/Button";
import folder from '../../assets/images/tutorialGIF.gif';
import "./TutorialModal.scss";

function TutorialModal({closeModal}) {
    function closeTutModal() {
        closeModal();
    }

    return (
        <div className="tutmodal__wrapper">
            <article className="tutmodal">
                <img className="tutmodal__image" src={folder} alt="game instructions"/>
                <Button onClick={closeTutModal} text="Close" sizing="game" color="brown"/>
            </article>
        </div>
        
    );
}

export default TutorialModal;