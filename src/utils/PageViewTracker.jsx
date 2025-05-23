// PageViewTracker.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { urlPageViews } from '../endpoints';

const PageViewTracker = () => {
    const location = useLocation();

    const getOrCreateVisitorId = () => {
        const cookieName = 'visitor_id';
        let id = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${cookieName}=`))
            ?.split('=')[1];

        if (!id) {
            id = crypto.randomUUID(); // Can use uuid if needed for older browser support
            document.cookie = `${cookieName}=${id}; path=/; max-age=31536000`; // 1 year
        }

        return id;
    };

    useEffect(() => {
        const logPageView = async () => {

            const visitorId = getOrCreateVisitorId();

            const payload = {
                page: location.pathname,
                query: location.search,
                hash: location.hash,
                timestamp: new Date().toISOString(),
                referrer: document.referrer || null,
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
                screen: `${window.screen.width}x${window.screen.height}`,
                // You can add UTM tracking here too:
                utmSource: new URLSearchParams(location.search).get('utm_source'),
                utmMedium: new URLSearchParams(location.search).get('utm_medium'),
                utmCampaign: new URLSearchParams(location.search).get('utm_campaign'),
                visitorId: visitorId
            };
            try {
                await fetch(urlPageViews, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } catch (error) {
                console.error('Failed to log page view:', error);
            }
        };

        logPageView();
    }, [location]);

    return null; // this component doesn't render anything
};

export default PageViewTracker;
