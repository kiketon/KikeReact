import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPublisherDetails, fetchGames } from "../services/rawg";
import GameCard from "../components/GameCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PublisherDetails() {
    const { id } = useParams();
    const [publisher, setPublisher] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true);
            Promise.all([
                fetchPublisherDetails(id),
                fetchGames({ publishers: id, page: 1 }) // Fetch first page of games
            ]).then(([pubData, gamesData]) => {
                setPublisher(pubData);
                setGames(gamesData.results || []);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-transparent flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00D400]"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!publisher) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Publisher no encontrado</h2>
                    <Link to="/publishers" className="text-[#00D400] hover:text-green-400 hover:underline">Volver a los Publishers</Link>
                </div>
                <Footer />
            </div>
        );
    }

    // Strip HTML tags if description comes with them from RAWG
    const description = publisher.description ? publisher.description.replace(/<[^>]+>/g, '') : "No hay descripción disponible para este publisher.";

    return (
        <div className="min-h-screen bg-transparent text-white flex flex-col font-sans">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[40vh] w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${publisher.image_background})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-950/60 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 container mx-auto z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">{publisher.name}</h1>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8 flex-grow space-y-12">
                <section className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                    <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-[#00D400] pl-3">Acerca del Publisher</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        {description}
                    </p>
                    <div className="mt-4 flex gap-4">
                        <span className="text-gray-400 font-semibold bg-gray-900 px-3 py-1 rounded-md">Total Juegos: {publisher.games_count}</span>
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white border-l-4 border-[#00D400] pl-3">
                            Juegos de {publisher.name}
                        </h2>
                        {/* We could link to full game list filtered by publisher */}
                        <Link to={`/?publishers=${id}`} className="text-[#00D400] hover:text-green-400 hover:underline">Ver todos los juegos</Link>
                    </div>

                    {games.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {games.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
                            <p className="text-2xl text-gray-400">No hay juegos disponibles para este publisher.</p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
