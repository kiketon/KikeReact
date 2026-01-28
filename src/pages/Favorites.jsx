import { useFavorites } from "../context/FavoritesContext";
import GameCard from "../components/GameCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Favorites() {
    const { favorites } = useFavorites();

    return (
        <div className="min-h-screen flex flex-col bg-transparent font-sans text-white">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-white border-l-4 border-[#00D400] pl-3">Mis Favoritos</h1>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favorites.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800 shadow-lg">
                        <div className="text-6xl mb-4">⭐</div>
                        <p className="text-2xl text-gray-400 font-bold">Aún no tienes favoritos</p>
                        <p className="text-gray-500 mt-2 mb-6">¡Explora juegos y guárdalos aquí!</p>
                        <Link to="/" className="bg-[#00D400] hover:bg-[#00FF00] text-black px-6 py-3 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(0,212,0,0.5)] transform hover:scale-105">
                            Explorar Juegos
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
