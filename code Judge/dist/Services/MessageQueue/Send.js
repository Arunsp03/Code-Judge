"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToQueue = void 0;
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const sendMessageToQueue = (queue, message) => {
    return new Promise((resolve, reject) => {
        callback_api_1.default.connect('amqp://guest:guest@localhost:5672', function (error0, connection) {
            if (error0) {
                return reject(error0);
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    return reject(error1);
                }
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.sendToQueue(queue, Buffer.from(message));
                console.log(" [x] Sent %s", message);
            });
            setTimeout(function () {
                connection.close();
                resolve();
            }, 500);
        });
    });
};
exports.sendMessageToQueue = sendMessageToQueue;
