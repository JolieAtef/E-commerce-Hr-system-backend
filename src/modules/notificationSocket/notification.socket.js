import cors from "cors"
import { Server} from 'socket.io';
import { messageModel } from "../../database/models/message.model.js";
import { userModel } from "../../database/models/user.model.js";



export const initSocket= ()=>{
    const io = new Server(3500, {
     cors:{
            origin:"*"
         }
     });

io.on("connection", (socket)=>{
    socket.on("authenticate", async (role , token) => {
    try {   
      let decoded 
      if(role == "user"){
       decoded= jwt.verify(token, "s_u")
      }else if(role == "admin"){
        decoded= jwt.verify(token, "s_a")
      }
      socket.userId = decoded.id;
      socket.join("Authenticated");
      console.log("Authenticated:", decoded.id);
    } catch (err) {
      console.log("Auth error");
      socket.disconnect();
    }
  });

  socket.on("send_offer", async(notification)=>{
    try { 
    let user = await userModel.findById(socket.userId)
    if(user.role != "admin"){
        return
    }
    let {type , title , message , discountCode, expiresAt} = notification
    let addedNotification = await messageModel.insertMany({type , title , message , discountCode, expiresAt})
    socket.to("Authenticated").emit("receive_offer", addedNotification)
   } catch (err) {
    console.log(err);
   }
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
})

}
