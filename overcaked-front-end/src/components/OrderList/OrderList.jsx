import OrderCard from "../OrderCard/OrderCard.jsx";
import "./OrderList.scss";

function OrderList({filteredCakeArray, expireCake, isGameOver, tutorialModalOpen}) {
    return (
        <section className="orderlist">
            {filteredCakeArray.map((cake) => {
                return (
                    <OrderCard 
                        key={cake.id} 
                        num={cake.id} 
                        icing={cake.icing} 
                        cakelayers={cake.layers} 
                        expireCake={expireCake} 
                        isGameOver={isGameOver}
                        tutorialModalOpen={tutorialModalOpen}
                    />
                )
            })}
        </section>
    );
}

export default OrderList;