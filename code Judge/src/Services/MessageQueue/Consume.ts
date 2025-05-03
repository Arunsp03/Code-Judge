import CodeExecutionFacade from "../../Services/CodeExecutionFacade";
import amqp from 'amqplib/callback_api';
import { requestStore } from "../../Routers/CodeRouter";
export const startConsumer=()=>{
    console.log("consumer started");
    
amqp.connect('amqp://guest:guest@localhost:5672', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1; 
        }

        var queue = 'CodeExecutionQueue';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, async function(msg:any) {
            console.log("queuename ",queue)
            const payload=JSON.parse(msg.content);
            console.log("payload ",payload); 
            const{problemName,language,sourceCode,requestId}=payload;
            console.log(" [x] Received %s", msg.content.toString());
            const result = await CodeExecutionFacade.run(
                  problemName,
                  language,
                  sourceCode
                );
            requestStore.set(requestId,result);
            
            //console.log("request id",requestStore.get(requestId)) 
            
        }, {
            noAck: true
        });
    });
});
}