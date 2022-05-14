"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let io;
const init = (httpServer) => {
    io = require("socket.io")(httpServer, { cors: { origin: "*" } });
    return io;
};
const getIO = () => {
    if (!io)
        throw new Error("Socket.io not initialized!");
    return io;
};
exports.default = {
    init,
    getIO,
};
