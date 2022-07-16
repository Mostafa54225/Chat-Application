import express from 'express'
import cors from 'cors'
import http from 'http'

import { Server } from 'socket.io'

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
    }
})

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`)


    socket.on("join_room", (data) => {
        socket.join(data.roomName)
        console.log(`${data.username} with Id: ${socket.id} joined room ${data.roomName}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.roomName).emit("receive_message", data)
    })

    socket.on('disconnect', () => {
        console.log("User Disconnected", socket.id)
    })
})

server.listen(3001, () => console.log(`Server is running on port 3001`))