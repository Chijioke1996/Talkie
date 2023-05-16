const express = require("express")
const app = express()
const PORT = 3000
const path = require("path")
const http = require("http")
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, "public")))

const socketio = require("socket.io")
const io = socketio(server)

// When a client connects 
io.on("connection", (socket) => {
    console.log("Web Socket connected")

    socket.emit("message", "Welcome to Talkie...")

    socket.broadcast.emit("message", "A user joined the chat")

    // When a user leaves on the client side broadcast the info to every user left in the chat using "disconnect"
    socket.on("disconnect", () => {
        io.emit("message", "A User left")
    })

    // Listen for chatMessage from Client side: "chatMessage" is an event from client side
    socket.on("chatMessage", (msg) => {
        console.log(msg)

        // Emit the message back to all users on the client side
        io.emit("message", msg)
    })

    
    
}) 
 

server.listen((PORT || process.env.PORT), (error)=> {
    if (error) {
        console.log(error);
    } else {
        console.log(`App started and listening on port ${PORT || process.env.PORT}`);
    }
})