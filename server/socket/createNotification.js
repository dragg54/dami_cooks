import { users } from "./registerUser.js"
import { getIO } from "./socket.js"

export const sendNotification = () =>{
     users.forEach((value, key)=>{
        console.log(value)
         getIO().to(value).emit("receiveNotification", "Message Delivered")
     })
}