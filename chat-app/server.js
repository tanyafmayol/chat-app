require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const pool = require('./db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5001', 
    methods: ['GET', 'POST'],
  }));

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if(result.rows.length > 0) {
            return res.status(400).json({message: "Username already exists."});
        }
    } catch(error) {
        console.error("error checking user: ", error);
        return res.status(500).json({message: "Server error, please try again."});
    }
    

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    
    } catch (error) {
        console.error('Error hashing password or saving user:', error);
        return res.status(500).json({message: "Server error, please try again."});
    }
   
    res.status(201).json({message: "User registered successfully"});
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if(result.rows.length === 0) {
        return res.status(400).json({message: "Invalid username or password"});
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({message: "Invalid username or password."});
    }

    const token = jwt.sign({username: user.username}, process.env.JWT_SECRET || 'rjF9x@w#pA2o8g61!!pYwzN+10KUbkGm', {expiresIn: "1h"});
    res.status(200).json({message: "Login Successful", token});
})

// app.get('/', (req, res) => {
//     res.send('Hello from Express and Websocket server!');
// })

io.on('connection', (socket) => {
    console.log("A user has connected.");

    socket.on('sendMessage', (message) => {
        console.log('Received message: ', message);
        io.emit('receiveMessage', message);
    })

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })
})

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`hi thereServer is running on port ${PORT}`);
})