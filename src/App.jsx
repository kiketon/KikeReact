import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import Favorites from './pages/Favorites';
import PublisherList from './pages/PublisherList';
import PublisherDetails from './pages/PublisherDetails';
import Events from './pages/Events';
import UserEvents from './pages/UserEvents';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-[#00D400] selection:text-black flex flex-col">
            <Header />
            <main className="grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/game/:id" element={<GameDetails />} />
                    <Route path="/publishers" element={<PublisherList />} />
                    <Route path="/publisher/:id" element={<PublisherDetails />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/my-events" element={<UserEvents />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
