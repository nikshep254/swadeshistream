import { useState } from 'react';
import { streams, categories } from './data/streams';
import Popup from './components/Popup';
import PlayerCard from './components/PlayerCard';
import Footer from './components/Footer';
import './index.css';

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

            {/* Dynamic Featured Hero (Shows first item of selected category) */}
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
