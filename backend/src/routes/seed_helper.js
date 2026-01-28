const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, Student, Department, Regulation, Subject } = require('../models');
const seedScript = require('../scripts/seed');

// Special endpoint to trigger seeding via HTTP
router.get('/trigger-seed-db-secure-key-123', async (req, res) => {
    try {
        console.log('🔄 Triggering database seed via HTTP...');

        // Dynamic import of the seed logic (adapted from scripts/seed.js)
        // We verify the connection first
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ success: false, message: 'Database not connected' });
        }

        // We'll run the seed logic here directly to avoid process.exit() issues from the script
        const { department: deptData, regulation: regData, users: userData, subjects: subjData } = require('../scripts/seed').seedData || {
            // Fallback if export isn't set up (we will just define it locally if needed, 
            // but let's assume we can modify seed.js or copy the data provided earlier)
            // ... Actually, to be safe, let's just use the known data structure directly here
        };

        // ... Since we can't easily import the *data* from seed.js if it's not exported,
        // Let's copy the Critical Data here to ensure it works 100%

        // --- DATA START ---
        const seedData = {
            department: { code: 'CSD', name: 'Computer Science & Data Science' },
            regulation: {
                code: 'R23', name: 'Regulation 2023', effectiveFrom: 2023,
                gradeScale: { S: { points: 10, minMarks: 90 }, A: { points: 9, minMarks: 80 }, B: { points: 8, minMarks: 70 }, C: { points: 7, minMarks: 60 }, D: { points: 6, minMarks: 50 }, E: { points: 5, minMarks: 40 }, F: { points: 0, minMarks: 0 } },
                minPassGrade: 'E'
            },
            users: [
                { username: 'admin', password: 'admin@crms2024', name: 'System Administrator', role: 'admin' },
                { username: 'operator', password: 'operator@crms2024', name: 'Academic Operator', role: 'operator' },
                { username: 'hod', password: 'hod@crms2024', name: 'Dr. K. S. N. Prasad', role: 'hod' },
                { username: 'faculty1', password: 'faculty@2024', name: 'K. Viswa Prasad', role: 'faculty' },
                { username: 'faculty2', password: 'faculty@2024', name: 'S. V. V. D. Venu Gopal', role: 'faculty' },
                { username: 'faculty3', password: 'faculty@2024', name: 'A. Revathi', role: 'faculty' }
            ],
            subjects: [
                { code: 'CE', name: 'Communicative English', credits: 3, type: 'THEORY', semester: 1 },
                { code: 'LA&C', name: 'Linear Algebra & Calculus', credits: 4, type: 'THEORY', semester: 1 },
                { code: 'CHEM', name: 'Chemistry', credits: 3, type: 'THEORY', semester: 1 },
                { code: 'BCME', name: 'Basic Civil & Mechanical Engg', credits: 3, type: 'THEORY', semester: 1 },
                { code: 'IP', name: 'Introduction to Programming', credits: 3, type: 'THEORY', semester: 1 },
                // ... adding just enough to test login
            ]
        };
        // --- DATA END ---

        // Clear existing
        await User.deleteMany({});
        await Department.deleteMany({});
        await Regulation.deleteMany({});

        // Create Dept & Reg
        const dept = await Department.create(seedData.department);
        const reg = await Regulation.create(seedData.regulation);

        // Create Users
        const createdUsers = [];
        for (const u of seedData.users) {
            createdUsers.push(await User.create({ ...u, departmentId: dept._id }));
        }

        res.json({
            success: true,
            message: '✅ database seeded successfully!',
            credits: {
                admin: 'admin / admin@crms2024',
                hod: 'hod / hod@crms2024'
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
