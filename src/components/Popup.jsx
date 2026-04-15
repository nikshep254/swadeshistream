import { useState, useEffect } from 'react';

export default function Popup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show popup slightly after load for a smoother feel
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="bento-popup">
                <h2>🦁 Heads Up!</h2>
                <p>These streams are pulled from third-party servers and contain <span>intrusive pop-up ads</span>.</p>
                <p>For the best, uninterrupted viewing experience, we highly recommend using the <strong>Brave Browser</strong> to block them automatically.</p>
                <button className="bento-btn" onClick={() => setIsVisible(false)}>
                    I Understand, Let's Watch
                </button>
            </div>
        </div>
    );
}
