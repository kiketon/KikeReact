import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import Favorites from './pages/Favorites';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
    );
}

export default App;
