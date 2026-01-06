import { users } from "./registerUser.js"
import { getIO } from "./socket.js"

export const sendOrderNotification = () =>{
     users.forEach((value, key)=>{
         getIO().to(value).emit("receiveOrderNotification", "Message Delivered")
     })
}

export const sendBookingNotification = () =>{
   users.forEach((value, key)=>{
         getIO().to(value).emit("sendBookingNotification", "Message Delivered")
     }) 
}