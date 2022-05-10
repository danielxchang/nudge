"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = void 0;
exports.MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.yfvfw.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
