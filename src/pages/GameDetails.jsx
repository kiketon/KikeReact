import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameDetails, toggleFavorite } from "../redux/slices/gamesSlice";

export default function GameDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { details: game, loading, favorites } = useSelector(state => state.games);

    const isFavorite = game ? favorites.some(f => f.id === game.id) : false;

    useEffect(() => {
        if (id) {
            dispatch(getGameDetails(id));
        }
    }, [id, dispatch]);

    if (loading) {
        return (
            <div className="flex grow items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00D400]"></div>
            </div>
        );
    }

    if (!game) {
        return (
            <div className="flex grow flex-col items-center justify-center text-white py-20">
                <h2 className="text-3xl font-bold mb-4">Juego no encontrado</h2>
                <Link to="/" className="text-[#00D400] hover:text-green-400 hover:underline">Volver al Inicio</Link>
            </div>
        );
    }

    const description = game.description_raw || "No hay descripción disponible.";

    return (
        <div className="flex flex-col font-sans">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${game.background_image})` }}
                >
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 container mx-auto z-10">
                    <div className="flex justify-between items-end mb-4 gap-4">
                        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">{game.name}</h1>
                        <button
                            onClick={() => dispatch(toggleFavorite(game))}
                            className={`bg-black/60 backdrop-blur-md p-3 rounded-full border border-gray-700 hover:scale-110 transition-transform cursor-pointer ${isFavorite ? 'text-[#00D400]' : 'text-gray-400 hover:text-[#00D400]'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="bg-yellow-500 text-black font-bold px-4 py-1.5 rounded-xl text-lg shadow-lg shadow-yellow-500/20">
                            ★ {game.rating}
                        </div>
                        {game.genres?.map(g => (
                            <Link to={`/?genres=${g.slug}`} key={g.id} className="bg-[#00D400]/10 backdrop-blur-md text-[#00D400] border border-[#00D400]/20 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-[#00D400]/20 transition-all">
                                {g.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12 grow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-black text-white mb-6 border-l-4 border-[#00D400] pl-4 uppercase tracking-tighter">Sobre el juego</h2>
                            <p className="text-gray-400 leading-relaxed whitespace-pre-line text-lg font-light">
                                {description}
                            </p>
                        </section>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-8">
                        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-8">

                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#00D400] rounded-full"></span> Plataformas
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {game.platforms?.map(({ platform }) => (
                                        <span key={platform.id} className="bg-gray-800/50 text-gray-300 px-4 py-2 rounded-xl text-xs font-medium border border-gray-700">
                                            {platform.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Publishers
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {game.publishers?.map((pub) => (
                                        <Link to={`/publisher/${pub.id}`} key={pub.id} className="bg-blue-900/20 text-blue-400 px-4 py-2 rounded-xl text-xs font-bold border border-blue-900/30 hover:bg-blue-900/40 transition-all">
                                            {pub.name}
                                        </Link>
                                    ))}
                                    {!game.publishers?.length && <span className="text-gray-500 font-light italic">No especificado</span>}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {game.tags?.map((tag) => (
                                        <Link to={`/?tags=${tag.slug}`} key={tag.id} className="bg-purple-900/20 text-purple-400 px-4 py-2 rounded-xl text-xs font-bold border border-purple-900/30 hover:bg-purple-900/40 transition-all">
                                            {tag.name}
                                        </Link>
                                    ))}
                                    {!game.tags?.length && <span className="text-gray-500 font-light italic">No hay tags</span>}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
