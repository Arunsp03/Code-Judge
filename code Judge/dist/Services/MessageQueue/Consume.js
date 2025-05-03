"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConsumer = void 0;
const CodeExecutionFacade_1 = __importDefault(require("../../Services/CodeExecutionFacade"));
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const CodeRouter_1 = require("../../Routers/CodeRouter");
const startConsumer = () => {
    console.log("consumer started");
    callback_api_1.default.connect('amqp://guest:guest@localhost:5672', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'CodeExecutionQueue';
            channel.assertQueue(queue, {
                durable: false
            });
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
            channel.consume(queue, function (msg) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log("queuename ", queue);
                    const payload = JSON.parse(msg.content);
                    console.log("payload ", payload);
                    const { problemName, language, sourceCode, requestId } = payload;
                    console.log(" [x] Received %s", msg.content.toString());
                    const result = yield CodeExecutionFacade_1.default.run(problemName, language, sourceCode);
                    CodeRouter_1.requestStore.set(requestId, result);
                    //console.log("request id",requestStore.get(requestId)) 
                });
            }, {
                noAck: true
            });
        });
    });
};
exports.startConsumer = startConsumer;
