import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import Favorites from './pages/Favorites';
import PublisherList from './pages/PublisherList';
import PublisherDetails from './pages/PublisherDetails';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/publishers" element={<PublisherList />} />
            <Route path="/publisher/:id" element={<PublisherDetails />} />
        </Routes>
    );
}

export default App;
