/**
 * CRMS Authentication Module (API Connected)
 * Department of Computer Science & Data Science
 * 
 * Handles user authentication via Backend API.
 */

const Auth = {

    // ========================
    // Session Management
    // ========================

    isLoggedIn() {
        const session = localStorage.getItem('crms_token'); // Using standard JWT token key
        if (!session) return false;

        // Optional: Check if token is expired (basic decoding)
        return true;
    },

    getCurrentUser() {
        const userStr = localStorage.getItem('crms_user');
        return userStr ? JSON.parse(userStr) : null;
    },

    getToken() {
        return localStorage.getItem('crms_token');
    },

    // ========================
    // Authentication
    // ========================

    /**
     * Authenticate user via API
     */
    async login(username, password, selectedRole) {
        if (!username || !password || !selectedRole) {
            return { success: false, error: 'All fields are required' };
        }

        try {
            console.log(`📡 Connecting to ${Config.getApiUrl('auth/login')}...`);

            const response = await fetch(Config.getApiUrl('auth/login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password, // Send plain text, backend handles hashing/compare
                    role: selectedRole
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Login Failed:', data);
                return { success: false, error: data.message || 'Login failed' };
            }

            // Success! Store session
            console.log('✅ Login Successful:', data);

            localStorage.setItem('crms_token', data.token);
            localStorage.setItem('crms_user', JSON.stringify(data.user));

            // Legacy support (some pages might look for 'crms_session')
            localStorage.setItem('crms_session', JSON.stringify({
                ...data.user,
                sessionId: data.token,
                loginTime: new Date().toISOString()
            }));

            return {
                success: true,
                user: data.user,
                requiresPasswordChange: false // Backend handles this logic usually, but default to false for now
            };

        } catch (error) {
            console.error('❌ Network Error:', error);
            return { success: false, error: 'Network Connection Error. Is Backend running?' };
        }
    },

    /**
     * Logout
     */
    logout(silent = false) {
        localStorage.removeItem('crms_token');
        localStorage.removeItem('crms_user');
        localStorage.removeItem('crms_session');

        if (!silent) {
            window.location.href = 'login.html';
        }
    },

    // ========================
    // Access Control
    // ========================

    requireAuth(allowedRoles) {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }

        const user = this.getCurrentUser();
        if (allowedRoles && !allowedRoles.includes(user.role)) {
            alert('Access denied.');
            window.location.href = 'login.html'; // Or dashboard
            return false;
        }

        return true;
    }
};

// ========================
// Initialize API connection check
// ========================
console.log('Auth Module Loaded - Connected to API:', Config.API_BASE_URL);
