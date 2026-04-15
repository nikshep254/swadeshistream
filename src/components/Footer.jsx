import { useState, useEffect } from 'react';

export default function Footer() {
    const [timeString, setTimeString] = useState('Loading IST Time...');

    useEffect(() => {
        const updateClock = () => {
            const options = { 
                timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', 
                hour12: true, weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
            };
            setTimeString(new Intl.DateTimeFormat('en-US', options).format(new Date()));
        };
        
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="global-footer">
            Current Local Time in India: <strong>{timeString} (IST)</strong>
        </div>
    );
}
