/**
 * Application Constants
 */

module.exports = {
    roles: {
        ADMIN: 'admin',
        HOD: 'hod',
        FACULTY: 'faculty',
        STUDENT: 'student',
        OPERATOR: 'operator'
    },
    security: {
        bcryptRounds: 10,
        jwtSecret: process.env.JWT_SECRET || 'dev_secret',
        jwtExpire: process.env.JWT_EXPIRE || '24h'
    },
    upload: {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'application/pdf']
    }
};
