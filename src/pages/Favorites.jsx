import { useSelector } from "react-redux";
import GameCard from "../components/GameCard";
import { Link } from "react-router-dom";

export default function Favorites() {
    const favorites = useSelector(state => state.games.favorites);

    return (
        <div className="flex flex-col font-sans text-white">
            <main className="grow container mx-auto px-4 py-12">
                <h1 className="text-4xl font-black mb-10 text-white border-l-4 border-[#00D400] pl-4 uppercase tracking-tighter">Mis Favoritos</h1>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {favorites.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-gray-900/30 rounded-3xl border border-dashed border-gray-800 shadow-2xl max-w-2xl mx-auto">
                        <div className="text-7xl mb-6">⭐</div>
                        <p className="text-2xl text-white font-black mb-2 uppercase tracking-tighter">Aún no tienes favoritos</p>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">¡Explora el catálogo de juegos y guarda tus aventuras favoritas aquí para tenerlas siempre a mano!</p>
                        <Link to="/" className="inline-block bg-[#00D400] hover:bg-white text-black px-10 py-4 rounded-2xl font-black transition-all shadow-[0_0_30px_rgba(0,212,0,0.3)] transform hover:scale-105 uppercase tracking-widest text-sm">
                            Explorar Juegos
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
