// Session Management Functions for Student Dashboard

// Mock data for active sessions (in real app, this would come from API)
const mockSessions = [
    {
        id: 'session_1',
        device: 'Chrome on Windows',
        location: 'Hyderabad, India',
        ip: '192.168.1.100',
        lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        current: true
    },
    {
        id: 'session_2',
        device: 'Mobile Safari on iPhone',
        location: 'Hyderabad, India',
        ip: '192.168.1.101',
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        current: false
    },
    {
        id: 'session_3',
        device: 'Firefox on Linux',
        location: 'Hyderabad, India',
        ip: '192.168.1.102',
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        current: false
    }
];

function openSessionModal() {
    document.getElementById('sessionModal').classList.add('active');
    loadActiveSessions();
}

function closeSessionModal() {
    document.getElementById('sessionModal').classList.remove('active');
}

function loadActiveSessions() {
    const container = document.getElementById('sessionsList');
    container.innerHTML = '';

    mockSessions.forEach(session => {
        const sessionDiv = document.createElement('div');
        sessionDiv.className = 'session-item';
        sessionDiv.innerHTML = `
            <div class="session-info">
                <div class="session-device">${session.device} ${session.current ? '<span class="badge badge-success">Current</span>' : ''}</div>
                <div class="session-details">
                    <span class="session-location">📍 ${session.location}</span>
                    <span class="session-ip">IP: ${session.ip}</span>
                    <span class="session-time">Last active: ${formatLastActive(session.lastActive)}</span>
                </div>
            </div>
            ${!session.current ? `<button class="btn btn-sm btn-danger" onclick="terminateSession('${session.id}')">Terminate</button>` : ''}
        `;
        container.appendChild(sessionDiv);
    });
}

function formatLastActive(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
}

function terminateSession(sessionId) {
    if (confirm('Are you sure you want to terminate this session?')) {
        // In real app, make API call to terminate session
        showToast('Session terminated successfully', 'success');
        loadActiveSessions();
    }
}

function logoutAllDevices() {
    if (confirm('Are you sure you want to logout from all devices? You will need to login again on all devices.')) {
        // In real app, make API call to logout all sessions
        showToast('Logged out from all devices successfully', 'success');
        // Redirect to login page after a delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
}

// Toast notification function (if not already defined)
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</div>
        <div class="toast-content">
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 4000);
}
