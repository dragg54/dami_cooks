import { Server } from "socket.io";

let io;

export const init = (server, corsOptions) => {
  io = new Server(server, {
    cors: corsOptions
  });
  console.log("✅ Socket.io Initialized");
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("❌ Socket.io not initialized!");
  }
  return io;
};
