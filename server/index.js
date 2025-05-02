const http=require("http");
const express=require("express");
const cors=require("cors");
const socketIo=require("socket.io");
const { emit } = require("process");
const app=express();

const server =http.createServer(app);
const io=socketIo(server);
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server is running");
});

const users=[{}];

io.on("connection",(socket)=>{
    console.log("New connect user",socket.id);

    socket.on("joined",({user})=>{
        users[socket.id]=user;
        
    socket.emit("welcome",{user:"Admin",message:`Welcome to the chat ${users[socket.id]}`});
    socket.broadcast.emit("userJoined",{user:"Admin",message:`${users[socket.id]} has joined the chat`});
    })
    socket.on("message",(data)=>{
        io.emit("sendMessage",{user:users[data.id],message:data.message,id:data.id});
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit("leave",{user:"Admin",message:`${users[socket.id]} has left the chat`});
    })
})

server.listen(process.env.PORT||3000,()=>{
    console.log("Server woking on port 3000");
})