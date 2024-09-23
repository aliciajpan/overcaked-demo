import { NavLink } from 'react-router-dom';
import Button from '../../components/Button/Button';
import NameForm from '../../components/NameForm/NameForm';
import logo from '../../assets/logos/logo.png';
import whisk from '../../assets/images/whisk.png';
import folder from '../../assets/images/folder.png';
import Footer from '../../components/Footer/Footer';
import './MenuPage.scss';

function MenuPage() {   
    return (
        <div className='menu__wrapper'>
            <section className='menu'>
                <NavLink to="/howtoplay"><img className="menu__image menu__image--folder" src={folder}/></NavLink>
                <img className='menu__logo' src={logo} alt="Overcaked logo" />
                <NameForm />
                <NavLink to="/scoreboard"><Button text="scoreboard" sizing="small" color="brown brown--scoreboardBtn"/></NavLink>
                <img className="menu__image menu__image--whisk" src={whisk} alt="whisk"/>
                <Footer/>
            </section>
        </div>
    )
}

export default MenuPage;