import "./IcingLayer.scss";

function IcingLayer({flavour, height, isSelected, onClick}) {
    return (
        <div onClick={onClick} className={`icinglayer icinglayer--${height} icinglayer--${flavour}`}>
            <div className={`icing ${isSelected ? `selected-icing` : ""}`}></div>
            <div className={`drip drip1 ${isSelected ? `drip--selected` : ""}`}></div>
            <div className={`drip drip2 ${isSelected ? `drip--selected` : ""}`}></div>
            <div className={`drip drip3 ${isSelected ? `drip--selected` : ""}`}></div>
        </div>
    );
}

export default IcingLayer;