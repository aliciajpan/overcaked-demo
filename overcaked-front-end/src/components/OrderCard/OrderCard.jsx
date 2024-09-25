import { useEffect, useCallback } from "react";
import { useTimer } from "react-use-precision-timer";
import TimerBar from "../TimerBar/TimerBar";
import Cake from "../Cake/Cake";
import "./OrderCard.scss";

function OrderCard({num, icing, cakelayers, expireCake, isGameOver, tutorialModalOpen}) {
    const msPerLayer = 2000;
    const callback = useCallback(() => {
        expireCake(num); 
    }, [num, expireCake]);

    const timer = useTimer({ 
        delay: (cakelayers.length * msPerLayer),
        runOnce: true,
        fireOnStart: false,
        startImmediately: true,
        speedMultiplier: 1
    // }, () => expireCake(num));
    }, callback);

    useEffect(() => {
        if (isGameOver) {
            timer.stop();
        }

        else if (tutorialModalOpen) {
            timer.pause();
        }

        else {
            timer.resume();
        }
    }, [tutorialModalOpen, isGameOver, timer])

    return (
        <article className="ordercard">
            <p>Order &nbsp;{num} / 20</p>
            <Cake icing={icing} cakelayers={cakelayers} size="small-cake"/>
            <TimerBar time={cakelayers.length} isGameOver={isGameOver} tutorialModalOpen={tutorialModalOpen}/>
        </article>
    );
}

export default OrderCard;