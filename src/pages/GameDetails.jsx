import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGameDetails } from "../services/rawg";
import { useFavorites } from "../context/FavoritesContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function GameDetails() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetchGameDetails(id).then(data => {
                setGame(data);
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

    if (!game) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Juego no encontrado</h2>
                    <Link to="/" className="text-[#00D400] hover:text-green-400 hover:underline">Volver al Inicio</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const description = game.description_raw || "No hay descripción disponible.";
    const favorite = isFavorite(game.id);

    return (
        <div className="min-h-screen bg-transparent text-white flex flex-col font-sans">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${game.background_image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-950/40 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 container mx-auto z-10">
                    <div className="flex justify-between items-end mb-4">
                        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">{game.name}</h1>
                        <button
                            onClick={() => toggleFavorite(game)}
                            className={`bg-black/60 backdrop-blur-md p-3 rounded-full border border-gray-700 hover:scale-110 transition-transform ${favorite ? 'text-[#00D400]' : 'text-gray-400 hover:text-[#00D400]'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill={favorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="bg-yellow-500/90 text-black font-bold px-3 py-1 rounded-md text-lg">
                            ★ {game.rating}
                        </div>
                        {game.genres?.map(g => (
                            <span key={g.name} className="bg-[#00D400]/20 backdrop-blur text-[#00D400] border border-[#00D400]/30 px-3 py-1 rounded-full text-sm font-semibold">
                                {g.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-[#00D400] pl-3">Sobre el juego</h2>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                                {description}
                            </p>
                        </section>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-8">
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Plataformas</h3>
                            <div className="flex flex-wrap gap-2">
                                {game.platforms?.map(({ platform }) => (
                                    <span key={platform.name} className="bg-gray-900 text-gray-300 px-3 py-1.5 rounded-lg text-sm border border-gray-600">
                                        {platform.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
