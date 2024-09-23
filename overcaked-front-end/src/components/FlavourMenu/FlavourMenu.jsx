import Button from "../Button/Button";
import "./FlavourMenu.scss";

function FlavourMenu({setSelectedFlavour}) {

    return (
        <section className="flavourmenu">
            <Button onClick={() => {setSelectedFlavour("vanilla")}} text="vanilla" sizing="game--menu" color="cream"/>
            <Button onClick={() => {setSelectedFlavour("chocolate")}} text="chocolate" sizing="game--menu" color="brown"/>
            <Button onClick={() => {setSelectedFlavour("strawberry")}} text="strawberry" sizing="game--menu" color="pink"/>
        </section>
    );
}

export default FlavourMenu;