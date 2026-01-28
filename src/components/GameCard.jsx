import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function GameCard({ game }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(game.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault(); // Prevent navigating to game details
        toggleFavorite(game);
    };

    return (
        <div className="block group h-full relative">
            <Link to={`/game/${game.id}`} className="block h-full">
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-green-500/20 hover:border-[#00D400] h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                        {game.background_image ? (
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                                Sin Imagen
                            </div>
                        )}
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md text-[#00D400] font-bold text-sm border border-white/10">
                            ★ {game.rating}
                        </div>
                    </div>

                    <div className="p-4 flex-grow flex flex-col justify-between">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00D400] transition-colors">{game.name}</h3>
                    </div>
                </div>
            </Link>

            {/* Floating Favorite Button */}
            <button
                onClick={handleFavoriteClick}
                className={`absolute top-2 left-2 z-10 p-2 rounded-full shadow-lg transition-all duration-300 ${favorite ? 'bg-yellow-400 text-black' : 'bg-black/50 text-white hover:bg-black/70'}`}
                title={favorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={favorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            </button>
        </div>
    );
}
