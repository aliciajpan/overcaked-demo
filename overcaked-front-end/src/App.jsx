import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import MenuPage from './pages/MenuPage/MenuPage';
import ScoreboardPage from './pages/ScoreboardPage/ScoreboardPage';
import TutorialPage from './pages/TutorialPage/TutorialPage';
import SoundControl from './components/SoundControl/SoundControl';
import logo from './assets/logos/logo.png';
import './App.scss';
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <BrowserRouter>
            <div className='app'>
                <div className='app__window'>
                    <Routes>
                        <Route path="/" element={<MenuPage />} />
                        <Route path="/play" element={<MainPage />} />
                        <Route path="/scoreboard" element={<ScoreboardPage />} />
                        <Route path="/howtoplay" element={<TutorialPage />} />
                    </Routes>
                </div>
                <SoundControl/>
            </div>

            <div className='redirect'>
                <img className='redirect__logo' src={logo} alt="Overcaked logo" />
                <p>Please play on a <strong>landscape orientation</strong> screen that is at least 1024px by 768px (or trying zooming out on the window)</p>
            </div>
        </BrowserRouter>
    )
}

export default App
