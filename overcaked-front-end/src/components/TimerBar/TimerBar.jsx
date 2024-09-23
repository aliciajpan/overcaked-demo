import "./TimerBar.scss";

function TimerBar({time, isGameOver, tutorialModalOpen}) {

    return (
        <div className="timerbar">
            <div className={`timerbar__remaining timerbar__remaining--${time} 
                ${(isGameOver || tutorialModalOpen) ? "pause-animation" : ""}`}>
            </div>
        </div>
    );
}

export default TimerBar;