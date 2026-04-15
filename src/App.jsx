import { useState } from 'react';
import Popup from './components/Popup';
import PlayerCard from './components/PlayerCard';
import Footer from './components/Footer';
import './index.css';

// --- DATA MOVED DIRECTLY INTO APP.JSX TO FIX VERCEL IMPORT ERROR ---
const categories = ['All', 'Racing / F1', 'Football Channels', 'Cricket Channels', 'Server Backups'];

const streams = [
    // RACING
    { id: 'f1-1', title: 'Sky Sports F1', url: 'https://dlstreams.top/stream/stream-60.php', category: 'Racing / F1' },
    
    // FOOTBALL
    { id: 'fb-1', title: 'Astro Football', url: 'https://cdnlivetv.tv/api/v1/channels/player/?name=Astro%20Football&code=us&user=cdnlivetv&plan=free', category: 'Football Channels' },
    { id: 'fb-2', title: 'Astro Premier League', url: 'https://cdnlivetv.tv/api/v1/channels/player/?name=Astro%20Premier%20League&code=us&user=cdnlivetv&plan=free', category: 'Football Channels' },
    { id: 'fb-3', title: 'Astro Premier League 2', url: 'https://cdnlivetv.tv/api/v1/channels/player/?name=Astro%20Premier%20League%202&code=us&user=cdnlivetv&plan=free', category: 'Football Channels' },
    { id: 'fb-4', title: 'Fox Sports', url: 'https://dlstreams.top/stream/stream-369.php', category: 'Football Channels' },

    // CRICKET 
    { id: 'cr-1', title: 'Sky Sports Cricket', url: 'https://dlstreams.top/stream/stream-65.php', category: 'Cricket Channels' },
    { id: 'cr-2', title: 'Star Sports 1', url: 'https://dlstreams.top/stream/stream-267.php', category: 'Cricket Channels' },
    { id: 'cr-3', title: 'Star Sports Stream 2', url: 'https://dlstreams.top/cast/stream-267.php', category: 'Cricket Channels' },
    { id: 'cr-4', title: 'Star Sports Stream 4', url: 'https://dlstreams.top/plus/stream-267.php', category: 'Cricket Channels' },
    { id: 'cr-5', title: 'Star Sports Stream 5', url: 'https://dlstreams.top/casting/stream-267.php', category: 'Cricket Channels' },
    { id: 'cr-6', title: 'Star Sports Stream 6', url: 'https://dlstreams.top/player/stream-267.php', category: 'Cricket Channels' },
    { id: 'cr-7', title: 'Star Sports Stream 7', url: 'https://dlstreams.top/stream/stream-268.php', category: 'Cricket Channels' },
    { id: 'cr-8', title: 'Star Sports Stream 8', url: 'https://dlstreams.top/cast/stream-268.php', category: 'Cricket Channels' },
    { id: 'cr-9', title: 'Willow Cricket', url: 'https://cdnlivetv.tv/api/v1/channels/player/?name=Willow%20Cricket&code=us&user=cdnlivetv&plan=free', category: 'Cricket Channels' },
    { id: 'cr-10', title: 'Willow Alt Stream', url: 'https://dlstreams.top/stream/stream-370.php', category: 'Cricket Channels' },
    { id: 'cr-11', title: 'Astro Cricket HD', url: 'https://cdnlivetv.tv/api/v1/channels/player/?name=Astro%20Cricket&code=us&user=cdnlivetv&plan=free', category: 'Cricket Channels' },
    { id: 'cr-12', title: 'Astro Cricket (Server 2)', url: 'https://livetv.moviebite.cc/channels/Astro%20Cricket', category: 'Cricket Channels' },

    // PREMIUM BACKUPS
    { id: 'pr-1', title: 'Nikshep Premium (SS Backup)', url: 'https://dlstreams.top/cast/stream-346.php', category: 'Server Backups' },
];
// ----------------------------------------------------------------------

export default function App() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [theaterStream, setTheaterStream] = useState(null);

    const filteredStreams = activeCategory === 'All' 
        ? streams 
        : streams.filter(s => s.category === activeCategory);

    return (
        <div className="app-container">
            <Popup />

            {/* Theater Mode Overlay */}
            {theaterStream && (
                <div className="theater-overlay" onClick={() => setTheaterStream(null)}>
                    <div className="theater-wrapper" onClick={e => e.stopPropagation()}>
                        <button className="close-theater" onClick={() => setTheaterStream(null)}>✖ Close</button>
                        <iframe src={theaterStream.url} allowFullScreen allow="autoplay;encrypted-media;"></iframe>
                    </div>
                </div>
            )}

            <header className="detached-header">
                <h1>Nikshep TV</h1>
            </header>

            {/* Dynamic Category Tabs */}
            <div className="tabs-container">
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Dynamic Featured Hero */}
            {filteredStreams.length > 0 && (
                <div className="featured-section">
                    <h2 className="section-heading">🔥 Featured Match</h2>
                    <PlayerCard stream={filteredStreams[0]} onTheaterMode={setTheaterStream} />
                </div>
            )}

            {/* Grid for the rest */}
            <h2 className="section-heading">📺 All Channels</h2>
            <div className="content-grid">
                {filteredStreams.slice(1).map(stream => (
                    <PlayerCard key={stream.id} stream={stream} onTheaterMode={setTheaterStream} />
                ))}
            </div>

            <Footer />
        </div>
    );
}
