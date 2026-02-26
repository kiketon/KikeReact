import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPublisherDetails, getGames } from "../redux/slices/gamesSlice";
import GameCard from "../components/GameCard";

export default function PublisherDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { publisherDetails: publisher, items: games, loading } = useSelector(state => state.games);

    useEffect(() => {
        if (id) {
            dispatch(getPublisherDetails(id));
            dispatch(getGames({ publishers: id, page: 1 }));
        }
    }, [id, dispatch]);

    if (loading) {
        return (
            <div className="flex grow items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00D400]"></div>
            </div>
        );
    }

    if (!publisher) {
        return (
            <div className="flex grow flex-col items-center justify-center text-white py-20">
                <h2 className="text-3xl font-bold mb-4">Publisher no encontrado</h2>
                <Link to="/publishers" className="text-[#00D400] hover:text-green-400 hover:underline">Volver a los Publishers</Link>
            </div>
        );
    }

    const description = publisher.description ? publisher.description.replace(/<[^>]+>/g, '') : "No hay descripción disponible para este publisher.";

    return (
        <div className="flex flex-col font-sans">
            {/* Hero Section */}
            <div className="relative h-[40vh] w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${publisher.image_background})` }}
                >
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/60 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 container mx-auto z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl uppercase tracking-tighter shadow-black/50">{publisher.name}</h1>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12 grow space-y-16">
                <section className="bg-gray-900/50 backdrop-blur-sm p-10 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D400]/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-[#00D400]/10 transition-all duration-700"></div>
                    <h2 className="text-3xl font-black text-white mb-6 border-l-4 border-[#00D400] pl-4 uppercase tracking-tighter">Acerca del Publisher</h2>
                    <p className="text-gray-400 leading-relaxed text-lg font-light">
                        {description}
                    </p>
                    <div className="mt-8 flex gap-4">
                        <span className="text-[#00D400] font-black bg-black/40 px-6 py-2 rounded-xl border border-white/5 text-xs uppercase tracking-widest shadow-xl">Total Juegos: {publisher.games_count}</span>
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-sm font-bold text-white border-l-4 border-[#00D400] pl-4 uppercase tracking-widest">
                            Juegos de {publisher.name}
                        </h2>
                        <Link to={`/?publishers=${id}`} className="text-gray-400 hover:text-[#00D400] transition-colors font-bold text-sm underline decoration-[#00D400]/30 underline-offset-8">
                            Ver todos los juegos
                        </Link>
                    </div>

                    {games.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {games.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-gray-900/30 rounded-3xl border border-dashed border-gray-800">
                            <p className="text-4xl mb-4 opacity-30">🎮</p>
                            <p className="text-xl text-gray-400 font-bold uppercase tracking-widest">No hay juegos disponibles.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
