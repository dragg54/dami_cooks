import { io } from "socket.io-client";
import { BACKEND_SERVER_URL } from "../AppConfig";

export const socket = io(BACKEND_SERVER_URL)
