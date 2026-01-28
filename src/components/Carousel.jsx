import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Carousel({ games }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance
    useEffect(() => {
        if (!games || games.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % games.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [games]);

    if (!games || games.length === 0) return null;

    const currentGame = games[currentIndex];

    return (
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl group">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
                style={{ backgroundImage: `url(${currentGame.background_image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 flex flex-col items-start">
                <span className="inline-block bg-[#00D400] text-black text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider box-shadow-glow">
                    Destacado
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg max-w-3xl leading-tight">
                    {currentGame.name}
                </h2>
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center text-yellow-400 font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-yellow-400/30">
                        <span>★ {currentGame.rating}</span>
                    </div>
                </div>

                <Link
                    to={`/game/${currentGame.id}`}
                    className="bg-[#00D400] text-black hover:bg-[#00FF00] px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(0,212,0,0.4)] active:scale-95 flex items-center gap-2 border border-transparent"
                >
                    Ver Detalles
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                {games.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
