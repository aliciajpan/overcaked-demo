import "./Button.scss";

function Button({text, sizing, color, onClick}) {

    return (
        <button className={`button button--${sizing} button--${color}`} onClick={onClick}>
            <div>{text}</div>
        </button>
    );
}

export default Button;