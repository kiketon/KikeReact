import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../redux/slices/eventsSlice';
import { toggleEventAttendance } from '../redux/slices/userSlice';

export default function Events() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(state => state.events);
    const { profile } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex grow items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00D400]"></div>
            </div>
        );
    }

    if (error) return <div className="text-center py-20 text-red-500 font-bold">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4 py-12 grow">
            <h1 className="text-5xl font-black mb-12 text-center bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent uppercase tracking-tighter italic">
                Próximos Eventos
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {items.map(event => {
                    const isAttending = profile.myEvents.includes(event.id);
                    return (
                        <div key={event.id} className="bg-gray-900/40 backdrop-blur-md rounded-3xl border border-gray-800 overflow-hidden hover:border-[#00D400]/40 transition-all group shadow-2xl">
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/20 to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-black/60 backdrop-blur-md text-[#00D400] text-xs font-black px-3 py-1 rounded-full border border-white/5 uppercase tracking-widest">
                                        {event.location}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <h2 className="text-2xl font-black mb-6 group-hover:text-[#00D400] transition-colors line-clamp-2 leading-tight tracking-tighter uppercase">{event.title}</h2>
                                <button
                                    onClick={() => dispatch(toggleEventAttendance(event.id))}
                                    className={`w-full py-4 rounded-2xl font-black transition-all transform active:scale-95 uppercase tracking-widest text-xs ${isAttending
                                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-750'
                                        : 'bg-[#00D400] text-black hover:bg-white hover:shadow-[0_0_30px_rgba(0,212,0,0.3)]'
                                        }`}
                                >
                                    {isAttending ? 'Asistiré ✅' : 'Apuntarse al evento'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
