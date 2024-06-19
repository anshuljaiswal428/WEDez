const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/WEDez');
        console.log("mongodb channel connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process on connection error
    }
}

main().catch(err => console.error("Error in main:", err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String
});

// Method to compare passwords
// userSchema.methods.comparePassword = async function(candidatePassword) {
//     const isMatch = await bcrypt.compare(candidatePassword, this.password);
//     return isMatch;
// };

const User = mongoose.model('User', userSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());

// Sign-up Endpoint - CRUD Operations: Create a new user
server.post('/WEDez/SignUp', async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        // Check if email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email && existingUser.username === username) {
                return res.status(400).json({ error: 'Username and email both already exist!' });
            } else if (existingUser.email === email) {
                return res.status(400).json({ error: 'Email already exists!' });
            } else if (existingUser.username === username) {
                return res.status(400).json({ error: 'Username already exists!' });
            }
        }

        // Create a new user
        const user = new User({ name, email, username, password });
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Sign-in Endpoint
server.post('/WEDez/SignIn', async (req, res) => {
    console.log("Check 1");
    try {
        console.log("Check 2");
        const { email, password } = req.body;

        // Check if email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found. Please check your credentials.' });
        }
        console.log("Check 3");
        // Check if password matches
        // const isPasswordValid = await user.comparePassword(password);
        const isPasswordValid = password===user.password?true:false;
        console.log(isPasswordValid, password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password. Please try again.' });
        }

        // Successful sign-in
        res.status(200).json({ message: 'Sign in successful!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
