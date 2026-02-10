import { useCallback, useEffect } from 'react';

// Analytics event types for EAO Uganda
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, string>;
}

// EAO-specific event categories
export const ANALYTICS_CATEGORIES = {
  DONATION: 'donation',
  VOLUNTEER: 'volunteer',
  CONTACT: 'contact',
  NAVIGATION: 'navigation',
  ENGAGEMENT: 'engagement',
  FORM: 'form',
  ERROR: 'error',
  PERFORMANCE: 'performance',
} as const;

// EAO-specific event actions
export const ANALYTICS_ACTIONS = {
  // Donation events
  DONATION_STARTED: 'donation_started',
  DONATION_COMPLETED: 'donation_completed',
  DONATION_FAILED: 'donation_failed',
  AMOUNT_SELECTED: 'amount_selected',
  PAYMENT_METHOD_SELECTED: 'payment_method_selected',

  // Volunteer events
  VOLUNTEER_REGISTER: 'volunteer_register',
  VOLUNTEER_TAB_SWITCH: 'volunteer_tab_switch',
  EVENT_REGISTER: 'event_register',
  EVENT_VIEW: 'event_view',

  // Contact events
  CONTACT_SUBMIT: 'contact_submit',
  CONTACT_FORM_START: 'contact_form_start',

  // Navigation events
  PAGE_VIEW: 'page_view',
  NAVIGATION_CLICK: 'navigation_click',
  EXTERNAL_LINK_CLICK: 'external_link_click',

  // Engagement events
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  VIDEO_PLAY: 'video_play',
  DOWNLOAD_CLICK: 'download_click',

  // Form events
  FORM_START: 'form_start',
  FORM_FIELD_FOCUS: 'form_field_focus',
  FORM_VALIDATION_ERROR: 'form_validation_error',

  // Error events
  IMAGE_LOAD_ERROR: 'image_load_error',
  API_ERROR: 'api_error',
  JAVASCRIPT_ERROR: 'javascript_error',
} as const;

// Custom hook for Google Analytics 4
export const useAnalytics = () => {
  const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  const GA4_DEV_MEASUREMENT_ID = import.meta.env.VITE_GA4_DEV_MEASUREMENT_ID;
  const isDevelopment = import.meta.env.DEV;

  // Use development measurement ID if in development mode and available, otherwise use production ID
  const effectiveMeasurementId = isDevelopment ? (GA4_DEV_MEASUREMENT_ID || 'G-XXXXXXXXXX') : GA4_MEASUREMENT_ID;

  // Initialize GA4
  useEffect(() => {
    if (!effectiveMeasurementId) {
      console.log(
        '📊 Analytics: GA4 disabled (no measurement ID)'
      );
      return;
    }

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${effectiveMeasurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', effectiveMeasurementId, {
      debug_mode: isDevelopment,
      custom_map: {
        custom_parameter_1: 'donation_amount',
        custom_parameter_2: 'payment_method',
        custom_parameter_3: 'form_type',
        custom_parameter_4: 'error_type',
      },
    });

    console.log(`📊 Analytics: GA4 initialized (${isDevelopment ? 'development mode' : 'production mode'})`);
  }, [effectiveMeasurementId, isDevelopment]);

  // Track page views
  const trackPageView = useCallback(
    (path: string, title?: string) => {
      if (!effectiveMeasurementId) return;

      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_location: window.location.origin + path,
          page_title: title || document.title,
        });
      }
    },
    [effectiveMeasurementId]
  );

  // Track custom events
  const trackEvent = useCallback(
    (event: AnalyticsEvent) => {
      if (!effectiveMeasurementId) {
        console.log('📊 Analytics Event:', event);
        return;
      }

      if (window.gtag) {
        window.gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          custom_parameters: event.customParameters,
        });
      }
    },
    [effectiveMeasurementId]
  );

  // EAO-specific tracking functions
  const analytics = {
    // Donation tracking
    trackDonationStarted: useCallback(
      (amount?: string, paymentMethod?: string) => {
        trackEvent({
          action: ANALYTICS_ACTIONS.DONATION_STARTED,
          category: ANALYTICS_CATEGORIES.DONATION,
          label: `Amount: ${amount || 'Not specified'}`,
          customParameters: {
            donation_amount: amount || '',
            payment_method: paymentMethod || '',
          },
        });
      },
      [trackEvent]
    ),

    trackDonationCompleted: useCallback(
      (amount: string, paymentMethod: string) => {
        trackEvent({
          action: ANALYTICS_ACTIONS.DONATION_COMPLETED,
          category: ANALYTICS_CATEGORIES.DONATION,
          label: `UGX ${amount} via ${paymentMethod}`,
          value: parseInt(amount.replace(/[^0-9]/g, '')) || 0,
          customParameters: {
            donation_amount: amount,
            payment_method: paymentMethod,
          },
        });
      },
      [trackEvent]
    ),

    trackDonationFailed: useCallback(
      (error: string, amount?: string) => {
        trackEvent({
          action: ANALYTICS_ACTIONS.DONATION_FAILED,
          category: ANALYTICS_CATEGORIES.DONATION,
          label: `Error: ${error}`,
          customParameters: {
            error_type: error,
            donation_amount: amount || '',
          },
        });
      },
      [trackEvent]
    ),

    // Volunteer tracking
    trackVolunteerRegister: useCallback(
      (opportunityType: string) => {
        trackEvent({
          action: ANALYTICS_ACTIONS.VOLUNTEER_REGISTER,
          category: ANALYTICS_CATEGORIES.VOLUNTEER,
          label: opportunityType,
        });
      },
      [trackEvent]
    ),

    trackEventRegister: useCallback(
      (eventTitle: string, eventType: string) => {
        trackEvent({
          action: ANALYTICS_ACTIONS.EVENT_REGISTER,
          category: ANALYTICS_CATEGORIES.VOLUNTEER,
          label: `${eventTitle} - ${eventType}`,
        });
      },
      [trackEvent]
    ),

    // Contact tracking
    trackContactSubmit: useCallback(
      (subject: string) => {
        trackEvent({
          action: ANALYTICS_ACTIONS.CONTACT_SUBMIT,
          category: ANALYTICS_CATEGORIES.CONTACT,
          label: subject,
          customParameters: {
            form_type: 'contact',
          },
        });
      },
      [trackEvent]
    ),

    // Navigation tracking
    trackNavigationClick: useCallback(
      (destination: string, source: string) => {
        trackEvent({
          action: ANALYTICS_ACTIONS.NAVIGATION_CLICK,
          category: ANALYTICS_CATEGORIES.NAVIGATION,
          label: `${source} → ${destination}`,
        });
      },
      [trackEvent]
    ),

    trackExternalLinkClick: useCallback(
      (url: string, linkText: string) => {
        trackEvent({
          action: ANALYTICS_ACTIONS.EXTERNAL_LINK_CLICK,
          category: ANALYTICS_CATEGORIES.NAVIGATION,
          label: `${linkText}: ${url}`,
        });
      },
      [trackEvent]
    ),

    // Engagement tracking
    trackScrollDepth: useCallback(
      (depth: number) => {
        trackEvent({
          action: ANALYTICS_ACTIONS.SCROLL_DEPTH,
          category: ANALYTICS_CATEGORIES.ENGAGEMENT,
          label: `${depth}%`,
          value: depth,
        });
      },
      [trackEvent]
    ),

    trackDownloadClick: useCallback(
      (fileName: string, fileType: string) => {
        trackEvent({
          action: ANALYTICS_ACTIONS.DOWNLOAD_CLICK,
          category: ANALYTICS_CATEGORIES.ENGAGEMENT,
          label: `${fileType}: ${fileName}`,
        });
      },
      [trackEvent]
    ),

    // Error tracking
    trackImageError: useCallback(
      (imageSrc: string, alt: string) => {
        trackEvent({
          action: ANALYTICS_ACTIONS.IMAGE_LOAD_ERROR,
          category: ANALYTICS_CATEGORIES.ERROR,
          label: `${alt}: ${imageSrc}`,
          customParameters: {
            error_type: 'image_load_failure',
          },
        });
      },
      [trackEvent]
    ),

    trackFormError: useCallback(
      (formType: string, fieldName: string, error: string) => {
        trackEvent({
          action: ANALYTICS_ACTIONS.FORM_VALIDATION_ERROR,
          category: ANALYTICS_CATEGORIES.FORM,
          label: `${formType} - ${fieldName}: ${error}`,
          customParameters: {
            form_type: formType,
            error_type: 'validation',
          },
        });
      },
      [trackEvent]
    ),

    // Performance tracking
    trackPageLoadTime: useCallback(
      (loadTime: number) => {
        trackEvent({
          action: 'page_load_time',
          category: ANALYTICS_CATEGORIES.PERFORMANCE,
          label: `${loadTime}ms`,
          value: loadTime,
        });
      },
      [trackEvent]
    ),
  };

  return {
    trackPageView,
    trackEvent,
    analytics,
    isAnalyticsEnabled: !!effectiveMeasurementId,
  };
};

// Global gtag declaration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
