import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function UserEvents() {
    const { items: allEvents } = useSelector(state => state.events);
    const { profile } = useSelector(state => state.user);

    const myEvents = allEvents.filter(event => profile.myEvents.includes(event.id));

    return (
        <div className="container mx-auto p-4 py-12 grow">
            <h1 className="text-5xl font-black mb-12 text-center bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent uppercase tracking-tighter italic">
                Mis Eventos Guardados
            </h1>

            {myEvents.length === 0 ? (
                <div className="text-center py-24 bg-gray-900/30 rounded-3xl border border-dashed border-gray-800 max-w-2xl mx-auto shadow-2xl">
                    <span className="text-7xl block mb-6 opacity-30">📅</span>
                    <p className="text-gray-400 text-xl mb-10 font-black uppercase tracking-widest">No tienes eventos programados</p>
                    <Link to="/events" className="inline-block bg-[#00D400] text-black px-10 py-4 rounded-2xl font-black hover:bg-white hover:shadow-[0_0_30px_rgba(0,212,0,0.3)] transition-all transform hover:scale-105 uppercase tracking-widest text-xs">
                        Explorar Eventos
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {myEvents.map(event => (
                        <div key={event.id} className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-3xl overflow-hidden flex flex-col sm:flex-row group hover:border-[#00D400]/40 transition-all shadow-2xl">
                            <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-8 grow flex flex-col justify-center">
                                <span className="text-[#00D400] text-[10px] font-black tracking-[0.2em] uppercase mb-2 block opacity-70">
                                    {event.location}
                                </span>
                                <h3 className="text-2xl font-black text-white group-hover:text-[#00D400] transition-colors leading-tight tracking-tighter uppercase mb-6">{event.title}</h3>
                                <div className="flex justify-between items-center">
                                    <Link to="/events" className="text-gray-500 hover:text-white text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2">
                                        Detalles <span className="text-[#00D400]">→</span>
                                    </Link>
                                    <span className="bg-[#00D400]/10 text-[#00D400] text-[10px] font-black px-3 py-1 rounded-full border border-[#00D400]/20 uppercase">Asistiré</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
