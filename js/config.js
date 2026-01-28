/**
 * CRMS Configuration
 * Centralized configuration for API endpoints
 * ✅ Production-safe
 * ✅ Deterministic
 * ✅ Error-free
 */

const Config = {
    // API Base URL Configuration
    // PRODUCTION: Update this after deploying backend to Render
    PRODUCTION_API_URL: 'https://crms-2.onrender.com/api',  // ← UPDATE THIS with your actual backend URL

    // Development API URL
    DEVELOPMENT_API_URL: 'http://localhost:5000/api',

    /* ======================================================
       ENVIRONMENT DETECTION
    ====================================================== */

    /**
     * Detect if running locally
     * Only localhost is treated as development
     */
    get IS_DEVELOPMENT() {
        return (
            window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1'
        );
    },

    /**
     * Final API base URL
     * NO ambiguity, NO guessing
     */
    get API_BASE_URL() {
        return this.IS_DEVELOPMENT
            ? this.DEVELOPMENT_API_URL
            : this.PRODUCTION_API_URL;
    },

    /* ======================================================
       APP METADATA
    ====================================================== */

    APP_NAME: 'College Result Management System',
    VERSION: '1.0.0',

    /* ======================================================
       REQUEST SETTINGS
    ====================================================== */

    REQUEST_TIMEOUT: 30000,

    /* ======================================================
       DEBUGGING
    ====================================================== */

    /**
     * Debug logs ONLY in development
     */
    get DEBUG() {
        return this.IS_DEVELOPMENT;
    },

    log(...args) {
        if (this.DEBUG) {
            console.log('[CRMS]', ...args);
        }
    },

    error(...args) {
        console.error('[CRMS ERROR]', ...args);
    },

    /* ======================================================
       HELPERS
    ====================================================== */

    /**
     * Build full API URL safely
     */
    getApiUrl(endpoint) {
        if (!endpoint) {
            throw new Error('API endpoint is required');
        }
        const cleanEndpoint = endpoint.startsWith('/')
            ? endpoint
            : `/${endpoint}`;
        return `${this.API_BASE_URL}${cleanEndpoint}`;
    },

    /**
     * Print active configuration
     */
    showConfig() {
        console.log(`
╔═══════════════════════════════════════════════════════╗
║  CRMS Configuration                                  ║
╠═══════════════════════════════════════════════════════╣
║  App Name    : ${this.APP_NAME.padEnd(35)} ║
║  Version     : ${this.VERSION.padEnd(35)} ║
║  Environment : ${(this.IS_DEVELOPMENT ? 'Development' : 'Production').padEnd(35)} ║
║  API URL     : ${this.API_BASE_URL.padEnd(35)} ║
║  Debug Mode  : ${(this.DEBUG ? 'ON' : 'OFF').padEnd(35)} ║
╚═══════════════════════════════════════════════════════╝
        `);
    }
};

/* ======================================================
   GLOBAL EXPORT
====================================================== */

window.Config = Config;

/* ======================================================
   INITIAL LOG
====================================================== */

Config.log('Config loaded', {
    apiUrl: Config.API_BASE_URL,
    env: Config.IS_DEVELOPMENT ? 'dev' : 'prod',
    hostname: window.location.hostname
});

Config.showConfig();
