import CakeLayer from "../CakeLayer/CakeLayer";
import IcingLayer from "../IcingLayer/IcingLayer";
import "./Cake.scss";

function Cake({icing, cakelayers, size, selectedItem, setSelectedItem}) {
    return (
        <article className={`cake cake--${size}`}>
            <div className="plate"></div>
            {cakelayers.map((layer, index) => {
                return (
                    <CakeLayer 
                        key={index}
                        onClick={() => {setSelectedItem(`layer${index+1}`)}} 
                        isSelected={selectedItem===`layer${index+1}`} 
                        layer={`${index+1}`} 
                        flavour={layer}
                    />
                )
            })}
            <IcingLayer 
                onClick={() => {setSelectedItem("icing")}} 
                isSelected={selectedItem==="icing"} 
                flavour={icing} 
                height={cakelayers.length}
            />
        </article>
    );
}

export default Cake;