import "./CakeLayer.scss";

function CakeLayer({layer, flavour, isSelected, onClick}) {
    return (
        <>
            <div className={`layer layer-${layer} ${flavour + (isSelected ? '--selected' : "")}`}></div>
            <div className={`layer layer-${layer} ${isSelected ? `selected--inset` : ""}`}></div>
            <div onClick={onClick} className={`layer layer-${layer}--hitbox layer--hitbox ${isSelected ? `selected` : ""}`}>
            </div>
        </>
    );
}

export default CakeLayer;