"""
Student Data Population Script
Run this to populate server/src/data/studentData.js
"""

import json

# Your student data (paste from step 676)
STUDENT_DATA_PART1 = [
    # First 36 students - PASTE YOUR DATA HERE FROM STEP 676
]

STUDENT_DATA_PART2 = [
    # Last 36 students - PASTE YOUR DATA HERE FROM STEP 676  
]

STUDENT_DATA = STUDENT_DATA_PART1 + STUDENT_DATA_PART2

# Write to studentData.js
output_path = "server/src/data/studentData.js"

with open(output_path, 'w', encoding='utf-8') as f:
    f.write("module.exports = ")
    f.write(json.dumps(STUDENT_DATA, indent=2))
    f.write(";\n")

print(f"✅ Written {len(STUDENT_DATA)} students to {output_path}")
