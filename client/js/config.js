/**
 * CRMS Configuration
 * Centralized configuration for API endpoints
 * ✅ Fullstack Mode (Single Origin)
 */

const Config = {
    // API is now RELATIVE because we are served by the same server!
    PRODUCTION_API_URL: '/api',

    // Development still uses localhost
    DEVELOPMENT_API_URL: 'https://crms-epsm.onrender.com',

    get IS_DEVELOPMENT() {
        return (
            window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1'
        );
    },

    get API_BASE_URL() {
        return this.IS_DEVELOPMENT
            ? this.DEVELOPMENT_API_URL
            : this.PRODUCTION_API_URL;
    },

    APP_NAME: 'College Result Management System',
    VERSION: '1.0.0',
    REQUEST_TIMEOUT: 30000,

    get DEBUG() {
        return this.IS_DEVELOPMENT;
    },

    log(...args) {
        if (this.DEBUG) console.log('[CRMS]', ...args);
    },

    error(...args) {
        console.error('[CRMS ERROR]', ...args);
    },

    getApiUrl(endpoint) {
        if (!endpoint) throw new Error('API endpoint is required');
        // Handle relative path accumulation carefully
        const base = this.API_BASE_URL.replace(/\/$/, ''); // remove trailing slash
        const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        return `${base}${path}`;
    },

    showConfig() {
        console.log('CRMS Config Loaded: Fullstack Mode');
    }
};

window.Config = Config;
Config.showConfig();
