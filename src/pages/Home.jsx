import { useEffect, useState } from "react";
import { fetchGames, fetchTrendingGames } from "../services/rawg";
import GameCard from "../components/GameCard";
import Carousel from "../components/Carousel";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
    const [games, setGames] = useState([]);
    const [trendingGames, setTrendingGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            Promise.all([
                fetchTrendingGames(),
                fetchGames()
            ]).then(([trending, initialGames]) => {
                setTrendingGames(trending);
                setGames(initialGames);
                setLoading(false);
            });
        };
        loadInitialData();
    }, []);

    const handleSearch = async (query) => {
        setLoading(true);
        fetchGames(query).then(results => {
            setGames(results);
            setLoading(false);
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-transparent font-sans text-white">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Carousel Section */}
                {trendingGames.length > 0 && <Carousel games={trendingGames} />}

                {/* Search Section */}
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-white">Encuentra tu próxima aventura</h2>
                    <SearchBar onSearch={handleSearch} />
                </div>

                {/* Results Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white border-l-4 border-[#00D400] pl-3">
                            {loading ? "Buscando..." : "Juegos"}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-64 bg-gray-800 rounded-xl"></div>
                            ))}
                        </div>
                    ) : games.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {games.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
                            <p className="text-2xl text-gray-400">No se encontraron juegos.</p>
                            <p className="text-gray-500 mt-2">¡Intenta buscar otra cosa!</p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
