import { useEffect, useRef } from "react";
import dynamicTimestamp from "../../utils/dynamic-timestamp";
import "./ScoreCard.scss";

function ScoreCard({scoreObj, color, isNewest}) {
    const newestScoreRef = useRef(null);

    useEffect(() => {
        if (isNewest) {
            newestScoreRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [isNewest])

    return (
        <article ref={newestScoreRef} className={`scorecard ${color} ${isNewest ? "highlight" : ""}`}>
            <div>{scoreObj.name}</div>
            <div>{scoreObj.score}</div>
            <div>{dynamicTimestamp(scoreObj.time)}</div>
        </article>
    );
}

export default ScoreCard;
