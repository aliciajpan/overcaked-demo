import { useEffect, useCallback } from "react";
import { useTimer } from "react-use-precision-timer";
import TimerBar from "../TimerBar/TimerBar";
import Cake from "../Cake/Cake";
import "./OrderCard.scss";

function OrderCard({num, icing, cakelayers, expireCake, isGameOver, tutorialModalOpen}) {
    const msPerLayer = 15000;
    const callback = useCallback(() => {
        console.log("in callback, before expireCake");
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

    console.log("timer.delay", timer.delay);
    console.log("timer remaining time", timer.getRemainingTime());

    useEffect(() => {
        if (isGameOver && timer.isStarted() && timer.isRunning()) {
            timer.stop();
        }

        else if (tutorialModalOpen && timer.isStarted() && timer.isRunning()) {
            timer.pause();
        }

        else if (timer.isStarted() && !timer.isRunning()) {
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