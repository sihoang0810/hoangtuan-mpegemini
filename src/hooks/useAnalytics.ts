/**
 * Hook to handle Google Analytics (gtag) event tracking.
 * Provides a safe and robust interface for client-side event tracking.
 */
export function useAnalytics() {
  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    // Safely check if window and window.gtag are available (GA4 initialization)
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      try {
        (window as any).gtag('event', eventName, params);
      } catch (err) {
        console.error('[Analytics Error] Failed to track event:', eventName, err);
      }
    } else {
      // Graceful local debug logging if Google Analytics is not loaded or in development
      console.log('[Analytics Dry Run] Name:', eventName, 'Data:', params);
    }
  };

  return { trackEvent };
}
