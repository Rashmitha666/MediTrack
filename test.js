const bcrypt = require('bcrypt');

async function verifyPassword(inputPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(inputPassword, hashedPassword);
        return match; // Returns true if the passwords match, false otherwise
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
}
const inputPassword = 'r123';
const storedHash = ' $2b$10$VT.o2SMdfzfRdV5wxSxsseFTJbaX1Xhf6tG/A4CX49EnOxl9grBf.'; // Example hash from the database

verifyPassword(inputPassword, storedHash)
    .then(match => {
        if (match) {
            console.log('Password is correct');
        } else {
            console.log('Password is incorrect');
        }
    })
    .catch(error => console.error(error));
