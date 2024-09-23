import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import bkgdMusic from '../../assets/sounds/cutesybkgdmusic.mp3';
import soundON from '../../assets/icons/soundON.png';
import soundOFF from '../../assets/icons/soundOFF.png';
import "./SoundControl.scss";

function SoundControl() {
    const [playSound, setPlaySound] = useState(false);
    const [showInfo, setShowInfo] = useState(true);
    const playerRef = useRef(null);
    const pageUrl = useLocation().pathname;

    function toggleSound() {
        if (playSound === false) {
            setPlaySound(true);
        }

        else {
            setPlaySound(false);
        }
    }

    useEffect(() => {
        if (playSound) {
            playerRef.current.play();
            playerRef.current.volume=0.2;
            setShowInfo(false);
        }

        else {
            playerRef.current.pause();
        }
    }, [playSound])

    return (
        <>
            <article className="music">
                {(showInfo && pageUrl === "/") && 
                    <article className="music__info">
                        <div className="music__info--bubble"><p>try playing with sound</p></div>
                        <div className="music__info--tail"></div>
                    </article>
                }
                <img onClick={toggleSound} className="music__image" src={playSound ? soundON : soundOFF} alt="volume icon"/>
                <audio
                    src={bkgdMusic}
                    autoPlay={false}
                    loop={true}
                    ref={playerRef}
                />
            </article>
        </>
    );
}

export default SoundControl;