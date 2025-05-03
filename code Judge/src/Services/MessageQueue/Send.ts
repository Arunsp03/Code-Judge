import amqp from 'amqplib/callback_api';


export const sendMessageToQueue=(queue:string,message:string):Promise<void>=>{
    return new Promise((resolve,reject)=>{
        amqp.connect('amqp://guest:guest@localhost:5672', function(error0, connection) {
            if (error0) {
                return reject (error0);
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    return  reject(error1);
                }
    
        
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.sendToQueue(queue, Buffer.from(message));
        
                console.log(" [x] Sent %s", message);
            });
            setTimeout(function() {
                connection.close();
                resolve();
            }, 500);
            
        });
        
    });
}

