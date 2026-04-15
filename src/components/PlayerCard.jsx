export default function PlayerCard({ stream, onTheaterMode }) {
    return (
        <div className="player-block">
            <div className="player-header">
                <div className="header-title-wrapper">
                    <div className="live-pulse"></div>
                    <h3>{stream.title}</h3>
                </div>
                <button className="theater-btn" onClick={() => onTheaterMode(stream)}>
                    📺 Theater Mode
                </button>
            </div>
            <div className="video-container">
                <div className="video-overlay overlay-left">Nikshep TV</div>
                <div className="video-overlay overlay-right">Nikshep TV</div>
                <iframe src={stream.url} allowFullScreen allow="autoplay;encrypted-media;"></iframe>
            </div>
            <div className="player-footer">
                <span>Powered by Nikshep Tv</span>
            </div>
        </div>
    );
}
