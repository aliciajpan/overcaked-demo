const sec = 1000;
const min = sec*60;
const hour = min*60;
const day = hour*24;
const week = day*7;
const month = day*30;
const year = day*365;

function dynamicTimestamp (timestamp) {
    const now = Date.now();
    const elapsed = now - timestamp;

    let num;
    let unit;

    if (elapsed >= year) {
        unit = `year`;
        num = Math.floor(elapsed/year);
    }

    else if (elapsed >= month) {
        unit = `month`;
        num = Math.floor(elapsed/month);
    }

    else if (elapsed >= week) {
        unit = `week`;
        num = Math.floor(elapsed/week);
    }

    else if (elapsed >= day) {
        unit = `day`;
        num = Math.floor(elapsed/day);
    }

    else if (elapsed >= hour) {
        unit = `hour`;
        num = Math.floor(elapsed/hour);
    }

    else if (elapsed >= min) {
        unit = `min`;
        num = Math.floor(elapsed/min);
    }

    else if (elapsed >= sec) {
        unit = `sec`;
        num = Math.floor(elapsed/sec);
    }

    else {
        return `Just now`;
    }

    return `${num} ${unit}${num !== 1 ? "s" : ""} ago`;
}

export default dynamicTimestamp;