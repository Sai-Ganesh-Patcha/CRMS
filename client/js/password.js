// Password Change Functions for Student Dashboard

function openPasswordModal() {
    document.getElementById('passwordModal').classList.add('active');
    document.getElementById('oldPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('passwordStrength').textContent = '';
    document.getElementById('passwordStrength').className = 'password-strength';
}

function closePasswordModal() {
    document.getElementById('passwordModal').classList.remove('active');
}

function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];

    if (password.length >= 8) strength++;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(password)) strength++;
    else feedback.push('Lowercase letter');

    if (/[A-Z]/.test(password)) strength++;
    else feedback.push('Uppercase letter');

    if (/[0-9]/.test(password)) strength++;
    else feedback.push('Number');

    if (/[^A-Za-z0-9]/.test(password)) strength++;
    else feedback.push('Special character');

    const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthClass = ['very-weak', 'weak', 'fair', 'good', 'strong'];

    return {
        level: strength,
        text: strengthText[strength] || 'Very Weak',
        class: strengthClass[strength] || 'very-weak',
        feedback: feedback
    };
}

function updatePasswordStrength() {
    const password = document.getElementById('newPassword').value;
    const strengthIndicator = document.getElementById('passwordStrength');
    const strength = checkPasswordStrength(password);

    strengthIndicator.textContent = strength.text;
    strengthIndicator.className = 'password-strength ' + strength.class;
}

async function changePassword() {
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
        showToast('All fields are required', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showToast('New passwords do not match', 'error');
        return;
    }

    const strength = checkPasswordStrength(newPassword);
    if (strength.level < 3) {
        showToast('Password is too weak. Please choose a stronger password.', 'error');
        return;
    }

    try {
        // Here you would make an API call to change password
        // For now, simulate the API call
        showToast('Password changed successfully!', 'success');
        closePasswordModal();
    } catch (error) {
        showToast('Failed to change password. Please try again.', 'error');
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
